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
    showGridlines
    class="p-datatable-sm"
  >
    <template #header>
      <form
        @submit.prevent="handle_search"
        class="p-d-flex p-flex-wrap p-ai-start"
      >
        <InputText
          label="交易代號"
          name="transation_number"
          v-model="transation_number"
        />
        <InputText name="order_number" label="訂單號" v-model="order_number" />
        <Dropdown
          label="訂單狀態"
          v-model="order_status"
          :options="order_status_list"
        />
        <InputText
          label="push_status"
          name="push_status"
          v-model="push_status"
        />
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
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="order_number" header="訂單號"></Column>
    <Column field="transation_number" header="交易代號"></Column>
    <Column field="channel" header="通道"></Column>
    <Column field="order_status" header="訂單狀態"></Column>
    <Column field="push_status" header="push_status"></Column>
    <Column field="merchant" header="商家"></Column>
    <Column>
      <template #body="{ data }">
        <Button label="post" @click="post(data)" />
        <Button label="stop-post" @click="stop_post(data)" />
      </template>
    </Column>
  </DataTable>
</template>

<script>
import InputText from "../../components/InputText.vue"
import Dropdown from "../../components/Dropdown.vue"
import Calendar from "../../components/Calendar.vue"
import MerchantOrder from "../../api/MerchantOrder"
import useVuelidate from "@vuelidate/core"
import { date } from "../../helper/validator"
import { helpers } from "@vuelidate/validators"

export default {
  components: { InputText, Dropdown, Calendar },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      start: {
        valid_date: helpers.withMessage("It's not a valid date", date()),
      },
      end: { valid_date: helpers.withMessage("It's not a valid date", date()) },
    }
  },
  data() {
    return {
      loading: true,

      transation_number: null,
      order_number: null,
      order_status: null,
      order_status_list: [{ label: "111", value: "111" }],
      push_status: null,
      merchant: null,
      merchant_list: [],
      channel: null,
      channel_list: [],
      start: null,
      end: null,

      records: [],
    }
  },
  async mounted() {
    this.records = (await MerchantOrder.all()).data
    this.loading = false
  },
  methods: {
    post() {},
    stop_post() {},
    handle_search() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
    },
  },
}
</script>

<style scoped>
form > :not(:last-child) {
  margin-right: 0.5rem;
}
</style>
