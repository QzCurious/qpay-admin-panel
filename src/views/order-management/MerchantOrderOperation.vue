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
          :label="$t('transaction_number')"
          name="transation_number"
          v-model="transation_number"
        />
        <InputText
          name="order_number"
          :label="$t('order_number')"
          v-model="order_number"
        />
        <InputText
          name="order_amount"
          :label="$t('order_amount')"
          v-model="order_amount"
        />
        <InputText
          name="order_over"
          :label="$t('order_over')"
          v-model="order_over"
        />
        <Dropdown
          :label="$t('order_status')"
          v-model="order_status"
          :options="order_status_list"
        />
        <Dropdown
          :label="$t('audit_type')"
          v-model="audit_type"
          :options="audit_status_list"
        />
        <Dropdown
          :label="$t('merchant')"
          v-model="merchant"
          :options="merchant_list"
        />
        <Dropdown
          :label="$t('channel')"
          v-model="channel"
          :options="channel_list"
        />
        <Calendar
          name="start"
          :label="$t('form.start_time')"
          v-model="start"
          :showSeconds="true"
          :showTime="true"
          :errors="v$.start.$errors.map((e) => e.$message)"
        />
        <Calendar
          name="end"
          :label="$t('form.end_time')"
          v-model="end"
          :showSeconds="true"
          :showTime="true"
          :errors="v$.end.$errors.map((e) => e.$message)"
        />
        <Button class="p-mt-4" type="submit">{{ $t("form.search") }}</Button>
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="order_number" :header="$t('order_number')"></Column>
    <Column
      field="transation_number"
      :header="$t('transaction_number')"
    ></Column>
    <Column field="order_amount" :header="$t('order_amount')"></Column>
    <Column field="real_amount" :header="$t('real_amount')"></Column>
    <Column field="fee" :header="$t('fee')"></Column>
    <Column field="credit_amount" :header="$t('credit_amount')"></Column>
    <Column field="order_status" :header="$t('order_status')"></Column>
    <Column field="channel" :header="$t('channel')"></Column>
    <Column field="remark" :header="$t('remark')"></Column>
    <Column field="audit_type" :header="$t('audit_type')"></Column>
    <Column field="merchant" :header="$t('merchant')"></Column>
    <Column field="order_time" :header="$t('order_time')">
      <template #body="{ data }">
        {{ moment(data.order_time).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </Column>
    <Column field="success_time" :header="$t('success_time')">
      <template #body="{ data }">
        {{ moment(data.order_time).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </Column>
    <Column :header="$t('operation')">
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
