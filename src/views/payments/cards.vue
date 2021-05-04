<template>
  <Dialog modal :header="i18n.add_card" v-model:visible="dialog.display" >
    <div class="p-field p-grid">
    <label for="channel" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.channel}}</label>
    <Dropdown id="channel" :options="dialog.channels" type="text" v-model="dialog.selected_channel" />
    </div>
    <div class="p-field p-grid">
    <label for="card_holder" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.card_holder}}</label>
    <Dropdown id="card_holder" :options="dialog.card_holders" type="text" v-model="dialog.selected_card_holder" />
    </div>
    <div class="p-field p-grid">
        <label for="" class="p-col-12 p-mb-2 p-md-4 p-md-md-0">{{i18n.bank}}</label>
    </div>
    <div class="p-field p-grid">
    <label for="branch" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.branch}}</label>
    <InputText id="branch" type="text" v-model="dialog.branch" />
    </div>
    <div class="p-field p-grid">
    <label for="card_number" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.card_number}}</label>
    <InputText id="card_number" v-model="dialog.card_number" />
    </div>
    <div class="p-field p-grid">
    <label for="internet_banking_id" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.internet_banking_id}}</label>
    <InputText id="internet_banking_id" v-model="dialog.internet_banking_id" />
    </div>
    <div class="p-field p-grid">
    <label for="internet_banking_password" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.internet_banking_password}}</label>
    <InputText id="internet_banking_password" v-model="dialog.internet_banking_password" />
    </div>
    <div class="p-field p-grid">
    <label for="status" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.status}}</label>
    <InputSwitch id="status" v-model="dialog.status" />
    </div>
    <Button :label="i18n.submit" icon="pi pi-check" @click="submit" />
  </Dialog>
  <Button :label="i18n.add" icon="pi pi-plus" @click.stop="showAddDialog" />
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
          @click="filter"
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
    <Column field="channel" :header="i18n.channel">
        <template #body="{ data }">{{ data.signin_id }}</template> 
    </Column>
    <Column field="card_id" :header="i18n.card_id">
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
      i18n: i18n,
      dialog: {
          display: false,
          selected_channel: '',
          selected_card_holder: '',
          card_holders: ['a','b','c'],
          channels: ['ch1', 'ch2']
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
    submit() {
        this.dialog.display = !this.dialog.display
    },
    showAddDialog() {
        this.dialog.display = !this.dialog.display
    },
    filter() {

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