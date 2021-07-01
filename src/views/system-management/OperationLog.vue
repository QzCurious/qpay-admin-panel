<template>
  <h1>{{ $t("operation_log") }}</h1>
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
        @submit.prevent="fetch"
        class="header p-d-flex p-jc-end p-ai-start p-flex-wrap"
      >
        <InputText :label="$t('operator')" v-model="filters.user_signin_id" />
        <MerchantDropdown
          :label="$t('company')"
          v-if="merchant_type !== MERCHANT_TYPE.MERCHANT"
          v-model="filters.merchant_id"
        />
        <Dropdown
          :label="$t('type')"
          v-model="filters.type"
          :options="operation_type_list"
        />
        <InputText :label="$t('ip')" v-model="filters.ip" />
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
    <Column field="user_signin_id" :header="$t('operator')" />
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column :header="$t('type')">
      <template #body="{ data }">
        {{ operation_type_list.find(({ value }) => value === data.type).label }}
      </template>
    </Column>
    <Column :header="$t('sub_type')">
      <template #body="{ data }">
        {{
          operation_sud_type_list.find(({ value }) => value === data.sub_type)
            .label
        }}
      </template>
    </Column>
    <Column :header="$t('action_type')">
      <template #body="{ data }">
        {{ $t(`operation_action_type.${data.action_type}`) }}
      </template>
    </Column>
    <Column field="remark" :header="$t('remark')" />
    <Column field="ip" :header="$t('ip')" />
    <Column :header="$t('created_at')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ moment.unix(data.created_at).format(CONSTANTS.DATETIME_FORMAT) }}
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog />
</template>

<script>
import OperationLog, {
  OPERATION_TYPE,
  OPERATION_SUB_TYPE,
} from "../../api/OperationLog"
import Dropdown from "../../components/Dropdown"
import MerchantDropdown from "../../components/MerchantDropdown"
import CalendarStartTime from "../../components/CalendarStartTime.vue"
import CalendarEndTime from "../../components/CalendarEndTime.vue"
import InputText from "../../components/InputText"
import Search from "../../components/Search.vue"
import Clear from "../../components/Clear"
import { date } from "../../helper/validator"
import { helpers, minValue } from "@vuelidate/validators"
import { mapGetters } from "vuex"
import useVuelidate from "@vuelidate/core"

export default {
  components: {
    MerchantDropdown,
    InputText,
    Dropdown,
    Search,
    Clear,
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
        user_signin_id: null,
        merchant_id: null,
        type: null,
        ip: null,
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
    operation_type_list() {
      return Object.entries(OPERATION_TYPE).map(([key, value]) => ({
        label: this.$i18n.t(`operation_type.${key}`),
        value,
      }))
    },
    operation_sud_type_list() {
      return Object.entries(OPERATION_SUB_TYPE).map(([key, value]) => ({
        label: this.$i18n.t(`operation_sub_type.${key}`),
        value,
      }))
    },
    ...mapGetters("auth", ["merchant_type", "MERCHANT_TYPE"]),
  },
  methods: {
    async fetch() {
      this.loading = true
      const [records, count] = await Promise.all([
        OperationLog.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        OperationLog.count(this.filters),
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
</style>
