<template>
  <Dialog modal :header="i18n.add_card" v-model:visible="dialog.display" >
    <div class="p-field p-grid">
    <label for="channel" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.channel}}</label>
    <Dropdown id="channel" :options="dialog.channels" type="text" v-model="dialog.channel" />
    </div>
    <div class="p-field p-grid">
    <label for="card_holder" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.card_holder}}</label>
    <Dropdown id="card_holder" :options="dialog.account_names" type="text" v-model="dialog.account_name" />
    </div>
    <div class="p-field p-grid">
    <label for="bank" class="p-col-12 p-mb-2 p-md-4 p-md-md-0">{{i18n.bank_name}}</label>
    <InputText id="bank" type="text" v-model="dialog.bank_name" />
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
    <label for="pb_api_key" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.pb_api_key}}</label>
    <InputText id="pb_api_key" v-model="dialog.pb_api_key" />
    </div>
    <div class="p-field p-grid">
    <label for="plugin_mode" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.plugin_mode}}</label>
    <Dropdown id="plugin_mode" :options="dialog.plugins" type="text" v-model="dialog.plugin" />
    </div>
    <div class="p-field p-grid">
    <label for="status" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.status}}</label>
    <InputSwitch id="status" v-model="dialog.status" />
    </div>
    <Button :label="i18n.submit" :icon="dialog.icon" @click="commit()" />
  </Dialog>

  <ConfirmPopup />
  
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
      <h2><b>{{i18n.card_management}}</b></h2>
      <div class="p-d-flex p-jc-between p-flex-column p-flex-sm-row">
        <Button
          type="button"
          icon="pi pi-plus"
          :label=i18n.add
          _class="p-button-outlined p-mb-2"
          @click="addEntry()"
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
        <template #body="{ data }">{{ data.channel }}</template> 
    </Column>
    <Column field="card_id" :header="i18n.card_id">
        <template #body="{ data }">{{ data.card_id }}</template> 
    </Column>
    <Column field="merchant" :header="i18n.merchant">
        <template #body="{ data }">{{ data.merchant }}</template> 
    </Column>
    <Column field="bank_name" :header="i18n.bank_name">
        <template #body="{ data }">{{ data.bank_name }}</template> 
    </Column>
    <Column field="account_name" :header="i18n.account_name">
        <template #body="{ data }">{{ data.account_name }}</template> 
    </Column>
    <Column field="card_number" :header="i18n.card_number">
        <template #body="{ data }">{{ data.card_number }}</template> 
    </Column>
    <Column field="limit_daily" :header="i18n.limit_daily">
        <template #body="{ data }">{{ data.limit_daily }}</template> 
    </Column>
    <Column field="limit_once" :header="i18n.limit_once">
        <template #body="{ data }">{{ data.limit_once }}</template> 
    </Column>
    <Column field="status" :header="i18n.status">
        <template #body="{ data }">
            <InputSwitch id="status" v-model="data.status" @click="update($event, data)"/>
        </template> 
    </Column>
    <Column field="edit" :header="i18n.edit">
        <template #body="{ data }">
            {{ data.signin_id }}
        <Button :label="i18n.edit" @click="editEntry(data.id)" />
        <Button :label="i18n.delete" @click="delEntry($event, data)" class="p-button-danger" />

        </template> 
    </Column>
  </DataTable>

</template>
<script>
import { FilterMatchMode } from "primevue/api";
import cards from '../../api/Card';
import i18n from "../../helper/i18n.zh-CN.js"

const dialogAddContent = {
  title: i18n.add,
  display: true,
  button: i18n.add,
  icon: "pi pi-plus"
}

const dialogEditContent = {
  title: i18n.edit,
  display: true,
  button: i18n.edit,
  icon: "pi pi-edit"
}

const dialogEmptyData = {
  channel: '',
  card_id: '',
  merchant: '',
  account_name: '',
  card_number: '',
  limit_daily: 0,
  limit_once: 0,
  status: false,
  memo: ''
}

export default {
  data() {
    return {
      records: [],
      loading: true,
      filters: {},
      i18n: i18n,
      dialog: {
          display: false,
          account_name: '',
          account_names: ['tony_chen','jimmy_wang'],
          channel: '',
          channels: ['c01', 'c02'],
          plugin: '',
          plugins: ['sms', 'spider']

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
    addEntry() {
      Object.assign(this.dialog, dialogAddContent, dialogEmptyData)
    },
    editEntry(id) {
      let data = this.records.filter(x => x.id == id)[0];
      Object.assign(this.dialog, dialogEditContent, data);
    },
    delEntry(event, id) {
      this.$confirm.require({
        target: event.currentTarget,
        message: i18n.dialog_confirm,
        icon: 'pi pi-exclamation-circle',
        accept: () => {
          cards.delete({id: id})
        },
        reject: () => {

        }
      })
    },
    update(event, data) {

    },
    commit() {

    },
    showDialog() {

    }
  },
  created() {
    this.clearFilter();
  },
  mounted() {
    cards
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