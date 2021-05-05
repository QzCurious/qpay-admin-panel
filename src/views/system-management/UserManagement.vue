<template>
  <div><Button label="新增使用者" @click="create_user" /></div>
  <DataTable
    responsiveLayout="scroll"
    dataKey="id"
    :loading="loading"
    :value="records"
    :paginator="true"
    :rows="10"
    :rowsPerPageOptions="[10, 15, 20, 25]"
    :rowHover="true"
  >
    <template #header>
      <div class="p-d-flex p-jc-between p-flex-column p-flex-sm-row">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          class="p-button-outlined p-mb-2"
        />
        <span class="p-input-icon-left p-mb-2">
          <i class="pi pi-search" />
          <InputText placeholder="Keyword Search" style="width: 100%" />
        </span>
      </div>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="signin_id" header="帳號"></Column>
    <Column field="company" header="機構"></Column>
    <Column field="role.name" header="職位"> </Column>
    <Column field="status" header="status">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="data.status"
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
    <UserModal :mode="modal.mode" :data="modal.data" />
  </Dialog>
</template>

<script>
import { PrimeIcons } from "primevue/api";
import User from "../../api/User";
import UserModal from "./UserModal";

export default {
  components: { UserModal },
  data() {
    return {
      records: [],
      loading: true,
      filters: {},
      modal: {
        visible: false,
        mode: null,
        data: {},
      },
    };
  },
  methods: {
    update_user_status(data, status) {
      const verb = status ? "啟用" : "停用";
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: `${verb}帳號`,
        message: `帳號將被${verb}: ${data.signin_id}`,
        accept: () => {
          User.update(data.id, { status }).then(() => {
            data.status = status;
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
  mounted() {
    User.all()
      .then(({ data }) => {
        this.records = data;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style>
</style>