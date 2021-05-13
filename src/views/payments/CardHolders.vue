<template>
  <Dialog modal :header="dialog.title" v-model:visible="dialog.display" >
    <div class="p-field p-grid">
      <label for="phone" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.phone}}</label>
      <InputText id="phone" type="text" v-model="dialog.phone" />
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
      <h2><b>{{i18n.card_holder_management}}</b></h2>
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
    <Column field="index" :header="i18n.index">
        <template #body="{ data }">{{ data.id }}</template> 
    </Column>
    <Column field="holder_name" :header="i18n.holder_name">
        <template #body="{ data }">{{ data.name }}</template> 
    </Column>
    <Column field="status" :header="i18n.status">
        <template #body="{ data }">
          <InputSwitch id="status" v-model="data.status" @click="update($event, data)"/>
        </template> 
    </Column>
    <Column field="card_list" :header="i18n.card_list">

        <template #body="{ data }">
        <div class="p-d-flex p-flex-column">
          <Chip v-bind:key="card.id" v-for="card in data.cards"> {{card}}</Chip>
        </div>
        </template> 
    </Column>
    <Column field="phone" :header="i18n.phone">
        <template #body="{ data }">{{ data.phone }}</template> 
    </Column>
    <Column field="edit" :header="i18n.edit">
        <template #body="{ data }">
          <Button :label="i18n.edit" @click="editEntry(data.id)" />
          <Button class="p-button-danger" :label="i18n.delete" @click="delEntry($event, data.id)" />
        </template> 
    </Column>
  </DataTable>

</template>
<script>
import { FilterMatchMode } from "primevue/api";
import cardHolders from "../../api/CardHolder";
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
        icon: "pi pi-plus",

        name: '',
        phone: '',
        status: false
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
      Object.assign(this.dialog, {
        title: i18n.add,
        display: true,
        button: i18n.add,
        icon: "pi pi-check",

        id: undefined,
        name: "",
        phone: "",
        status: false
      });

    },
    editEntry(id) {
      let data = this.records.filter(x => x.id == id)[0];

      Object.assign(this.dialog, {
        title: i18n.edit,
        display: true,
        button: i18n.edit,
        icon: "pi pi-edit",
      }, data);
    },
    delEntry(event, id) {
      console.log(id);
      this.$confirm.require({
        target: event.currentTarget,
        message: i18n.dialog_confirm,
        icon: 'pi pi-exclamation-circle',
        accept: () => {
          cardHolders.delete({id: id})
        },
        reject: () => {

        }
      })

    },
    update(event, data) {
      let {status} = data;
      this.$confirm.require({
        target: event.currentTarget,
        message: i18n.dialog_confirm,
        icon: 'pi pi-exclamation-circle',
        accept: () => {
          cardHolders.update(data);
        },
        reject: () => {
          let record = this.records.filter(x => x.id == data.id)[0];
          record.status = status;
        }
      })
    },
    commit() {
      switch(this.dialog.title) {
        case i18n.add:
          cardHolders.create(this.dialog);
        break;
        case i18n.edit:
          cardHolders.update(this.dialog);
        break;
        default: console.warn('Unknown action.');
        break;
      }
      this.dialog.display = false;
      cardHolders.all().then(({data}) => {this.records = data});
    },
    showDialog() {
      this.dialog.display = true;
    }
  },
  created() {
    this.clearFilter();
  },
  mounted() {
    cardHolders
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