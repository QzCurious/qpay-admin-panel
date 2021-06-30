<template>
  <h1>{{ $t("merchant_order_operation") }}</h1>
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
          name="order_number"
          :label="$t('order_number')"
          v-model="filters.order_number"
        />
        <InputText
          name="transation_number"
          :label="$t('transaction_number')"
          v-model="filters.transaction_id"
        />
        <InputText
          name="order_amount"
          :label="$t('order_amount')"
          v-model="filters.order_amount"
          :errors="v$.filters.order_amount.$errors.map((e) => e.$message)"
        />
        <InputText
          name="order_over"
          :label="$t('order_over')"
          v-model="filters.order_over"
          :errors="v$.filters.order_over.$errors.map((e) => e.$message)"
        />
        <Dropdown
          :label="$t('order_status')"
          v-model="filters.order_status"
          :options="order_status_list"
        />
        <Dropdown
          :label="$t('audit_type')"
          v-model="filters.audit_type"
          :options="audit_status_list"
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
        <Clear @click="clear" />
      </form>
      <div class="summary p-mt-2">
        <span>{{ $t("deposit_count") }}: {{ summary.count }}</span>
        <span>{{ $t("fee") }}: {{ summary.fee }}</span>
        <span>{{ $t("credit_amount") }}: {{ summary.credit_amount }}</span>
        <span>{{ $t("real_amount") }}: {{ summary.real_amount }}</span>
      </div>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column :header="$t('order_number')" bodyClass="p-text-right">
      <template #body="{ data }">
        <i v-if="data.id" v-tooltip.top="data.id">
          {{
            data.id.substring(0, 3) +
              "..." +
              data.id.substr(data.id.length - 10)
          }}
        </i>
        <i v-else> - </i>
      </template>
    </Column>
    <Column
      field="deposit_transaction_id"
      :header="$t('transaction_id')"
      bodyClass="p-text-right"
    >
      <template #body="{ data }">
        <i
          v-if="data.deposit_transaction_id"
          v-tooltip.top="data.deposit_transaction_id"
        >
          {{
            data.deposit_transaction_id.substring(0, 3) +
              "..." +
              data.deposit_transaction_id.substr(
                data.deposit_transaction_id.length - 10
              )
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
    <Column :header="$t('fee')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.fee.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('credit_amount')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.credit_amount.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('order_status')">
      <template #body="{ data }">
        {{
          order_status_list.find(({ value }) => value === data.order_status)
            .label
        }}
      </template>
    </Column>
    <Column field="channel_name" :header="$t('channel')"></Column>
    <Column field="remark" :header="$t('remark')"></Column>
    <Column field="audit_type" :header="$t('audit_type')">
      <template #body="{ data }">
        {{
          audit_status_list.find(({ value }) => value === data.audit_type).label
        }}
      </template>
    </Column>
    <Column field="merchant_name" :header="$t('merchant')"></Column>
    <Column field="order_time" :header="$t('order_time')">
      <template #body="{ data }">
        {{ moment.unix(data.created_at).format(CONSTANTS.DATETIME_FORMAT) }}
      </template>
    </Column>
    <Column field="success_time" :header="$t('success_time')">
      <template #body="{ data }">
        {{
          data.success_at &&
            moment.unix(data.success_at).format(CONSTANTS.DATETIME_FORMAT)
        }}
      </template>
    </Column>
    <Column :header="$t('operation')">
      <!-- TODO -->
      <template #body="{ data }">
        <div v-if="isOperationVisible(data)">
          <Button class="p-button-success p-button-sm" @click="paid(data)">
            <i class="pi pi-check">{{
              $t("audit_type_values.PAID")
            }}</i></Button
          >
          <Button class="p-button-danger p-button-sm" @click="reject(data)">
            <i class="pi pi-times">
              {{ $t("audit_type_values.REJECT") }}</i
            ></Button
          >
        </div>
      </template>
    </Column>
  </DataTable>
  <Dialog modal :header="$t('verify_2fa')" v-model:visible="modal.visible">
    <Form2FA :data="modal.data" @success="success" />
  </Dialog>
</template>

<script>
import InputText from "../../components/InputText.vue"
import Dropdown from "../../components/Dropdown.vue"
import MerchantOrder, {
  ORDER_STATUS,
  AUDIT_TYPE,
} from "../../api/MerchantOrder"
import useVuelidate from "@vuelidate/core"
import { date } from "../../helper/validator"
import { helpers, minValue, numeric } from "@vuelidate/validators"
import MerchantDropdown from "../../components/MerchantDropdown"
import ChannelDropdown from "../../components/ChannelDropdown"
import Search from "../../components/Search"
import Clear from "../../components/Clear"
import CalendarStartTime from "../../components/CalendarStartTime.vue"
import CalendarEndTime from "../../components/CalendarEndTime.vue"
import Form2FA from "./Form2FA.vue"

export default {
  components: {
    InputText,
    Dropdown,
    Search,
    Clear,
    MerchantDropdown,
    ChannelDropdown,
    CalendarStartTime,
    CalendarEndTime,
    Form2FA,
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      filters: {
        order_amount: { numeric },
        order_over: { numeric },
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
      audit_type: null,
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
      totalRecords: 0,
      summary: {},
      modal: {
        visible: false,
        data: {
          id: null,
          audit_type: null,
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
    audit_status_list() {
      return Object.entries(AUDIT_TYPE).map(([key, value]) => ({
        label: this.$i18n.t(`audit_type_values.${key}`),
        value,
      }))
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
        MerchantOrder.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        MerchantOrder.count(this.filters),
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
    paid(data) {
      this.modal.visible = true
      let audit_type = AUDIT_TYPE.PAID
      this.modal.data = { id: data.id, audit_type, code: "" }
    },
    reject(data) {
      this.modal.visible = true
      let audit_type = AUDIT_TYPE.REJECT
      this.modal.data = { id: data.id, audit_type, code: "" }
    },
    isOperationVisible(data) {
      return data.audit_type == AUDIT_TYPE.PENDING
    },
    async success(data) {
      await MerchantOrder.update(data.id, {
        audit_type: this.modal.data.audit_type,
        code: data.code,
      })

      this.modal.visible = false
    },
    clear() {
      Object.keys(this.filters).forEach((x) => {
        this.filters[x] = null
      })
      this.filters.start_time = this.moment()
        .startOf("day")
        .toDate()
      this.filters.end_time = this.moment()
        .endOf("day")
        .toDate()
    },
  },
  async mounted() {
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
