<template>
  <h1>{{ $t("card_management") }}</h1>
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
        @submit.prevent="fetch"
        class="header p-d-flex p-jc-end p-ai-start p-flex-wrap"
      >
        <Button class="p-mr-auto" :label="$t('form.create')" @click="create" />
        <MerchantDropdown v-model="filters.merchant_id" />
        <BankDropdown v-model="filters.bank_id" />
        <StatusDropdown v-model="filters.status" />
        <InputText :label="$t('card_number')" v-model="filters.card_number" />
        <Search />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="channel_name" :header="$t('channel')" />
    <Column field="id" :header="`${$t('card')} id`" bodyClass="p-text-right" />
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column field="bank_name" :header="$t('bank')" />
    <Column field="card_holder_name" :header="$t('card_holder')" />
    <Column
      field="account_number"
      :header="$t('card_number')"
      bodyClass="p-text-right"
    />
    <Column
      field="deposit_limit_daily"
      :header="$t('deposit_limit_daily')"
      bodyClass="p-text-right"
    />
    <Column
      field="deposit_limit_once"
      :header="$t('deposit_limit_once')"
      bodyClass="p-text-right"
    />
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
    <CardModal :mode="modal.mode" :data="modal.data" @success="success" />
  </Dialog>
</template>

<script>
import { PrimeIcons } from "primevue/api"
import Card from "../../api/Card"
import ToastService from "../../service/ToastService"
import MerchantDropdown from "../../components/MerchantDropdown"
import BankDropdown from "../../components/BankDropdown"
import StatusDropdown from "../../components/StatusDropdown"
import InputText from "../../components/InputText"
import CardModal from "./CardModal"
import Search from "../../components/Search.vue"

export default {
  components: {
    CardModal,
    MerchantDropdown,
    BankDropdown,
    StatusDropdown,
    InputText,
    Search,
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
        card_number: null,
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
  computed: {
    modal_title() {
      return this.modal.mode === "edit"
        ? this.$i18n.t("edit_card")
        : this.$i18n.t("create_card")
    },
  },
  methods: {
    async fetch() {
      this.loading = true
      const [records, count] = await Promise.all([
        Card.find({ ...this.filters, page: this.page, limit: this.limit }),
        Card.count(this.filters),
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
        header: this.$i18n.t("delete_card"),
        message: this.$i18n.t("card_will_be_deleted"),
        accept: async () => {
          await Card.delete(data.id)
          ToastService.success({
            summary: this.$i18n.t("card_successfully_deleted"),
          })
          this.fetch()
        },
      })
    },
    update_status(data, status) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: status
          ? this.$i18n.t("enable_card")
          : this.$i18n.t("disable_card"),
        message: status
          ? `${this.$i18n.t("card_will_be_enabled")}: ${data.id}`
          : `${this.$i18n.t("card_will_be_disabled")}: ${data.id}`,
        accept: async () => {
          await Card.update(data.id, { status: Number(status) })
          this.fetch()
          ToastService.success({
            summary: status
              ? this.$i18n.t("card_successfully_enabled")
              : this.$i18n.t("card_successfully_disabled"),
          })
        },
      })
    },
    success() {
      this.fetch()
      this.modal.visible = false
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
