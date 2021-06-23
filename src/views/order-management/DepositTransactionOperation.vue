<template>
  <h1>{{ $t("deposit_transaction_operation") }}</h1>
  <DataTable
    responsiveLayout="scroll"
    :lazy="true"
    :loading="loading"
    :value="records"
    :paginator="true"
    :totalRecords="totalRecords"
    v-model:rows="limit"
    :rowsPerPageOptions="[10, 15, 20, 25]"
    :rowHover="true"
    @page="on_page($event)"
  >
    <template #header>
      <form
        @submit.prevent="handle_search"
        class="p-d-flex p-flex-wrap p-ai-start"
      >
        <InputText
          name="transaction_number"
          :label="$t('transaction_number')"
          v-model="filters.transaction_id"
        />
        <InputText
          name="order_number"
          :label="$t('order_number')"
          v-model="filters.order_number"
        />
        <InputText
          name="payee_number"
          :label="$t('payee_number')"
          v-model="filters.payee_number"
        />
        <InputText
          name="payee_account"
          :label="$t('payee_account')"
          v-model="filters.payee_account"
        />
        <InputText
          name="order_amount"
          :label="$t('order_amount')"
          v-model="filters.order_amount"
        />
        <Dropdown
          name="order_status"
          :label="$t('order_status')"
          v-model="filters.order_status"
          :options="order_status_list"
        />
        <Dropdown
          :label="$t('payee_bank')"
          v-model="filters.payee_bank"
          :options="payee_bank_list"
        />
        <MerchantDropdown v-model="filters.merchant_id" />
        <ChannelDropdown v-model="filters.channel_id" />
        <CalendarStartTime
          v-model="filters.start_time"
          :errors="v$.filters.start_time.$errors.map((e) => e.$message)"
        />
        <CalendarEndTime
          v-model="filters.end_time"
          :errors="v$.filters.end_time.$errors.map((e) => e.$message)"
        />
        <Search />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column
      field="merchant_order_id"
      :header="$t('order_number')"
      bodyClass="p-text-right"
    ></Column>
    <Column
      field="deposit_id"
      :header="$t('transaction_id')"
      bodyClass="p-text-right"
    ></Column>
    <Column
      field="order_amount"
      :header="$t('order_amount')"
      bodyClass="p-text-right"
    ></Column>
    <Column
      field="real_amount"
      :header="$t('real_amount')"
      bodyClass="p-text-right"
    ></Column>
    <Column
      field="deposit_amount"
      :header="$t('deposit_amount')"
      bodyClass="p-text-right"
    ></Column>
    <Column field="payee_bank_name" :header="$t('payee_bank')"></Column>
    <Column
      field="card_holder_name"
      :header="$t('payee_account')"
      bodyClass="p-text-right"
    ></Column>
    <Column
      field="bank_card_account_number"
      :header="$t('payee_number')"
      bodyClass="p-text-right"
    ></Column>
    <Column field="remitter_name" :header="$t('remitter_name')"></Column>
    <!-- <Column field="channel" :header="$t('channel')"></Column> -->
    <Column field="merchant_name" :header="$t('merchant')"></Column>
    <Column :header="$t('success_time')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{
          data.success_at &&
            moment.unix(data.success_at).format(CONSTANTS.DATETIME_FORMAT)
        }}
      </template>
    </Column>
    <Column :header="$t('order_status')">
      <template #body="{ data }">
        {{
          deposit_transaction_status_values.find(
            ({ value }) => value === data.status
          ).label
        }}
      </template>
    </Column>
    <Column :header="$t('operation')">
      <template #body>
        <Button>manual_deposit</Button>
      </template>
    </Column>
    <Column field="channel_name" :header="$t('channel')"></Column>
    <Column :header="$t('order_time')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ moment.unix(data.created_at).format(CONSTANTS.DATETIME_FORMAT) }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import InputText from "../../components/InputText.vue"
import Dropdown from "../../components/Dropdown.vue"
import MerchantOrder, {
  ORDER_STATUS,
  AUDIT_TYPE,
} from "../../api/MerchantOrder"
import DepositTransaction, {
  DEPOSIT_TRANSACTION_STATUS_VALUES,
} from "../../api/DepositTransaction"
import useVuelidate from "@vuelidate/core"
import { date } from "../../helper/validator"
import { helpers, minValue } from "@vuelidate/validators"
import moment from "moment"
import MerchantDropdown from "../../components/MerchantDropdown"
import ChannelDropdown from "../../components/ChannelDropdown"
import Search from "../../components/Search"
import CalendarStartTime from "../../components/CalendarStartTime.vue"
import CalendarEndTime from "../../components/CalendarEndTime.vue"

export default {
  components: {
    InputText,
    Dropdown,
    MerchantDropdown,
    ChannelDropdown,
    Search,
    CalendarStartTime,
    CalendarEndTime,
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      filters: {
        start_time: {
          valid_date: helpers.withMessage(
            this.$i18n.t("invalid_date_format"),
            date()
          ),
        },
        end_time: {
          valid_date: helpers.withMessage(
            this.$i18n.t("invalid_date_format"),
            date()
          ),
          minValue: helpers.withMessage(
            this.$i18n.t("end_time_should_not_be_older_then_start_time"),
            minValue(this.filters.start_time)
          ),
        },
      },
    }
  },
  data() {
    return {
      loading: true,
      page: 1,
      limit: 10,
      filters: {
        transation_id: null,
        order_number: null,
        order_amount: null,
        order_over: null,
        order_status: null,
        merchant: null,
        channel: null,
        start_time: this.moment()
          .startOf("day")
          .toDate(),
        end_time: this.moment()
          .endOf("day")
          .toDate(),
      },
      records: [],
      totalRecores: 0,
    }
  },
  computed: {
    order_status_list() {
      return Object.entries(ORDER_STATUS).map(([key, value]) => {
        return {
          label: this.$i18n.t(`order_status_values.${key}`),
          value,
        }
      })
    },
    deposit_transaction_status_values() {
      return Object.entries(DEPOSIT_TRANSACTION_STATUS_VALUES).map(
        ([key, value]) => ({
          label: this.$i18n.t(`deposit_transaction_status_values.${key}`),
          value,
        })
      )
    },
  },
  methods: {
    handle_search() {
      this.v$.$touch()

      if (this.v$.$error) {
        return
      }

      this.fetch()
    },
    async fetch() {
      this.loading = true
      const [records, count] = await Promise.all([
        DepositTransaction.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        DepositTransaction.count(this.filters),
      ])
      console.log(records.data.data)
      this.records = records.data.data
      this.totalRecords = count.data.count
      window.scrollTo(0, 0)
      this.loading = false
    },
    on_page(e) {
      this.page = e.page + 1
      this.fetch()
    },
  },
  mounted() {
    this.fetch()
  },
}
</script>

<style scoped>
form > :not(:last-child) {
  margin-right: 0.5rem;
}
</style>
