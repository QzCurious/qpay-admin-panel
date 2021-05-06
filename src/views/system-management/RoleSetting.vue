<template>
  <div><Button label="新增職位" @click="create_role" /></div>
  <DataTable
    responsiveLayout="scroll"
    dataKey="id"
    filterDisplay="menu"
    :loading="loading"
    :value="records"
    :paginator="true"
    :rows="10"
    :rowsPerPageOptions="[10, 15, 20, 25]"
    :rowHover="true"
    v-model:filters="filters"
  >
    <template #header>
      <div class="p-d-flex p-jc-between p-flex-column p-flex-sm-row">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          class="p-button-outlined p-mb-2"
          @click="clearFilter"
        />
        <span class="p-input-icon-left p-mb-2">
          <i class="pi pi-search" />
          <InputText
            v-model="filters.global.value"
            placeholder="Keyword Search"
            style="width: 100%"
          />
        </span>
      </div>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="signin_id" header="帳號" :showFilterMatchModes="false">
      <template #body="{ data }">
        {{ data.signin_id }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          @keydown.enter="filterCallback"
        />
      </template>
    </Column>
    <Column
      filterField="role.id"
      header="職位 id"
      :showFilterMatchModes="false"
    >
      <template #body="{ data }">
        <span class="p-d-inline-flex p-ai-center">
          {{ data.role.id }} <Button class="p-ml-2 p-button-sm" label="編輯" @click="edit_role(data)" />
        </span>
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          @keydown.enter="filterCallback"
        />
      </template>
    </Column>
    <Column field="role.name" header="職位" :showFilterMatchModes="false">
      <template #body="{ data }">
        {{ data.role.name }}
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          type="text"
          v-model="filterModel.value"
          class="p-column-filter"
          @keydown.enter="filterCallback"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog modal :header="modal_title" v-model:visible="modal.visible">
    <RoleModal :mode="modal.mode" :data="modal.data" />
  </Dialog>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import user from "../../api/User";
import RoleModal from "./RoleModal";

export default {
  components: { RoleModal },
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
    clearFilter() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        signin_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        "role.id": { value: null, matchMode: FilterMatchMode.CONTAINS },
        "role.name": { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
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
  created() {
    this.clearFilter();
  },
  mounted() {
    user
      .all()
      .then(({ data }) => {
        this.records = data;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style>
</style>