<template>
  <h1>{{ $t("merchant_operation_panel") }}</h1>
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
        <Dropdown
          :label="$t('status')"
          v-model="filters.status"
          :options="[
            { label: $t('disabled'), value: 0 },
            { label: $t('enabled'), value: 1 },
          ]"
        />
        <Search />
        <Clear @click="clear" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="name" :header="$t('merchant')" />
    <Column field="status" :header="$t('status')">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.status)"
          @click="update_status(data, !data.status)"
        />
      </template>
    </Column>
    <Column field="created_at" :header="$t('created_at')">
      <template #body="{ data }">
        {{
          data.created_at &&
            moment.unix(data.created_at).format(CONSTANTS.DATETIME_FORMAT)
        }}
      </template>
    </Column>
    <Column :header="$t('operation')">
      <template #body="{ data }">
        <Button
          class="p-button-primary p-button-sm p-mr-1"
          :label="$t('form.edit')"
          @click="edit(data)"
        />
        <Button
          class="p-button-danger p-button-sm"
          :label="$t('form.delete')"
          @click="remove(data)"
        />
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog></ConfirmDialog>
  <Dialog
    modal
    :header="$t('create_merchant')"
    v-model:visible="create_modal.visible"
  >
    <CreateMerchant @success="success" />
  </Dialog>
  <Dialog
    modal
    :header="$t('edit_merchant')"
    v-model:visible="edit_modal.visible"
  >
    <EditMerchant :id="edit_modal.data.id" @success="success" />
  </Dialog>
</template>
<script>
import { defineComponent } from "vue"
import { PrimeIcons } from "primevue/api"
import Merchant from "../../api/Merchant"
import ToastService from "../../service/ToastService"
import Dropdown from "../../components/Dropdown"
import CreateMerchant from "./CreateMerchant"
import EditMerchant from "./EditMerchant"
import Search from "../../components/Search"
import Clear from "../../components/Clear"

export default defineComponent({
  name: "FundsOperationPanel",
  components: { Dropdown, CreateMerchant, EditMerchant, Search, Clear },
  data() {
    return {
      loading: true,
      page: 1,
      limit: 10,
      filters: {
        status: null,
      },
      records: [],
      totalRecords: 0,
      create_modal: {
        visible: false,
      },
      edit_modal: {
        visible: false,
        data: {},
      },
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      const [records, count] = await Promise.all([
        Merchant.find({ ...this.filters, page: this.page, limit: this.limit }),
        Merchant.count(this.filters),
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
    update_status(data, status) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: status
          ? this.$i18n.t("enable_merchant")
          : this.$i18n.t("disable_merchant"),
        message: status
          ? `${this.$i18n.t("merchant_will_be_enabled")}: ${data.name}`
          : `${this.$i18n.t("merchant_will_be_disabled")}: ${data.name}`,
        accept: async () => {
          await Merchant.update(data.id, { status: Number(status) })
          this.fetch()
          ToastService.success({
            summary: status
              ? this.$i18n.t("merchant_successfully_enabled")
              : this.$i18n.t("merchant_successfully_disabled"),
          })
        },
      })
      this.show_update_status_modal = true
    },
    edit(data) {
      this.edit_modal.data = data
      this.edit_modal.visible = true
    },
    create() {
      this.create_modal.visible = true
    },
    remove(data) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: this.$i18n.t("delete_merchant"),
        message: this.$i18n.t("merchant_will_be_deleted"),
        accept: async () => {
          await Merchant.delete(data.id)
          ToastService.success({
            summary: this.$i18n.t("merchant_successfully_deleted"),
          })
          this.fetch()
        },
      })
    },
    success() {
      this.edit_modal.visible = false
      this.create_modal.visible = false
      this.fetch()
    },
    clear() {
      for (let filter in this.filters) {
        this.filters[filter] = null
      }
    },
  },
})
</script>

<style scoped>
.header > :not(:last-child) {
  margin: 0 0.5rem 0.5rem 0;
}
</style>
