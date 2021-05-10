<template>
  <DataTable
    responsiveLayout="scroll"
    dataKey="id"
    filterDisplay="menu"
    :loading="loading"
    :value="funds"
    :paginator="true"
    :rows="10"
    :rowsPerPageOptions="[10, 15, 20, 25]"
    :rowHover="true"
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
        <div class="p-mb-2 p-d-flex p-jc-between p-flex-column p-flex-sm-row">
          <div class="p-mr-2">
            <label class="p-mr-2" for="merchant">商戶</label>
            <Dropdown
              inputId="merchant"
              v-model="selectedMerchant"
              :options="merchant"
              placeholder="Select"
            />
          </div>
          <div class="p-mr-2">
            <label class="p-mr-2" for="channel">頻道</label>
            <Dropdown
              inputId="channel"
              v-model="selectedState"
              :options="states"
              optionLabel="name"
              placeholder="Select"
            />
          </div>
          <div class="p-mr-2">
            <label class="p-mr-2" for="status">狀態</label>
            <Dropdown
              inputId="status"
              v-model="selectedState"
              :options="states"
              optionLabel="name"
              placeholder="Select"
            />
          </div>
          <Button
            type="button"
            icon="pi pi-search"
            label="搜尋"
            class="p-button-outlined"
          />
        </div>
      </div>
      <div class="p-d-flex p-flex-column p-flex-sm-row">
        <div class="p-mt-2">D0總餘額: {{ total_balance_d0 }}</div>
        <div class="p-ml-4 p-mt-2">T1總餘額: {{ total_balance_t1 }}</div>
      </div>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="index" header="索引" :sortable="false">
      <template #body="{ index }">
        {{ index + 1 }}
      </template>
    </Column>
    <Column field="channel" header="通道名稱" :sortable="false">
      <template #body="{ data }">
        {{ data.channel }}
      </template>
    </Column>
    <Column field="merchant" header="商戶名稱" :sortable="false">
      <template #body="{ data }">
        {{ data.merchant }}
      </template> </Column
    ><Column field="balance_d0" header="D0餘額" :sortable="false">
      <template #body="{ data }">
        {{ data.balance_d0 }}
      </template> </Column
    ><Column field="balance_t1" header="T1餘額" :sortable="false">
      <template #body="{ data }">
        {{ data.balance_t1 }}
      </template> </Column
    ><Column field="lock_balance_t1" header="T1餘額凍結" :sortable="false">
      <template #body="{ data }">
        {{ data.lock_balance_t1 }}
      </template> </Column
    ><Column field="status" header="狀態" :sortable="false">
      <template #body="{ data }">
        <InputSwitch v-model="data.status" />
        {{ data.status }}
      </template></Column
    ><Column header="操作" :sortable="false">
      <template #body>
        <Button class="p-button-warning p-m-1" label="無費用充值" />
        <Button class="p-button-danger p-m-1" label="有費用充值" />
      </template>
    </Column>
  </DataTable>
</template>
<script>
import { defineComponent } from "vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default defineComponent({
  name: "FundsOperationPanel",
  data() {
    return {
      funds: [],
      loading: true,
      filters: {},
      total_balance_d0: "123456",
      total_balance_t1: "111111",
      //** mechant dropdown data example */
      selectedMerchant: null,
      merchant: ["ivan", "ivan", "ivan", "ivan", "ivan", "ivan", "ivan"],
      //** mechant dropdown data example */
    };
  },
  methods: {
    clearFilter() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        channel: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
  created() {
    this.clearFilter();
  },
  watch: {
    funds: {
      handler: function(newVal, oldVal) {
        console.log(newVal);
      },
      deep: true,
    },
  },
  mounted() {
    let fund = function() {
      this.index = "1";
      this.channel = "1";
      this.merchant = "g";
      this.balance_d0 = "adfa";
      this.lock_balance_d0 = "asdf";
      this.balance_t1 = "fd";
      this.lock_balance_t1 = "qfv w";
      this.status = false;
    };
    let funds = new Array(10);
    for (var i = 0; i < 10; i++) {
      funds[i] = new fund();
      if (i == 9) this.loading = false;
    }
    this.funds = funds;
    console.log(this.funds);
    // api
    // operationLogApi
    //   .get()
    //   .then(({ data }) => {
    //     this.records = data.map((record) => ({
    //       ...record,
    //       time: new Date(record.timestamp),
    //     }));
    //   })
    //   .finally(() => (this.loading = false));
  },
});
</script>
<style></style>
