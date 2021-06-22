<template>
  <h1>{{ $t("funds_withdraw") }}</h1>
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
      <div class="summary p-mt-2">
        <span>{{ $t("total_balance_d0") }}: {{ summary?.amount_d0 }}</span>
        <span>{{ $t("total_balance_t1") }}: {{ summary?.amount_t1 }}</span>
      </div>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="channel_name" :header="$t('channel')" />
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column :header="$t('balance_d0')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.amount_d0.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('lock_balance_d0')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.lock_amount_d0.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('balance_t1')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.amount_t1.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('lock_balance_t1')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.lock_amount_t1.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('status')">
      <template #body="{ data }">
        <template v-if="data.merchant_channel_status === 0">
          <Tag severity="danger" :value="$t('disabled')" />
        </template>
        <template v-else-if="data.merchant_channel_status === 1">
          <Tag severity="success" :value="$t('enabled')" />
        </template>
      </template>
    </Column>
    <Column :header="$t('operation')">
      <template #body="{ data }">
        <Button :label="$t('withdraw')" @click="show_modal(data)" />
      </template>
    </Column>
  </DataTable>
  <Dialog
    modal
    :header="$t('withdraw_application')"
    v-model:visible="modal.visible"
  >
    <div class="modal-wrapper">
      <div class="p-mb-3">
        {{ modal.message }}
      </div>
      <WithdrawApplication :data="modal.data" />
    </div>
  </Dialog>
</template>

<script>
import Funds from "../../api/Funds"
import WithdrawApplication from "./FundsTransactionApplication.vue"

export default {
  components: {
    WithdrawApplication,
  },
  data() {
    return {
      loading: true,
      page: 1,
      limit: 10,
      filters: {},
      records: [],
      totalRecords: 0,
      summary: {},
      modal: {
        visible: false,
        message: null,
        data: {},
      },
    }
  },
  methods: {
    async fetch() {
      this.loading = true
      const [records, count] = await Promise.all([
        Funds.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        Funds.count(this.filters),
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
    show_modal(data) {
      this.modal.visible = true
      this.modal.data = data
    },
  },
  mounted() {
    this.fetch()
  },
}
</script>

<style scoped>
.header > :not(:last-child) {
  margin-right: 0.5rem;
}

.modal-wrapper {
  width: min-content;
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
