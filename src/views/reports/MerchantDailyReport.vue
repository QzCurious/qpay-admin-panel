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
    <Column field="date" :header="i18n.date">
        <template #body="{ data }">{{ data.date }}</template> 
    </Column>
    <Column field="merchant" :header="i18n.merchant">
        <template #body="{ data }">{{ data.merchant }}</template> 
    </Column>
    <Column field="channel" :header="i18n.channel">
        <template #body="{ data }">{{ data.channel }}</template> 
    </Column>
    <Column field="deposit_amount" :header="i18n.deposit_amount">
        <template #body="{ data }">{{ data.deposit_amount }}</template> 
    </Column>
    <Column field="deposit_fee" :header="i18n.deposit_fee">
        <template #body="{ data }">{{ data.deposit_fee }}</template> 
    </Column>
    <Column field="deposit_count" :header="i18n.deposit_count">
        <template #body="{ data }">{{ data.deposit_count }}</template> 
    </Column>
    <Column field="auto_deposit" :header="i18n.auto_deposit">
        <template #body="{ data }">{{ data.auto_deposit }}</template> 
    </Column>
    <Column field="manual_deposit" :header="i18n.manual_deposit">
        <template #body="{ data }">{{ data.manual_deposit }}</template> 
    </Column>
    <Column field="total_deposit" :header="i18n.total_deposit">
        <template #body="{ data }">{{ data.total_deposit }}</template> 
    </Column>
    <Column field="deposit_count" :header="i18n.deposit_count">
        <template #body="{ data }">{{ data.deposit_count }}</template> 
    </Column>
    <Column field="recharge_fee" :header="i18n.recharge_fee">
        <template #body="{ data }">{{ data.recharge_fee }}</template> 
    </Column>
    <Column field="deduction_amount" :header="i18n.deduction_amount">
        <template #body="{ data }">{{ data.deduction_amount }}</template> 
    </Column>
    <Column field="deduction_fee" :header="i18n.deduction_fee">
        <template #body="{ data }">{{ data.deduction_fee }}</template> 
    </Column>
    <Column field="opening_balance" :header="i18n.opening_balance">
        <template #body="{ data }">{{ data.opening_balance }}</template> 
    </Column>
    <Column field="ending_balance" :header="i18n.ending_balance">
        <template #body="{ data }">{{ data.ending_balance }}</template> 
    </Column>
  </DataTable>

</template>
<script>
import { FilterMatchMode } from "primevue/api";
import user from "../../api/User";
import merchantDailyReport from '../../api/MerchantDailyReport';
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
    merchantDailyReport
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