<template>
  <Dialog modal :header="dialog.title" v-model:visible="dialog.display" >
    <div class="p-field p-grid">
    <label for="bank_name" class="p-col-12 p-mb-10 p-md-4 p-mb-md-0">{{i18n.bank_name}}</label>
    <InputText id="bank_name" type="text" v-model="dialog.name" />
    </div>
    <div class="p-field p-grid">
    <label for="country" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.country}}</label>
    <InputText id="country" type="text" v-model="dialog.country" />
    </div>
    <div class="p-field p-grid">
    <label for="code" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.bank_code}}</label>
    <InputText id="code" type="text" v-model="dialog.code" />
    </div>
    <div class="p-field p-grid">
    <label for="transfer" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.transfer}}</label>
    <InputSwitch id="transfer" v-model="dialog.transfer" />
    </div>
    <div class="p-field p-grid">
    <label for="status" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.status}}</label>
    <InputSwitch id="status" v-model="dialog.status" />
    </div>
    <!-- <Button :label="i18n.submit" icon="pi pi-check" @click="addBank()" /> -->
    <Button :label="dialog.button" :icon="dialog.icon" @click="commit()" />
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
    sortField="code"
    v-model:filters="filters"
  >
    <template #header>
      <h2><b>{{i18n.bank_management}}</b></h2>
      <div class="p-d-flex p-jc-between p-flex-column p-flex-sm-row">
        <Button
          type="button"
          icon="pi pi-plus"
          :label="i18n.add"
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
    <!-- <Column field="index" :header="i18n.index">
        <template #body="{ data }">{{ data.id }}</template> 
    </Column> -->
    <Column field="bank_code" :header="i18n.bank_code" sortable>
        <template #body="{ data }">{{ data.code }}</template> 
    </Column>
    <Column field="bank_name" :header="i18n.bank_name">
        <template #body="{ data }">{{ data.name }}</template> 
    </Column>
    <Column field="transfer" :header="i18n.transfer">
        <template #body="{ data }">
            <InputSwitch v-model="data.transfer" @click="update($event, data)"/>
        </template> 
    </Column>
    <Column field="status" :header="i18n.status">
        <template #body="{ data }">
            <InputSwitch v-model="data.status" @click="update($event, data)"/>
        </template> 
    </Column>
    <Column field="country" :header="i18n.country">
        <template #body="{ data }">{{ data.country }}</template> 
    </Column>
    <Column field="edit" :header="i18n.edit">
        <template #body="{ data }">
            <Button :label="i18n.edit" @click="editEntry(data.id)"/>
            <Button class="p-button-danger" :label="i18n.delete" @click="delEntry($event, data.id)" />
        </template> 
    </Column>
  </DataTable>

</template>
<script>
import { FilterMatchMode } from "primevue/api";
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
        title: i18n.add,
        display: false,
        button: i18n.add,
        icon: "pi pi-check",

        id: undefined,
        name: "",
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
      };
    },
    addEntry() {
      Object.assign(this.dialog, {
        title: i18n.add,
        display: true,
        button: i18n.add,
        icon: "pi pi-check",

        id: undefined,
        code: undefined,
        name: "",
        country: "",
        status: true
      })
    },
    editEntry(id) {
      let data = this.records.filter(x => x.id == id)[0];

      Object.assign(this.dialog, {
        title: i18n.edit,
        display: true,
        button: i18n.commit,
        icon: "pi pi-edit",

        id: id,
        code: data.code,
        name: data.name,
        country: data.country,
        status: data.status,
        transfer: data.transfer,
      })

    },
    delEntry(event, id) {
      console.log(this);
      this.$confirm.require({
          target: event.currentTarget,
          message: i18n.dialog_confirm,
          icon: 'pi pi-exclamation-circle',
          accept: () => {
              //callback to execute when user confirms the action
              banks.delete({id: id});
          },
          reject: () => {
              //callback to execute when user rejects the action
          }
      })
    },
    update(event, data) {
      let {status, transfer} = data;
      console.log(status + ', ' + transfer)
      this.$confirm.require({
        target: event.currentTarget,
        message: i18n.dialog_confirm,
        icon: 'pi pi-exclamation-circle',
        accept: () => {
          banks.update(data);
        }, 
        reject: () => {
          let record = this.records.filter(x => x.id == data.id)[0];
          record.status = status;
          record.transfer = transfer;
        }
      })
    },
    commit() {
      switch(this.dialog.title) {
        case i18n.add:
          banks.create(this.dialog);
        break;
        case i18n.edit:
          banks.update(this.dialog);
        break;
        default: console.warn('Unknown action.');
        break;
      }
      this.dialog.display = false;
      banks.all().then(({data}) => {this.records = data;});
    },
    showDialog() {
        this.dialog.display = !this.dialog.display;
    }
  },
  created() {
    this.clearFilter();
  },
  mounted() {
    banks
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