<template>
  <h1>{{ $t("merchant_channel_parameter") }}</h1>
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
        <MerchantDropdown v-model="filters.merchant_id" />
        <ChannelDropdown v-model="filters.channel_id" />
        <StatusDropdown v-model="filters.status" />
        <Search />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column field="channel_name" :header="$t('channel')" />
    <Column field="recharge_limit_daily" :header="$t('recharge_limit_daily')" />
    <Column field="manual_deposit_limit" :header="$t('manual_deposit_limit')" />
    <Column field="deposit_limit_once" :header="$t('order_limit_once')" />
    <Column field="status" :header="$t('status')">
      <template #body="{ data }">
        <template v-if="data.status === 0">
          <Tag severity="danger" :value="$t('disabled')" />
        </template>
        <template v-else-if="data.status === 1">
          <Tag severity="success" :value="$t('enabled')" />
        </template>
      </template>
    </Column>
    <Column field="order_per_minute" :header="$t('order_per_minute')" />
    <Column field="deposit_limit_daily" :header="$t('order_limit_daily')" />
    <Column :header="$t('operation')">
      <template #body="{ data }">
        <Button :label="$t('form.edit')" @click="edit(data)" />
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog />
  <Dialog
    modal
    :header="$t('edit_merchant_channel_parameter')"
    v-model:visible="edit_modal.visible"
  >
    <EditMerchantChannelParameter :data="edit_modal.data" @success="success" />
  </Dialog>
</template>

<script>
import MerchantChannelParameter from "../../api/MerchantChannelParameter"
import MerchantDropdown from "../../components/MerchantDropdown"
import ChannelDropdown from "../../components/ChannelDropdown"
import StatusDropdown from "../../components/StatusDropdown"
import Search from "../../components/Search.vue"
import EditMerchantChannelParameter from "./EditMerchantChannelParameter"

export default {
  components: {
    EditMerchantChannelParameter,
    ChannelDropdown,
    MerchantDropdown,
    StatusDropdown,
    Search,
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
        MerchantChannelParameter.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        MerchantChannelParameter.count(this.filters),
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
