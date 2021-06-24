<template>
  <h1>{{ $t("merchant_order") }}</h1>
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
          name="transaction_id"
          :label="$t('transaction_id')"
          v-model="filters.deposit_transaction_id"
        />
        <InputText
          name="order_number"
          :label="$t('order_number')"
          v-model="filters.id"
        />
        <InputText
          name="order_amount"
          :label="$t('order_amount')"
          v-model="filters.order_amount"
        />
        <InputText
          name="order_over"
          :label="$t('order_over')"
          v-model="filters.order_over"
        />
        <Dropdown
          name="order_status"
          :label="$t('order_status')"
          v-model="filters.order_status"
          :options="order_status_list"
        />
        <Dropdown
          :label="$t('audit_type')"
          v-model="filters.audit_type"
          :options="audit_status_list"
        />
        <MerchantDropdown
          v-if="merchant_type !== MERCHANT_TYPE.MERCHANT"
          v-model="filters.merchant_id"
        />
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
      field="id"
      :header="$t('order_number')"
      bodyClass="p-text-right"
    ></Column>
    <Column
      field="deposit_transaction_id"
      :header="$t('transaction_id')"
      bodyClass="p-text-right"
    ></Column>
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
    <Column :header="$t('order_time')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ moment.unix(data.created_at).format(CONSTANTS.DATETIME_FORMAT) }}
      </template>
    </Column>
    <Column :header="$t('success_time')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{
          data.success_at &&
            moment.unix(data.success_at).format(CONSTANTS.DATETIME_FORMAT)
        }}
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
import useVuelidate from "@vuelidate/core"
import { date } from "../../helper/validator"
import { helpers, minValue } from "@vuelidate/validators"
import MerchantDropdown from "../../components/MerchantDropdown"
import ChannelDropdown from "../../components/ChannelDropdown"
import Search from "../../components/Search"
import CalendarStartTime from "../../components/CalendarStartTime.vue"
import CalendarEndTime from "../../components/CalendarEndTime.vue"
import { mapGetters } from "vuex"

export default {
  components: {
    InputText,
    Dropdown,
    Search,
    MerchantDropdown,
    ChannelDropdown,
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
      audit_type: null,
      loading: true,
      page: 1,
      limit: 10,
      filters: {
        id: null,
        deposit_transation_id: null,
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
    ...mapGetters("auth", ["merchant_type", "MERCHANT_TYPE"]),
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
.header > :not(:last-child) {
  margin: 0 0.5rem 0.5rem 0;
}
</style>
