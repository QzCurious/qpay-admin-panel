<template>
  <Dialog modal :header="i18n.add_card_holder" v-model:visible="dialog.display" >
    <div class="p-field p-grid">
      <label for="phone" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.phone}}</label>
      <InputText id="phone" type="text" v-model="dialog.phone" />
    </div>
    <div class="p-field p-grid">
      <label for="status" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.status}}</label>
      <InputSwitch id="status" v-model="dialog.status" />
    </div>
    <Button :label="i18n.submit" icon="pi pi-check" @click="addCardHolder()" />
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
        <template #body="{ data }">{{ data.id }}</template> 
    </Column>
    <Column field="holder_name" :header="i18n.holder_name">
        <template #body="{ data }">{{ data.name }}</template> 
    </Column>
    <Column field="status" :header="i18n.status">
        <template #body="{ data }">{{ data.status }}</template> 
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
          <Button :label="i18n.edit" @click="editData(data)" />
          <Button class="p-button-danger" :label="i18n.delete" @click="deleteData(data)" />
        </template> 
    </Column>
  </DataTable>

</template>
<script>
import { FilterMatchMode } from "primevue/api";
import user from "../../api/User";
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
        display: false,
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
    addBank() {
    },
    addCardHolder(){
      this.dialog.display = !this.dialog.display;
    },
    showAddDialog() {
      this.dialog.display = !this.dialog.display;
    },
    editData() {

    },
    deleteData() {

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