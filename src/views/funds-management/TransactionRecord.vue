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
  >
    <template #header>
      <div class="p-d-flex p-flex-column p-flex-sm-row">
        <div class="p-m-2">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            class="p-button-outlined "
            @click="clearFilter"
          />
        </div>
        <div class="p-m-2">
          <label class="p-mr-3" for="channel">交易編號</label>
          <Dropdown
            inputId="transaction"
            v-model="selectedRecords"
            :options="states"
            optionLabel="name"
            placeholder="Select"
          />
        </div>
        <div class="p-m-2">
          <label class="p-mr-2 p-ml-2" for="merchant">商戶</label>
          <Dropdown
            inputId="merchant"
            v-model="selectedMerchant"
            :options="merchant"
            placeholder="Select"
          />
        </div>
        <div class="p-m-2">
          <label class="p-mr-2 p-ml-2" for="channel">頻道</label>
          <Dropdown
            inputId="channel"
            v-model="selectedState"
            :options="states"
            optionLabel="name"
            placeholder="Select"
          />
        </div>
        <div class="p-m-2">
          <label class="p-mr-2 p-ml-2" for="status">日期</label>
          <Calendar
            v-model="date"
            :showTime="true"
            :hourFormat="'12'"
            selectionMode="range"
          />
        </div>

        <Button
          type="button"
          icon="pi pi-search"
          label="搜尋"
          class="p-button-outlined p-mb-2 p-m-2"
        />
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
    ><Column field="transaction" header="交易單號" :sortable="false">
      <template #body="{ data }">
        {{ data.transaction }}
      </template> </Column
    ><Column field="operation_balance" header="發生金額" :sortable="false">
      <template #body="{ data }">
        {{ data.operation_balance }}
      </template> </Column
    ><Column field="before_balance" header="期初餘額" :sortable="false">
      <template #body="{ data }">
        {{ data.before_balance }}
      </template> </Column
    ><Column field="after_balance" header="期末餘額" :sortable="false">
      <template #body="{ data }">
        {{ data.after_balance }}
      </template>
    </Column>
    <Column field="create_time" header="創建時間" :sortable="false">
      <template #body="{ data }">
        {{ data.create_time }}
      </template>
    </Column>
    <Column field="remark" header="備註" :sortable="false">
      <template #body="{ data }">
        {{ data.remark }}
      </template>
    </Column>
    <Column>
      <Button label="Primary" />
      <Button label="Primary" />
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
      records: [],
      loading: true,
      filters: {},
      merchant: ["ivan", "ivan", "ivan", "ivan", "ivan", "ivan", "ivan"],
      states: "",
      date: "",
      selectedRecords: "",
      selectedMerchant: "",
      selectedState: "",
    };
  },
  watch: {
    date: {
      handler: function(newVal, oldVal) {
        console.log(newVal[0], "---new0---");
        console.log(newVal[1], "---new1---");
        console.log(Object.keys(newVal), "---new---");
      },
      deep: true,
    },
  },
  methods: {
    clearFilter() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        channel: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    formatDate(date) {
      return date.toLocaleDateString("zh-TW", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    editStatus() {},
  },
  created() {
    this.clearFilter();
  },
  mounted() {
    let record = function() {
      this.index = "1";
      this.channel = "1";
      this.merchant = "g";
      this.transaction = "adfa";
      this.operation_balance = "asdf";
      this.before_balance = "fd";
      this.after_balance = "qfv w";
      this.create_time = "someday";
      this.remark = "nonono";
    };
    let records = new Array(10);
    for (var i = 0; i < 10; i++) {
      records[i] = new record();
      if (i == 9) this.loading = false;
    }
    this.records = records;
    //ajax api
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
<style lang=""></style>
