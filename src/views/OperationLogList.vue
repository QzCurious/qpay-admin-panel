<template>
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
    <Column field="id" header="ID" :showFilterMatchModes="false">
      <template #body="{ data }">
        <span class="p-column-title">ID</span>
        {{ data.id }}
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
    <Column field="username" header="帳號" :showFilterMatchModes="false">
      <template #body="{ data }">
        <span class="p-column-title">帳號</span>
        {{ data.username }}
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
    <Column field="operation" header="操作" :showFilterMatchModes="false">
      <template #body="{ data }">
        <span class="p-column-title">操作</span>
        {{ data.operation }}
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
    <Column field="detail" header="詳情" :showFilterMatchModes="false">
      <template #body="{ data }">
        <span class="p-column-title">詳情</span>
        {{ data.detail }}
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
    <Column header="時間" field="time" dataType="date" :sortable="true">
      <template #body="{ data }">
        {{ formatDate(data.time) }}
      </template>
      <template #filter="{ filterModel }">
        <Calendar
          v-model="filterModel.value"
          dateFormat="yy/mm/dd"
          placeholder="yyyy/mm/dd"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import { defineComponent } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import operationLogApi from "../api/OperationLog";

export default defineComponent({
  name: "OperationLog",
  data() {
    return {
      records: [],
      loading: true,
      filters: {},
    };
  },
  methods: {
    clearFilter() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { value: null, matchMode: FilterMatchMode.CONTAINS },
        operation: { value: null, matchMode: FilterMatchMode.CONTAINS },
        detail: { value: null, matchMode: FilterMatchMode.CONTAINS },
        time: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        ip: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    formatDate(date) {
      return date.toLocaleDateString("zh-TW", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  created() {
    this.clearFilter();
  },
  mounted() {
    operationLogApi
      .get()
      .then(({ data }) => {
        this.records = data.map((record) => ({
          ...record,
          time: new Date(record.timestamp),
        }));
      })
      .finally(() => (this.loading = false));
  },
});
</script>

<style>
</style>