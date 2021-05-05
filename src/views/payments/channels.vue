<template>
  <Dialog modal :header="i18n.add_channel" v-model:visible="dialog.display" >
    <div class="p-field p-grid">
      <label for="status" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0">{{i18n.status}}</label>
      <InputSwitch id="status" v-model="dialog.status" />
    </div>
    <Button :label="i18n.submit" icon="pi pi-check" @click="addChannel()" />
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
    <Column field="channel_name" :header="i18n.channel_name">
        <template #body="{ data }">{{ data.name }}</template> 
    </Column>
    <Column field="status" :header="i18n.status">
        <template #body="{ data }">
            <InputSwitch id="status" v-model="data.status" />
        </template> 
    </Column>
    <Column field="edit" :header="i18n.edit">
        <template #body="{ data }">
            <Button :label="i18n.edit" @click="edit(data.id)" />
            <Button class="p-button-danger" :label="i18n.delete" />
        </template> 
    </Column>
    <Column field="cards" :header="i18n.cards">
        <template :value="data.cards" #body="{ data }">
        <div class="p-d-flex p-flex-column">

        <Chip v-bind:key="card.id" v-for="card in data.cards">{{card}}</Chip>
        </div>
        </template> 
    </Column>
  </DataTable>

</template>
<script>
import { FilterMatchMode } from "primevue/api";
import user from "../../api/User";
import channels from '../../api/Channel';
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
    addBank() {},
    addChannel() {
        this.dialog.display = !this.dialog.display;
    },
    showAddDialog(){
        this.dialog.display = !this.dialog.display;
    },
    edit(id) {
        console.log(id);
    }
  },
  created() {
    this.clearFilter();
  },
  mounted() {
    channels
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