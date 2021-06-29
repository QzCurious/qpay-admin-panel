<template>
  <h1>{{ $t("card_sms_management") }}</h1>
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
        <BankDropdown v-model="filters.bank_id" />
        <StatusDropdown v-model="filters.status" />
        <Search />
        <Clear @click="clear" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="bank_name" :header="$t('bank')" />
    <Column
      field="bank_card_id"
      :header="$t('card_id')"
      bodyClass="p-text-right"
    />
    <Column field="card_holder_name" :header="$t('account_name')" />
    <Column
      field="account_number"
      :header="$t('card_number')"
      bodyClass="p-text-right"
    />
    <Column field="send_phone" :header="$t('send_phone')" />
    <Column field="content" :header="$t('content')" />
    <Column field="user_signin_id" :header="$t('signin_id')"></Column>
    <Column :header="$t('updated_at')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ moment.unix(data.updated_at).format(CONSTANTS.DATETIME_FORMAT) }}
      </template>
    </Column>
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
          class="p-mr-1 p-button-sm"
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
  <ConfirmDialog />
  <Dialog modal :header="modal_title" v-model:visible="modal.visible">
    <CardSmsModal :mode="modal.mode" :data="modal.data" @success="success" />
  </Dialog>
</template>

<script>
import { PrimeIcons } from "primevue/api"
import CardSms from "../../api/CardSms"
import ToastService from "../../service/ToastService"
import BankDropdown from "../../components/BankDropdown"
import StatusDropdown from "../../components/StatusDropdown"
import CardSmsModal from "./CardSmsModal"
import Search from "../../components/Search.vue"
import Clear from "../../components/Clear"

export default {
  components: {
    CardSmsModal,
    BankDropdown,
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
        bank_id: null,
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
  computed: {
    modal_title() {
      return this.modal.mode === "edit"
        ? this.$i18n.t("edit_card_sms")
        : this.$i18n.t("create_card_sms")
    },
  },
  methods: {
    async fetch() {
      this.loading = true
      const [records, count] = await Promise.all([
        CardSms.find({ ...this.filters, page: this.page, limit: this.limit }),
        CardSms.count(this.filters),
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
        header: this.$i18n.t("delete_card_sms"),
        message: this.$i18n.t("card_sms_will_be_deleted"),
        accept: async () => {
          await CardSms.delete(data.id)
          ToastService.success({
            summary: this.$i18n.t("card_sms_successfully_deleted"),
          })
          this.fetch()
        },
      })
    },
    update_status(data, status) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: status
          ? this.$i18n.t("enable_card_sms")
          : this.$i18n.t("disable_card_sms"),
        message: status
          ? `${this.$i18n.t("card_sms_will_be_enabled")}`
          : `${this.$i18n.t("card_sms_will_be_disabled")}`,
        accept: async () => {
          await CardSms.update(data.id, { status: Number(status) })
          this.fetch()
          ToastService.success({
            summary: status
              ? this.$i18n.t("card_sms_successfully_enabled")
              : this.$i18n.t("card_sms_successfully_disabled"),
          })
        },
      })
    },
    success() {
      this.fetch()
      this.modal.visible = false
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
