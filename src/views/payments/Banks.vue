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
      <form @submit.prevent="fetch" class="p-d-flex p-jc-end">
        <Button class="p-mr-auto" label="新增銀行" @click="create" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="code" :header="i18n.bank_code" />
    <Column field="name" :header="i18n.bank_name" />
    <Column field="transfer" :header="i18n.transfer">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.transfer)"
          @click="update_transfer(data, Number(!data.transfer))"
        />
      </template>
    </Column>
    <Column field="status" :header="i18n.status">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.status)"
          @click="update_status(data, Number(!data.status))"
        />
      </template>
    </Column>
    <Column field="country" :header="i18n.country" />
    <Column field="edit" :header="i18n.edit">
      <template #body="{ data }">
        <Button label="編輯" @click="edit(data)" />
        <Button class="p-button-danger" label="刪除" @click="remove(data)" />
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog />
  <Dialog modal :header="modal_title" v-model:visible="modal.visible">
    <BankModal :mode="modal.mode" :data="modal.data" @success="fetch" />
  </Dialog>
</template>
<script>
import { PrimeIcons } from "primevue/api";
import Bank from "../../api/Bank";
import i18n from "../../helper/i18n.zh-CN.js";
import ToastService from "../../service/ToastService";
import BankModal from "./BankModal";

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

      i18n: i18n,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = true;
      const [records, count] = await Promise.all([
        Bank.find({ ...this.filters, page: this.page, limit: this.limit }),
        Bank.count(this.filters),
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
    update_status(data, status) {
      const verb = status ? "啟用" : "停用";
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: `${verb}銀行`,
        message: `銀行將被${verb}: ${data.name}`,
        accept: () => {
          Bank.update(data.id, { status }).then(() => {
            this.fetch();
            ToastService.success({
              summary: `已${verb}銀行 ${data.name}`,
            });
          });
        },
      });
      this.show_update_status_modal = true;
    },
    update_transfer(data, value) {
      const verb = status ? "啟用" : "停用";
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: `${verb}銀行`,
        message: `銀行將被${verb}: ${data.name}`,
        accept: () => {
          Bank.update(data.id, { transfer: value }).then(() => {
            this.fetch();
            ToastService.success({
              summary: `已${verb}銀行 ${data.name}`,
            });
          });
        },
      });
      this.show_update_status_modal = true;
    },
    edit(data) {
      this.modal.mode = "edit";
      this.modal.data = data;
      this.modal.visible = true;
    },
    create() {
      this.modal.mode = "create";
      this.modal.data = {};
      this.modal.visible = true;
    },
    remove(data) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: "刪除銀行",
        message: `銀行將被刪除: ${data.name}`,
        accept: () => {
          Bank.delete(data.id).then(() => {
            ToastService.success({ summary: `已刪除銀行 ${data.name}` });
            this.fetch();
          });
        },
      });
    },
  },
  computed: {
    modal_title() {
      return this.modal.mode === "edit" ? "編輯銀行" : "新增銀行";
    },
  },
};
</script>
<style scoped>
</style>