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
        <InputText
          label="交易代號"
          name="transation_number"
          v-model="transation_number"
        />
        <InputText name="order_number" label="訂單號" v-model="order_number" />
        <InputText name="order_amount" label="金額" v-model="order_amount" />
        <InputText name="order_over" label="order_over" v-model="order_over" />
        <Dropdown
          label="訂單狀態"
          v-model="order_status"
          :options="order_status_list"
        />
        <Dropdown
          label="審核狀態"
          v-model="audit_type"
          :options="audit_status_list"
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
    <Column field="order_amount" header="金額"></Column>
    <Column field="real_amount" header="實際金額"></Column>
    <Column field="fee" header="手續費"></Column>
    <Column field="credit_amount" header="credit_amount"></Column>
    <Column field="order_status" header="訂單狀態"></Column>
    <Column field="channel" header="通道"></Column>
    <Column field="remark" header="備註"></Column>
    <Column field="audit_type" header="審核狀態"></Column>
    <Column field="merchant" header="商家"></Column>
    <Column field="order_time" header="下單時間">
      <template #body="{ data }">
        {{ moment(data.order_time).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </Column>
    <Column field="success_time" header="入帳時間">
      <template #body="{ data }">
        {{ moment(data.order_time).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </Column>
    <Column header="操作">
      <template #body="{ data }">
        <Button class="p-button-success" @click="success(data)">success</Button>
        <Button class="p-button-danger" @click="fail(data)">fail</Button>
        <Button class="p-button-info" @click="processing(data)"
          >processing</Button
        >
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
import moment from "moment"

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
      order_amount: null,
      order_over: null,
      order_status: null,
      order_status_list: [{ label: "d", value: "adsf" }],
      audit_type: null,
      audit_status_list: [{ label: "d", value: "adsf" }],
      merchant: null,
      merchant_list: [],
      channel: null,
      channel_list: [],
      start: null,
      end: null,

      records: [],
    }
  },
  created() {
    this.moment = moment
  },
  async mounted() {
    this.records = (await MerchantOrder.all()).data
    this.loading = false
  },
  methods: {
    handle_search() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }
    },
    success(data) {},
    fail(data) {},
    processing(data) {},
  },
}
</script>

<style scoped>
form > :not(:last-child) {
  margin-right: 0.5rem;
}
</style>
