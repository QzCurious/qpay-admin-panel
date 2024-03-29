<template>
  <h1>{{ $t("deposit_transaction") }}</h1>
  <DataTable
    responsiveLayout="scroll"
    :lazy="true"
    :value="records"
    :paginator="true"
    :totalRecords="totalRecords"
    v-model:rows="limit"
    :rowsPerPageOptions="[10, 15, 20, 25]"
    :rowHover="true"
    showGridlines
    class="p-datatable-sm"
    @page="on_page($event)"
  >
    <template #header>
      <form
        @submit.prevent="handle_search"
        class="header p-d-flex p-jc-end p-ai-start p-flex-wrap"
      >
        <InputText
          name="merchant_order_id"
          :label="$t('order_number')"
          v-model="filters.merchant_order_id"
        />
        <InputText
          name="transaction_number"
          :label="$t('transaction_number')"
          v-model="filters.deposit_id"
        />
        <Dropdown
          name="status"
          :label="$t('status')"
          v-model="filters.status"
          :options="deposit_transaction_status_values"
        />
        <BankDropdown v-model="filters.bank_id" />
        <MerchantDropdown v-model="filters.merchant_id" />
        <ChannelDropdown v-model="filters.channel_id" />
        <InputText
          name="deposit_amount"
          :label="$t('deposit_amount')"
          v-model="filters.deposit_amount"
        />
        <InputText
          name="bank_card_id"
          :label="$t('payee_number')"
          v-model="filters.bank_card_id"
        />
        <InputText
          name="card_holder_id"
          :label="$t('payee_account')"
          v-model="filters.card_holder_id"
        />
        <InputText
          name="order_amount"
          :label="$t('order_amount')"
          v-model="filters.order_amount"
        />
        <CalendarStartTime
          v-model="filters.start_time"
          :errors="v$.filters.start_time.$errors.map((e) => e.$message)"
        />
        <CalendarEndTime
          v-model="filters.end_time"
          :errors="v$.filters.end_time.$errors.map((e) => e.$message)"
        />
        <Search />
        <Clear @click="clear" />
      </form>
      <div class="summary p-mt-2">
        <span>{{ $t("deposit_count") }}: {{ summary.count }}</span>
        <span>{{ $t("total_deposit") }}: {{ summary.amount }}</span>
        <span>{{ $t("unknown_count") }}: {{ summary.unknow_count }}</span>
        <span>{{ $t("unknown_deposit") }}: {{ summary.unknow_amount }}</span>
      </div>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="merchant_order_id" :header="$t('order_number')">
      <template #body="{ data }">
        <i v-if="data.merchant_order_id" v-tooltip.top="data.merchant_order_id">
          {{
            data.merchant_order_id.substring(0, 3) +
              "..." +
              data.merchant_order_id.substr(data.merchant_order_id.length - 10)
          }}
        </i>
        <i v-else> - </i>
      </template>
    </Column>
    <Column
      field="deposit_id"
      :header="$t('transaction_number')"
      bodyClass="p-text-right"
    >
      <template #body="{ data }">
        <i v-if="data.deposit_id" v-tooltip.top="data.deposit_id">
          {{
            data.deposit_id.substring(0, 3) +
              "..." +
              data.deposit_id.substr(data.deposit_id.length - 10)
          }}
        </i>
        <i v-else> - </i>
      </template>
    </Column>
    <Column :header="$t('order_amount')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.order_amount.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('real_amount')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.real_amount.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('deposit_amount')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.deposit_amount.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column field="payee_bank_name" :header="$t('payee_bank')"></Column>
    <Column field="card_holder_name" :header="$t('payee_account')"></Column>
    <Column
      field="bank_card_account_number"
      :header="$t('payee_number')"
      bodyClass="p-text-right"
    ></Column>
    <Column :header="$t('sms_message')">
      <template #body="{ data }">
        <i
          v-if="data.remark"
          v-tooltip.top="data.remark"
          class="p-button-raised p-button-rounded p-button-sm pi pi-eye"
        />
      </template>
    </Column>
    <Column field="remitter_name" :header="$t('remitter_name')"></Column>
    <Column field="channel_name" :header="$t('channel')"></Column>
    <Column field="merchant_name" :header="$t('merchant')"></Column>
    <Column field="operator" :header="$t('operator')"></Column>
    <Column :header="$t('success_time')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{
          data.success_at &&
            moment.unix(data.success_at).format(CONSTANTS.DATETIME_FORMAT)
        }}
      </template>
    </Column>
    <Column :header="$t('transaction_time')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ moment.unix(data.created_at).format(CONSTANTS.DATETIME_FORMAT) }}
      </template>
    </Column>
    <Column :header="$t('status')">
      <template #body="{ data }">
        {{
          deposit_transaction_status_values.find(
            ({ value }) => value === data.status
          ).label
        }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import InputText from "../../components/InputText.vue"
import Dropdown from "../../components/Dropdown.vue"
import BankDropdown from "../../components/BankDropdown"
import MerchantDropdown from "../../components/MerchantDropdown"
import ChannelDropdown from "../../components/ChannelDropdown"
import DepositTransaction, {
  DEPOSIT_TRANSACTION_STATUS_VALUES,
} from "../../api/DepositTransaction"
import useVuelidate from "@vuelidate/core"
import { date } from "../../helper/validator"
import { helpers, minValue } from "@vuelidate/validators"
import CalendarStartTime from "../../components/CalendarStartTime.vue"
import CalendarEndTime from "../../components/CalendarEndTime.vue"
import Search from "../../components/Search"
import Clear from "../../components/Clear"

export default {
  components: {
    InputText,
    Dropdown,
    CalendarStartTime,
    CalendarEndTime,
    BankDropdown,
    MerchantDropdown,
    ChannelDropdown,
    Search,
    Clear,
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
        deposit_id: null,
        merchant_order_id: null,
        status: null,
        bank_id: null,
        merchant_id: null,
        channel_id: null,
        deposit_amount: null,
        bank_card_id: null,
        card_holder_id: null,
        order_amount: null,
        start_time: this.moment()
          .startOf("day")
          .toDate(),
        end_time: this.moment()
          .endOf("day")
          .toDate(),
      },
      records: [],
      totalRecords: 0,
      summary: {},
    }
  },
  computed: {
    deposit_transaction_status_values() {
      return Object.entries(DEPOSIT_TRANSACTION_STATUS_VALUES).map(
        ([key, value]) => ({
          label: this.$i18n.t(`deposit_transaction_status_values.${key}`),
          value,
        })
      )
    },
  },
  mounted() {
    this.fetch()
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
      this.records = records.data.data
      this.totalRecords = count.data.count
      this.summary = count.data
      window.scrollTo(0, 0)
      this.loading = false
    },
    on_page(e) {
      this.page = e.page + 1
      this.fetch()
    },
    clear() {
      for (let filter in this.filters) {
        this.filters[filter] = null
      }
      this.filters.start_time = this.moment()
        .startOf("day")
        .toDate()
      this.filters.end_time = this.moment()
        .endOf("day")
        .toDate()
    },
  },
}
</script>

<style scoped>
.header > :not(:last-child) {
  margin: 0 0.5rem 0.5rem 0;
}

.summary {
  display: flex;
  justify-content: flex-end;
  color: var(--blue-500);
}

.summary > * + *::before {
  margin: 0 0.5rem;
  content: "|";
}
</style>
