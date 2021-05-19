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
        <Button
          class="p-mt-4 p-mr-auto"
          label="新增職位"
          @click="create_role"
        />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="signin_id" header="帳號" />
    <Column field="role_id" header="職位 id">
      <template #body="{ data }">
        <span class="p-d-inline-flex p-ai-center">
          {{ data.role_id }}
          <Button
            class="p-ml-2 p-button-sm"
            label="編輯"
            @click="edit_role(data)"
          />
        </span>
      </template>
    </Column>
    <Column field="role_name" header="職位" />
  </DataTable>
  <Dialog modal :header="modal_title" v-model:visible="modal.visible">
    <RoleModal :mode="modal.mode" :data="modal.data" />
  </Dialog>
</template>

<script>
import User from "../../api/User";
import RoleModal from "./RoleModal";

export default {
  components: { RoleModal },
  data() {
    return {
      loading: true,
      page: 1,
      limit: 10,
      filters: {},
      records: [],
      totalRecords: 0,
      modal: {
        visible: false,
        mode: null,
        data: {},
      },
    };
  },
  computed: {
    modal_title() {
      return this.modal.mode === "edit" ? "編輯帳號" : "新增帳號";
    },
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
    edit_role(data) {
      this.modal.mode = "edit";
      this.modal.data = data;
      this.modal.visible = true;
    },
    create_role() {
      this.modal.mode = "create";
      this.modal.data = {};
      this.modal.visible = true;
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style>
</style>