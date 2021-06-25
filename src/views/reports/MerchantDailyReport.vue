<template>
  <h1>{{ $t("merchant_daily_report") }}</h1>
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
        <MerchantDropdown v-model="filters.merchant_id" />
        <ChannelDropdown v-model="filters.channel_id" />
        <CalendarStartTime
          v-model="filters.start_date"
          :errors="v$.filters.start_date.$errors.map((e) => e.$message)"
        />
        <CalendarEndTime
          v-model="filters.end_date"
          :errors="v$.filters.end_date.$errors.map((e) => e.$message)"
        />
        <Search />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="created_at" :header="$t('date')" bodyClass="p-text-right" />
    <Column field="merchant_name" :header="$t('merchant')"></Column>
    <Column field="channel_name" :header="$t('channel')" />
    <Column :header="$t('deposit_amount')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.merchant_order_real_amount?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('deposit_fee')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.merchant_order_fee?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('deposit_count')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.merchant_order_count?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('recharge_amount')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.merchant_channel_recharge_amount?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('recharge_fee')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.merchant_channel_recharge_fee?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('deduction_amount')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.merchant_channel_deduction_amount?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('deduction_fee')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.merchant_channel_deduction_fee?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('funds_withdraw_amount')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.funds_withdraw_amount?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('funds_withdraw_fee')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.funds_withdraw_fee?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('opening_balance')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.opening_balance?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('ending_balance')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.ending_balance?.toLocaleString("en-US") }}
      </template>
    </Column>
  </DataTable>
</template>
<script>
import MerchantChannelReport from "../../api/MerchantChannelReport"
import ChannelDropdown from "../../components/ChannelDropdown"
import MerchantDropdown from "../../components/MerchantDropdown"
import CalendarStartTime from "../../components/CalendarStartTime.vue"
import CalendarEndTime from "../../components/CalendarEndTime.vue"
import Search from "../../components/Search"
import { date } from "../../helper/validator"
import { helpers, minValue } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"

export default {
  components: {
    MerchantDropdown,
    ChannelDropdown,
    CalendarStartTime,
    CalendarEndTime,
    Search,
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      filters: {
        start_date: {
          valid_date: helpers.withMessage(
            this.$i18n.t("invalid_date_format"),
            date()
          ),
        },
        end_date: {
          valid_date: helpers.withMessage(
            this.$i18n.t("invalid_date_format"),
            date()
          ),
          minValue: helpers.withMessage(
            this.$i18n.t("end_time_should_not_be_older_then_start_time"),
            minValue(this.filters.start_date)
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
        merchant_id: null,
        channel_id: null,
        start_date: this.moment()
          .startOf("day")
          .toDate(),
        end_date: this.moment()
          .endOf("day")
          .toDate(),
      },
      records: [],
      totalRecords: 0,
    }
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
        MerchantChannelReport.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        MerchantChannelReport.count(this.filters),
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
  },
}
</script>

<style scoped>
.header > :not(:last-child) {
  margin: 0 0.5rem 0.5rem 0;
}
</style>
