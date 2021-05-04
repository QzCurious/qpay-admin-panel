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
          label="Add"
          class="p-button-outlined p-mb-2"
          @click="addBank"
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
    <Column field="index" :header="i18n.index">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="merchant" :header="i18n.merchant">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="bank_name" :header="i18n.bank_name">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="account_name" :header="i18n.account_name">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="card_number" :header="i18n.card_number">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="limit_deposit" :header="i18n.limit_deposit">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="limit_daily" :header="i18n.limit_daily">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="limit_once" :header="i18n.limit_once">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="status" :header="i18n.status">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="edit" :header="i18n.edit">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
  </DataTable>

</template>
<script>
import { FilterMatchMode } from "primevue/api";
import user from "../../api/User";
import banks from '../../api/Bank';
import i18n from "../../helper/i18n.zh-CN.js"

export default {
  data() {
    return {
      records: [],
      loading: true,
      filters: {},
      i18n: i18n
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
    addBank() {
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
}
</script>
<style scoped>

</style>