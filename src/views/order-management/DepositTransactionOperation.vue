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
    fronzen
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
          name="transaction_number"
          :label="$t('transaction_number')"
          v-model="filters.deposit_id"
        />
        <InputText
          name="order_number"
          :label="$t('order_number')"
          v-model="filters.merchant_order_id"
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
          :errors="v$.filters.order_amount.$errors.map((e) => e.$message)"
        />
        <Dropdown
          name="order_status"
          :label="$t('order_status')"
          v-model="filters.order_status"
          :options="order_status_list"
        />
        <!-- <Dropdown
          :label="$t('payee_bank')"
          v-model="filters.payee_bank"
          :options="payee_bank_list"
        /> -->
        <BankDropdown v-model="filters.bank_id" />
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
        <Clear @click="clear" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column
      field="merchant_order_id"
      :header="$t('order_number')"
      bodyClass="p-text-right"
    >
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
      :header="$t('transaction_id')"
      bodyClass="p-text-right"
    >
      <template #body="data">
        <i v-if="data.deposit_id" v-tooltip.top="data.deposit_id">
          {{
            data.deposit_id.substring(0, 3) +
              "..." +
              data.deposit_id.substring(data.deposit_id.length - 10)
          }} </i
        ><i v-else> - </i>
      </template>
    </Column>
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
    <Column :header="$t('payee_number')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ shortenAccount(data.bank_card_account_number) }}
      </template>
    </Column>
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
      <template #body="{ data }">
        <!-- 0, 3 才顯示 -->
        {{ data.order_status }}
        <template v-if="isOperationVisible(data)">
          <Button
            class="p-mt-1 p-d-flex p-text-nowrap p-button-sm"
            :label="$t('deposit_transaction_status_values.MANUAL_DEPOSIT')"
            @click="show_modal(data)"
          />
        </template>
      </template>
    </Column>
    <Column field="channel_name" :header="$t('channel')"></Column>
    <Column :header="$t('order_time')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ moment.unix(data.created_at).format(CONSTANTS.DATETIME_FORMAT) }}
      </template>
    </Column>
  </DataTable>
  <Dialog modal :header="$t('manual_deposit')" v-model:visible="modal.visible">
    <div class="modal-wrapper">
      <form @submit.prevent="handle_modal" class="p-d-flex p-flex-column">
        <InputText
          float
          autofocus
          :label="$t('amount')"
          v-model="modal.data.amount"
        />
        <InputText
          float
          autofocus
          :label="$t('remark')"
          v-model="modal.data.remark"
        />
        <InputText
          float
          autofocus
          :label="$t('verify_2fa')"
          v-model="modal.data.code"
        />
        <Button
          :loading="modal.submitting"
          type="submit"
          class="p-mt-2"
          :label="$t('form.submit')"
        />
      </form>
    </div>
  </Dialog>
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
import { required, numeric } from "@vuelidate/validators"
import moment from "moment"
import BankDropdown from "../../components/BankDropdown"
import MerchantDropdown from "../../components/MerchantDropdown"
import ChannelDropdown from "../../components/ChannelDropdown"
import Search from "../../components/Search"
import CalendarStartTime from "../../components/CalendarStartTime.vue"
import CalendarEndTime from "../../components/CalendarEndTime.vue"
import Clear from "../../components/Clear"

export default {
  components: {
    InputText,
    Dropdown,
    BankDropdown,
    MerchantDropdown,
    ChannelDropdown,
    Search,
    CalendarStartTime,
    CalendarEndTime,
    Clear,
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      filters: {
        order_amount: {
          numeric,
        },
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
      // modal: {
      //   amount: { required, numeric },
      //   code: { required },
      // },
    }
  },
  data() {
    return {
      loading: true,
      page: 1,
      limit: 10,
      filters: {
        bank_id: null,
        transation_id: null,
        merchant_order_id: null,
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
      totalRecords: 0,
      modal: {
        visible: false,
        data: {
          id: null,
          amount: null,
          remark: null,
          code: null,
        },
      },
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
    show_modal(data) {
      this.modal.data.amount = ""
      this.modal.data.code = ""
      this.modal.data.id = data.id
      this.modal.data.remark = ""
      this.modal.visible = true
      console.log(this.modal)
    },
    async handle_modal(data) {
      console.log(data)
      let resp = await DepositTransaction.update(this.modal.data.id, {
        real_amount: this.modal.data.amount,
        code: this.modal.data.code,
        remark: this.modal.data.remark,
      })

      if (resp.data.message === "success") {
        this.modal.visible = false
      }
    },
    shortenAccount(account) {
      if (account) {
        let last4 = account.substr(account.length - 4)
        let maskRest = account.substring(0, account.length - 4)
        maskRest = maskRest.replace(/./g, "*")
        return `${maskRest}${last4}` || ""
      } else {
        return ""
      }
    },
    isOperationVisible(data) {
      let visible = true
      visible &= data.status === 0 || data.status === 3
      visible &= data.merchant_order_id !== null
      return visible
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
  mounted() {
    this.fetch()
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
