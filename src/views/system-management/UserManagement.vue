<template>
  <h2>{{ $t("user_management") }}</h2>
  <DataTable
    responsiveLayout="scroll"
    dataKey="signin_id"
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
        <Button
          class="p-mr-auto"
          :label="$t('form.create')"
          @click="create_user"
        />
        <MerchantDropdown
          v-if="merchant_type !== MERCHANT_TYPE.MERCHANT"
          :label="$t('company')"
          v-model="filters.merchant_id"
        />
        <Search v-if="merchant_type !== MERCHANT_TYPE.MERCHANT" />
        <Clear v-if="merchant_type !== MERCHANT_TYPE.MERCHANT" @click="clear" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="signin_id" :header="$t('signin_id')"></Column>
    <Column field="merchant_name" :header="$t('company')"></Column>
    <Column field="role_name" :header="$t('role')"></Column>
    <Column field="status" :header="$t('status')">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.status)"
          @click="update_user_status(data, !data.status)"
        />
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <Button
          class="p-mr-1 p-button-sm"
          :label="$t('form.edit')"
          @click="edit_user(data)"
        />
        <Button
          class="p-button-sm"
          :label="$t('reset_2fa')"
          @click="reset_2fa(data)"
        />
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog />
  <Dialog modal :header="modal_title" v-model:visible="modal.visible">
    <UserModal :mode="modal.mode" :data="modal.data" @success="success" />
  </Dialog>
</template>

<script>
import { PrimeIcons } from "primevue/api"
import User from "../../api/User"
import UserModal from "./UserModal"
import MerchantDropdown from "../../components/MerchantDropdown"
import Search from "../../components/Search"
import Clear from "../../components/Clear"
import ToastService from "../../service/ToastService"
import { mapGetters } from "vuex"

export default {
  components: { UserModal, MerchantDropdown, Search, Clear },
  data() {
    return {
      loading: true,
      page: 1,
      limit: 10,
      filters: {
        merchant_id: null,
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
        User.find({ ...this.filters, page: this.page, limit: this.limit }),
        User.count(this.filters),
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
    update_user_status(data, status) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: status
          ? this.$i18n.t("enable_account")
          : this.$i18n.t("disable_account"),
        message: status
          ? `${this.$i18n.t("account_will_be_enabled")}: ${data.signin_id}`
          : `${this.$i18n.t("account_will_be_disabled")}: ${data.signin_id}`,
        accept: async () => {
          await User.update(data.signin_id, { status: Number(status) })
          this.fetch()
          ToastService.success({
            summary: status
              ? this.$i18n.t("account_successfully_enabled")
              : this.$i18n.t("account_successfully_disabled"),
          })
        },
      })
      this.show_update_status_modal = true
    },
    reset_2fa(data) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: this.$i18n.t("reset_2fa"),
        message: `${this.$i18n.t("account_2fa_will_be_reset")}: ${
          data.signin_id
        }`,
        accept: async () => {
          await User.reset_2fa(data.signin_id)
          this.fetch()
        },
      })
      this.show_update_status_modal = true
    },
    edit_user(data) {
      this.modal.mode = "edit"
      this.modal.data = data
      this.modal.visible = true
    },
    create_user() {
      this.modal.mode = "create"
      this.modal.data = {}
      this.modal.visible = true
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
  computed: {
    modal_title() {
      return this.modal.mode === "edit"
        ? this.$i18n.t("edit_account")
        : this.$i18n.t("create_account")
    },
    ...mapGetters("auth", ["merchant_type", "MERCHANT_TYPE"]),
  },
}
</script>

<style scoped>
.header > :not(:last-child) {
  margin: 0 0.5rem 0.5rem 0;
}
</style>
