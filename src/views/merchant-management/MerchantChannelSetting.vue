<template>
  <h1>{{ $t("merchant_channel_setting") }}</h1>
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
        <Button class="p-mr-auto" :label="$t('form.create')" @click="create" />
        <MerchantDropdown v-model="filters.merchant_id" />
        <StatusDropdown v-model="filters.status" />
        <Search />
        <Clear @click="clear" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column field="channel_name" :header="$t('channel')" />
    <Column field="status" :header="$t('status')">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.status)"
          @click="update_status(data, !data.status)"
        />
      </template>
    </Column>
    <Column :header="$t('operation')">
      <template #body="{ data }">
        <Button
          class="p-button-danger"
          :label="$t('form.delete')"
          @click="remove(data)"
        />
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog />
  <Dialog
    modal
    :header="$t('create_merchant_channel')"
    v-model:visible="modal_visible"
  >
    <CreateMerchantChannel @success="success" />
  </Dialog>
</template>

<script>
import { PrimeIcons } from "primevue/api"
import MerchantChannel from "../../api/MerchantChannel"
import ToastService from "../../service/ToastService"
import MerchantDropdown from "../../components/MerchantDropdown"
import StatusDropdown from "../../components/StatusDropdown"
import Search from "../../components/Search.vue"
import CreateMerchantChannel from "./CreateMerchantChannel"
import Clear from "../../components/Clear"

export default {
  components: {
    CreateMerchantChannel,
    MerchantDropdown,
    StatusDropdown,
    Search,
    Clear,
  },
  data() {
    return {
      loading: true,
      page: 1,
      limit: 10,
      filters: {
        merchant_id: null,
        bank_id: null,
        status: null,
      },
      records: [],
      totalRecords: 0,
      modal_visible: false,
    }
  },
  methods: {
    async fetch() {
      this.loading = true
      const [records, count] = await Promise.all([
        MerchantChannel.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        MerchantChannel.count(this.filters),
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
    create() {
      this.modal_visible = true
    },
    remove(data) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: this.$i18n.t("delete_merchant_channel"),
        message: this.$i18n.t("merchant_channel_will_be_deleted"),
        accept: async () => {
          await MerchantChannel.delete(data.id)
          ToastService.success({
            summary: this.$i18n.t("merchant_channel_successfully_deleted"),
          })
          this.fetch()
        },
      })
    },
    update_status(data, status) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: status
          ? this.$i18n.t("enable_merchant_channel")
          : this.$i18n.t("disable_merchant_channel"),
        message: status
          ? this.$i18n.t("merchant_channel_will_be_enabled")
          : this.$i18n.t("merchant_channel_will_be_disabled"),
        accept: async () => {
          await MerchantChannel.update(data.id, { status: Number(status) })
          ToastService.success({
            summary: status
              ? this.$i18n.t("merchant_channel_successfully_enabled")
              : this.$i18n.t("merchant_channel_successfully_disabled"),
          })
          this.fetch()
        },
      })
    },
    success() {
      this.modal_visible = false
      this.fetch()
    },
    clear() {
      for (let filter in this.filters) {
        this.filters[filter] = null
      }
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
