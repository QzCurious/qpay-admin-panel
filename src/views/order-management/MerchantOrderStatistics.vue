<template>
  <h1>{{ $t("merchant_order_statistics") }}</h1>
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
        <MerchantDropdown
          v-if="merchant_type !== MERCHANT_TYPE.MERCHANT"
          v-model="filters.merchant_id"
        />
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
        <Clear @click="clear" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column field="channel_name" :header="$t('channel')" />
    <Column :header="$t('deposit_amount')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.real_amount.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column field="fee" :header="$t('deposit_fee')" bodyClass="p-text-right" />
    <Column :header="$t('deposit_count')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.count?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('credit_amount')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.credit_amount.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('balance_d0')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.merchant_channel_amount_d0.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('lock_balance_d0')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.merchant_channel_lock_amount_d0.toLocaleString("en-US") }}
      </template>
    </Column>
  </DataTable>
</template>

<script>
import MerchantOrderStatistics from "../../api/MerchantOrderStatistics"
import MerchantDropdown from "../../components/MerchantDropdown"
import ChannelDropdown from "../../components/ChannelDropdown"
import CalendarStartTime from "../../components/CalendarStartTime.vue"
import CalendarEndTime from "../../components/CalendarEndTime.vue"
import Search from "../../components/Search.vue"
import Clear from "../../components/Clear"
import { date } from "../../helper/validator"
import { helpers, minValue } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import { mapGetters } from "vuex"

export default {
  components: {
    ChannelDropdown,
    MerchantDropdown,
    CalendarStartTime,
    CalendarEndTime,
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
        status: null,
      },
      records: [],
      totalRecords: 0,
      edit_modal: {
        visible: false,
        data: null,
      },
    }
  },
  methods: {
    async fetch() {
      this.loading = true
      const [records, count] = await Promise.all([
        MerchantOrderStatistics.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        MerchantOrderStatistics.count(this.filters),
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
    edit(data) {
      this.edit_modal.data = data
      this.edit_modal.visible = true
    },
    success() {
      this.edit_modal.visible = false
      this.fetch()
    },
    clear() {
      for (let filter in this.filters) {
        this.filters[filter] = null
      }
      this.filters.start_date = this.moment()
        .startOf("day")
        .toDate()
      this.filters.end_date = this.moment()
        .endOf("day")
        .toDate()
    },
  },
  computed: {
    ...mapGetters("auth", ["merchant_type", "MERCHANT_TYPE"]),
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
