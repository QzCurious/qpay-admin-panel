<template>
  <DataTable
    responsiveLayout="scroll"
    dataKey="id"
    :loading="loading"
    :value="records"
    :paginator="true"
    :rows="10"
    :rowsPerPageOptions="[10, 15, 20, 25]"
    :rowHover="true"
  >
    <template #header>
      <form
        @submit.prevent="handle_search"
        class="p-d-flex p-flex-wrap p-ai-start"
      >
        <Dropdown label="商家" v-model="merchant" :options="merchant_list" />
        <Dropdown label="通道" v-model="channel" :options="channel_list" />
        <Calendar
          name="start"
          label="開始"
          v-model="start"
          :showSeconds="true"
          :showTime="true"
          :errors="v$.start.$errors.map((e) => e.$message)"
        />
        <Calendar
          name="end"
          label="結束"
          v-model="end"
          :showSeconds="true"
          :showTime="true"
          :errors="v$.end.$errors.map((e) => e.$message)"
        />
        <Button class="p-mt-4" type="submit">搜尋</Button>
        <Button class="p-mt-4" type="button" @click="export_csv">匯出</Button>
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="channel" header="通道"></Column>
    <Column field="merchant" header="商家"></Column>
    <Column field="deposit_amount" header="下單總額"></Column>
    <Column field="deposit_fee" header="手續費"></Column>
    <Column field="deposit_count" header="下單次數"></Column>
    <Column field="credit_amount" header="獲利淨額"></Column>
    <Column field="d0_balance" header="剩餘額度"></Column>
    <Column field="d0_lock_balance" header="出帳鎖定額"></Column>
  </DataTable>
</template>

<script>
import Dropdown from "../../components/Dropdown.vue";
import Calendar from "../../components/Calendar.vue";
import MerchantOrder from "../../api/MerchantOrder";
import useVuelidate from "@vuelidate/core";
import { date } from "../../helper/validator";
import { helpers } from "@vuelidate/validators";

export default {
  components: { Dropdown, Calendar },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    return {
      start: {
        valid_date: helpers.withMessage("It's not a valid date", date()),
      },
      end: { valid_date: helpers.withMessage("It's not a valid date", date()) },
    };
  },
  data() {
    return {
      loading: true,

      merchant: null,
      merchant_list: [],
      channel: null,
      channel_list: [],
      start: null,
      end: null,

      records: [],
    };
  },
  async mounted() {
    this.records = (await MerchantOrder.all()).data;
    this.loading = false;
  },
  methods: {
    export_csv() {

    },
    handle_search() {
      this.v$.$touch();
      if (this.v$.$error) {
        return;
      }
    },
  },
};
</script>

<style scoped>
form > :not(:last-child) {
  margin-right: 0.5rem;
}
</style>