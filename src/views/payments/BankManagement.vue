<template>
  <h1>{{ $t("bank_management") }}</h1>
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
      <form @submit.prevent="fetch" class="p-d-flex p-jc-end">
        <Button class="p-mr-auto" :label="$t('form.create')" @click="create" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="code" :header="$t('bank_code')" />
    <Column field="name" :header="$t('bank')" />
    <Column field="transfer" :header="$t('transfer')">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.transfer)"
          @click="update_transfer(data, Number(!data.transfer))"
        />
      </template>
    </Column>
    <Column field="status" :header="$t('status')">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.status)"
          @click="update_status(data, Number(!data.status))"
        />
      </template>
    </Column>
    <Column field="country" :header="$t('country')" />
    <Column :header="$t('operation')">
      <template #body="{ data }">
        <Button :label="$t('form.edit')" @click="edit(data)" />
        <Button
          class="p-button-danger"
          :label="$t('form.delete')"
          @click="remove(data)"
        />
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog />
  <Dialog modal :header="modal_title" v-model:visible="modal.visible">
    <BankModal :mode="modal.mode" :data="modal.data" @success="success" />
  </Dialog>
</template>
<script>
import { PrimeIcons } from "primevue/api"
import Bank from "../../api/Bank"
import ToastService from "../../service/ToastService"
import BankModal from "./BankModal"

export default {
  components: { BankModal },
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
      modal: {
        visible: false,
        mode: null,
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
        Bank.find({ ...this.filters, page: this.page, limit: this.limit }),
        Bank.count(this.filters),
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
          ? this.$i18n.t("enable_bank")
          : this.$i18n.t("disable_bank"),
        message: status
          ? `${this.$i18n.t("bank_will_be_enabled")}: ${data.name}`
          : `${this.$i18n.t("bank_will_be_disabled")}: ${data.name}`,
        accept: async () => {
          await Bank.update(data.id, { status: Number(status) })
          this.fetch()
          ToastService.success({
            summary: status
              ? this.$i18n.t("bank_successfully_enabled")
              : this.$i18n.t("bank_successfully_disabled"),
          })
        },
      })
      this.show_update_status_modal = true
    },
    update_transfer(data, status) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: status
          ? this.$i18n.t("enable_bank_transfer")
          : this.$i18n.t("disable_bank_transfer"),
        message: status
          ? `${this.$i18n.t("bank_transfer_will_be_enabled")}: ${data.name}`
          : `${this.$i18n.t("bank_transfer_will_be_disabled")}: ${data.name}`,
        accept: async () => {
          await Bank.update(data.id, { transfer: Number(status) })
          this.fetch()
          ToastService.success({
            summary: status
              ? this.$i18n.t("bank_transfer_successfully_enabled")
              : this.$i18n.t("bank_transfer_successfully_disabled"),
          })
        },
      })
      this.show_update_status_modal = true
    },
    edit(data) {
      this.modal.mode = "edit"
      this.modal.data = data
      this.modal.visible = true
    },
    create() {
      this.modal.mode = "create"
      this.modal.data = {}
      this.modal.visible = true
    },
    remove(data) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: this.$i18n.t("delete_bank"),
        message: `${this.$i18n.t("bank_will_be_deleted")}: ${data.name}`,
        accept: async () => {
          await Bank.delete(data.id)
          ToastService.success({
            summary: `${this.$i18n.t("bank_successfully_deleted")}: ${
              data.name
            }`,
          })
          this.fetch()
        },
      })
    },
    success() {
      this.fetch()
      this.modal.visible = false
    },
  },
  computed: {
    modal_title() {
      return this.modal.mode === "edit"
        ? this.$i18n.t("edit_bank")
        : this.$i18n.t("create_bank")
    },
  },
}
</script>
<style scoped></style>
