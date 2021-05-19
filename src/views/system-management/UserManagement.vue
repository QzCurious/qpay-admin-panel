<template>
  <DataTable
    responsiveLayout="scroll"
    dataKey="id"
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
      <form @submit.prevent="fetch" class="p-d-flex p-ai-start p-jc-end">
        <Button class="p-mr-auto" label="新增使用者" @click="create_user" />
        <MerchantDropdown label="機構" v-model="filters.merchant_id" />
        <Button class="p-button-outlined" type="submit">搜尋</Button>
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="signin_id" header="帳號"></Column>
    <Column field="merchant_name" header="機構"></Column>
    <Column field="role_name" header="職位"></Column>
    <Column field="status" header="status">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.status)"
          @click="update_user_status(data, !data.status)"
        />
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <Button label="編輯" @click="edit_user(data)" />
        <Button label="重設 2fa" @click="reset_2fa(data)" />
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog />
  <Dialog modal :header="modal_title" v-model:visible="modal.visible">
    <UserModal :mode="modal.mode" :data="modal.data" @success="fetch" />
  </Dialog>
</template>

<script>
import { PrimeIcons } from "primevue/api";
import User from "../../api/User";
import UserModal from "./UserModal";
import MerchantDropdown from "../../components/MerchantDropdown";
import ToastService from "../../service/ToastService";

export default {
  components: { UserModal, MerchantDropdown },
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
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = true;
      const [records, count] = await Promise.all([
        User.find({ ...this.filters, page: this.page, limit: this.limit }),
        User.count(this.filters),
      ]);
      this.records = records.data.data;
      this.totalRecords = count.data.count;
      window.scrollTo(0, 0);
      this.loading = false;
    },
    on_page(e) {
      this.page = e.page + 1;
      this.fetch();
    },
    update_user_status(data, status) {
      const verb = status ? "啟用" : "停用";
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: `${verb}帳號`,
        message: `帳號將被${verb}: ${data.signin_id}`,
        accept: () => {
          User.update(data.signin_id, { status: Number(status) }).then(() => {
            data.status = status;
            ToastService.success({
              summary: `已${verb}帳號 ${data.signin_id}`,
            });
          });
        },
      });
      this.show_update_status_modal = true;
    },
    reset_2fa(data) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: `重設 2fa`,
        message: `帳號 2fa 將被重設: ${data.signin_id}`,
        accept: () => {
          User.reset_2fa(data.id).then(() => {
            data.status = status;
          });
        },
      });
      this.show_update_status_modal = true;
    },
    edit_user(data) {
      this.modal.mode = "edit";
      this.modal.data = data;
      this.modal.visible = true;
    },
    create_user() {
      this.modal.mode = "create";
      this.modal.data = {};
      this.modal.visible = true;
    },
  },
  computed: {
    modal_title() {
      return this.modal.mode === "edit" ? "編輯帳號" : "新增帳號";
    },
  },
};
</script>

<style scoped>
form > :not(:last-child) {
  margin-right: 0.5rem;
}
</style>