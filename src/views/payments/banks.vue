<template>
  <Dialog modal :header="i18n.add_bank" v-model:visible="dialog.display" >
    <div class="p-field p-grid">
    <label for="bank_name" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.bank_name}}</label>
    <InputText id="bank_name" type="text" v-model="dialog.bank_name" />
    </div>
    <div class="p-field p-grid">
    <label for="country" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.country}}</label>
    <InputText id="country" type="text" v-model="dialog.country" />
    </div>
    <div class="p-field p-grid">
    <label for="status" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.status}}</label>
    <InputSwitch id="status" v-model="dialog.status" />
    </div>
    <div class="p-field p-grid">
    <label for="transfer" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.transfer}}</label>
    <InputSwitch id="transfer" v-model="dialog.transfer" />
    </div>
    <Button :label="i18n.submit" icon="pi pi-check" @click="addBank()" />
  </Dialog>
  <Button :label="i18n.add" icon="pi pi-plus" @click.stop="showAddDialog()" />
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
    <Column field="bank_code" :header="i18n.bank_code">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="bank_name" :header="i18n.bank_name">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="transfer" :header="i18n.transfer">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="status" :header="i18n.status">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="country" :header="i18n.country">
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
      i18n: i18n,
      dialog: {
          display: false,
          bank_name: "",
          country: "",
          status: false,
          transfer: false
      }
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
        this.dialog.display = !this.dialog.display;
    },
    showAddDialog() {
        this.dialog.display = !this.dialog.display;
    }
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