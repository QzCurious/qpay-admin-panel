<template>
  <h1>{{ $t("transaction_record") }}</h1>
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
          :label="$t('transaction_id')"
          v-model="filters.transaction_id"
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
        <Clear @click="clear" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="channel_name" :header="$t('channel')" />
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column
      field="transaction_id"
      :header="$t('transaction_id')"
      bodyClass="p-text-right"
    />
    <Column :header="$t('operation_balance')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.amount.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('before_balance')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.before_amount.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('after_balance')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.after_amount.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('created_at')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ moment.unix(data.created_at).format(CONSTANTS.DATETIME_FORMAT) }}
      </template>
    </Column>
    <Column :header="$t('transaction_record_type')">
      <template #body="{ data }">
        {{
          transaction_record_type_list.find(
            ({ value }) => value === data.transaction_record_type_name
          ).label
        }}
      </template>
    </Column>
  </DataTable>
</template>
<script>
import TransactionRecord, {
  TRANSACTION_RECORD_TYPE,
} from "../../api/TransactionRecord"
import MerchantDropdown from "../../components/MerchantDropdown"
import ChannelDropdown from "../../components/ChannelDropdown"
import CalendarStartTime from "../../components/CalendarStartTime.vue"
import CalendarEndTime from "../../components/CalendarEndTime.vue"
import InputText from "../../components/InputText.vue"
import Search from "../../components/Search.vue"
import { date } from "../../helper/validator"
import { helpers, minValue } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import { mapGetters } from "vuex"
import Clear from "../../components/Clear"

export default {
  components: {
    ChannelDropdown,
    MerchantDropdown,
    Search,
    InputText,
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
        transaction_id: null,
        merchant_id: null,
        channel_id: null,
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
    transaction_record_type_list() {
      return Object.entries(TRANSACTION_RECORD_TYPE).map(([key, value]) => {
        return {
          label: this.$i18n.t(`transaction_record_type_values.${key}`),
          value,
        }
      })
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
        TransactionRecord.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        TransactionRecord.count(this.filters),
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
