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
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <!-- <Column field="index" header="索引" :sortable="false">
      <template #body="{ index }">
        {{ index + 1 }}
      </template>
    </Column> -->
    <Column field="merchant" header="商戶名稱" :sortable="false">
      <template #body="{ data }">
        {{ data.merchant }}
      </template>
    </Column>
    <Column field="channel" header="通道名稱" :sortable="false">
      <template #body="{ data }">
        {{ data.channel }}
      </template>
    </Column>
    <Column
      field="deposit_fee_rate"
      header="deposit_fee_rate"
      :sortable="false"
    >
      <template #body="{ data }">
        {{ data.deposit_fee_rate }}
      </template>
    </Column>
    <Column
      field="recharge_limit_daily"
      header="recharge_limit_daily"
      :sortable="false"
    >
      <template #body="{ data }">
        {{ data.recharge_limit_daily }}
      </template>
    </Column>
    <Column
      field="deposit_limit_daily"
      header="deposit_limit_daily"
      :sortable="false"
    >
      <template #body="{ data }">
        {{ data.deposit_limit_daily }}
      </template>
    </Column>
    <Column
      field="manual_depist_limit"
      header="manual_depist_limit"
      :sortable="false"
    >
      <template #body="{ data }">
        {{ data.manual_depist_limit }}
      </template>
    </Column>
    <Column field="status" header="狀態" :sortable="false">
      <template #body="{ data }">
        {{ data.status ? "enabled" : "locked" }}
      </template>
    </Column>
    <Column field="order_limit" header="order_limit" :sortable="false">
      <template #body="{ data }">
        {{ data.order_limit }}
      </template>
    </Column>
    <Column header="操作" :sortable="false">
      <template #body="{data}">
        <Button
          class="p-button-primary p-m-1"
          label="編輯"
          @click="edit(data)"
        />
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog></ConfirmDialog>
  <Dialog></Dialog>
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
      selectedMerchant: null,
      merchant: ["ivan", "ivan", "ivan", "ivan", "ivan", "ivan", "ivan"],
    };
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
      this.channel = "1";
      this.merchant = "g8g8g8g8";
      this.recharge_limit_daily = "180000000";
      this.manual_depist_limit = "100";
      this.order_limit = "3";
      this.status = false;
      this.order_per_minute = "30";
      this.order_limit_daily = "30000000";
    };
    let funds = new Array(10);
    for (var i = 0; i < 10; i++) {
      funds[i] = new fund();
      if (i == 9) this.loading = false;
    }
    this.funds = funds;
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
  created() {
    this.clearFilter();
  },
  methods: {
    clearFilter() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        channel: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    edit(item) {
      console.log(item);
      this.$confirm.require({});
    },
  },
});
</script>
<style></style>
