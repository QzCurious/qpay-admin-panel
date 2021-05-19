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
        <Button class="p-mr-auto" label="新增商戶" @click="create" />
        <Dropdown
          label="狀態"
          v-model="filters.status"
          :options="[
            { label: 'disabled', value: 0 },
            { label: 'enabled', value: 1 },
          ]"
        />
        <Button
          type="submit"
          icon="pi pi-search"
          label="搜尋"
          class="p-button-outlined"
        />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="name" header="商戶名稱" />
    <Column field="status" header="狀態">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.status)"
          @click="update_status(data, !data.status)"
        />
      </template>
    </Column>
    <Column field="created_at" header="創建時間">
      <template #body="{ data }">
        {{
          data.created_at &&
          moment.unix(data.created_at).format(CONSTANTS.DATETIME_FORMAT)
        }}
      </template>
    </Column>
    <Column header="操作" :sortable="false">
      <template #body="{ data }">
        <Button
          class="p-button-primary p-m-1"
          label="編輯"
          @click="edit(data)"
        />
        <Button
          class="p-button-danger p-m-1"
          label="刪除"
          @click="remove(data)"
        />
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog></ConfirmDialog>
  <Dialog modal header="新增商戶" v-model:visible="create_modal.visible">
    <CreateMerchant @success="fetch" />
  </Dialog>
  <Dialog modal header="編輯商戶" v-model:visible="edit_modal.visible">
    <EditMerchant :id="edit_modal.data.id" @success="fetch" />
  </Dialog>
</template>
<script>
import { defineComponent } from "vue";
import { PrimeIcons } from "primevue/api";
import Merchant from "../../api/Merchant";
import ToastService from "../../service/ToastService";
import Dropdown from "../../components/Dropdown";
import CreateMerchant from "./CreateMerchant";
import EditMerchant from "./EditMerchant";

export default defineComponent({
  name: "FundsOperationPanel",
  components: { Dropdown, CreateMerchant, EditMerchant },
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
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = true;
      const [records, count] = await Promise.all([
        Merchant.find({ ...this.filters, page: this.page, limit: this.limit }),
        Merchant.count(this.filters),
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
        header: `${verb}商戶`,
        message: `商戶將被${verb}: ${data.name}`,
        accept: () => {
          Merchant.update(data.id, { status: Number(status) }).then(() => {
            data.status = status;
            ToastService.success({ summary: `已${verb}商戶 ${data.name}` });
          });
        },
      });
      this.show_update_status_modal = true;
    },
    edit(data) {
      this.edit_modal.data = data;
      this.edit_modal.visible = true;
    },
    create() {
      this.create_modal.visible = true;
    },
    remove(data) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: "刪除商戶",
        message: `商戶將被刪除: ${data.name}`,
        accept: () => {
          Merchant.delete(data.id).then(() => {
            ToastService.success({ summary: `已刪除商戶 ${data.name}` });
            this.fetch();
          });
        },
      });
    },
  },
});
</script>

<style scoped>
form > :not(:last-child) {
  margin-right: 0.5rem;
}
</style>