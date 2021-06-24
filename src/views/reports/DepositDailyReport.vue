<template>
  <h1>{{ $t("deposit_daily_report") }}</h1>
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
        class="header p-d-flex p-jc-end p-ai-start p-flex-wrap"
      >
        <MerchantDropdown v-model="filters.merchant_id" />
        <BankDropdown v-model="filters.bank_id" />
        <InputText :label="$t('card_id')" v-model="filters.bank_card_id" />
        <InputText
          :label="$t('card_number')"
          v-model="filters.bank_card_account_number"
        />
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
      <div class="summary p-mt-2">
        <span
          >{{ $t("deposit_count") }}:
          {{ summary.deposit_transaction_count?.toLocaleString("en-US") }}</span
        >
        <span
          >{{ $t("total_deposit") }}:
          {{
            summary.deposit_transaction_deposit_amount?.toLocaleString("en-US")
          }}</span
        >
        <span
          >{{ $t("auto_deposit") }}:
          {{ summary.auto_deposit_amount?.toLocaleString("en-US") }}</span
        >
        <span
          >{{ $t("manual_deposit") }}:
          {{ summary.manual_deposit_amount?.toLocaleString("en-US") }}</span
        >
      </div>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="merchant_name" :header="$t('merchant')"></Column>
    <Column field="bank_name" :header="$t('bank')"></Column>
    <Column field="bank_card_id" :header="$t('card_id')"></Column>
    <Column
      field="bank_card_account_number"
      :header="$t('card_number')"
      bodyClass="p-text-right"
    />
    <Column field="card_holder_name" :header="$t('account_name')" />
    <Column :header="$t('current_balance')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.bank_card_balance?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('auto_deposit')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.auto_deposit_amount?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('manual_deposit')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.manual_deposit_amount?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('total_deposit')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.deposit_transaction_deposit_amount?.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('deposit_count')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data?.deposit_transaction_count?.toLocaleString("en-US") }}
      </template>
    </Column>
  </DataTable>
</template>
<script>
import DepositReport from "../../api/DepositReport"
import InputText from "../../components/InputText.vue"
import BankDropdown from "../../components/BankDropdown.vue"
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
    InputText,
    BankDropdown,
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
        bank_id: null,
        bank_card_id: null,
        bank_card_account_number: null,
        start_date: this.moment()
          .startOf("day")
          .toDate(),
        end_date: this.moment()
          .endOf("day")
          .toDate(),
      },
      records: [],
      totalRecords: 0,
      summary: {},
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
        DepositReport.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        DepositReport.count(this.filters),
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
