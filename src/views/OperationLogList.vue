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
    <Column header="index" :sortable="false">
      <template #body="{ index }">
        {{ index + 1 }}
      </template>
    </Column>
    <Column field="signin_id" header="operator" :showFilterMatchModes="false">
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
    <Column field="company" header="company" :showFilterMatchModes="false">
      <template #body="{ data }">
        {{ data.company }}
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
    <Column field="type" header="type" :showFilterMatchModes="false">
      <template #body="{ data }">
        {{ data.type }}
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
    <Column field="sub_type" header="sub_type" :showFilterMatchModes="false">
      <template #body="{ data }">
        {{ data.sub_type }}
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
    <Column field="remark" header="remark" :showFilterMatchModes="false">
      <template #body="{ data }">
        {{ data.remark }}
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
      field="action_type"
      header="action_type"
      :showFilterMatchModes="false"
    >
      <template #body="{ data }">
        {{ data.action_type }}
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
    <Column field="ip" header="operator_ip" :showFilterMatchModes="false">
      <template #body="{ data }">
        {{ data.ip }}
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
    <Column field="time" header="operator_time" dataType="date">
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
        signin_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        company: { value: null, matchMode: FilterMatchMode.CONTAINS },
        type: { value: null, matchMode: FilterMatchMode.CONTAINS },
        sub_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
        remark: { value: null, matchMode: FilterMatchMode.CONTAINS },
        action_type: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ip: { value: null, matchMode: FilterMatchMode.CONTAINS },
        time: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
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