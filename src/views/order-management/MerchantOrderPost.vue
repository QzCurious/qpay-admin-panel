<template>
  <h1>{{ $t("merchant_order_post") }}</h1>
  <DataTable
    responsiveLayout="scroll"
    :lazy="true"
    :loading="loading"
    :value="records"
    :paginator="true"
    :totalRecords="totalRecords"
    v-model:rows="limit"
    :rowsPerPageOptions="[10, 15, 20, 25]"
    :rowHover="true"
    showGridlines
    class="p-datatable-sm"
    @page="on_page($event)"
  >
    <template #header>
      <form
        @submit.prevent="handle_search"
        class="header p-d-flex p-jc-end p-flex-wrap p-ai-start"
      >
        <InputText
          name="order_number"
          :label="$t('order_number')"
          v-model="filters.merchant_order_id"
        />
        <InputText
          :label="$t('transaction_number')"
          name="transaction_number"
          v-model="filters.deposit_id"
        />
        <Dropdown
          :label="$t('order_status')"
          v-model="filters.order_status"
          :options="order_status_list"
        />
        <!-- <InputText
          label="push_status"
          name="push_status"
          v-model="filters.push_status"
        /> -->
        <MerchantDropdown v-model="filters.merchant_id" />
        <ChannelDropdown v-model="filters.channel_id" />
        <div class="p-d-flex">
          <CalendarStartTime
            class="p-mr-2"
            v-model="filters.start_time"
            :errors="v$.filters.start_time.$errors.map((e) => e.$message)"
          />
          <CalendarEndTime
            v-model="filters.end_time"
            :errors="v$.filters.end_time.$errors.map((e) => e.$message)"
          />
        </div>
        <Search />
        <Clear @click="clear" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="id" :header="$t('order_number')"></Column>
    <Column
      field="deposit_transaction_id"
      :header="$t('transaction_id')"
    ></Column>
    <Column field="channel_name" :header="$t('channel')"></Column>
    <Column field="order_status" :header="$t('order_status')">
      <template #body="{ data }">
        {{
          order_status_list.find(({ value }) => value === data.order_status)
            .label
        }}
      </template>
    </Column>
    <!-- <Column field="push_status" header="push_status"></Column> -->
    <Column field="merchant_name" :header="$t('merchant')"></Column>
    <Column>
      <template #body="{ data }">
        <Button
          class="p-button-sm p-mr-1"
          :label="$t('post')"
          @click="post(data)"
        />
        <Button
          class="p-button-sm"
          :label="$t('stop_post')"
          @click="stop_post(data)"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog modal :header="modal.header" v-model:visible="modal.visible">
    <div class="modal-wrapper">
      <Form2FA :data="modal.data" @success="handle_modal" />
    </div>
  </Dialog>
</template>

<script>
import InputText from "../../components/InputText.vue"
import Dropdown from "../../components/Dropdown.vue"
import MerchantOrder, {
  ORDER_STATUS,
  AUDIT_TYPE,
} from "../../api/MerchantOrder"
import useVuelidate from "@vuelidate/core"
import { date } from "../../helper/validator"
import { helpers, minValue } from "@vuelidate/validators"
import { required, numeric } from "@vuelidate/validators"
import MerchantDropdown from "../../components/MerchantDropdown"
import ChannelDropdown from "../../components/ChannelDropdown"
import Search from "../../components/Search"
import CalendarStartTime from "../../components/CalendarStartTime.vue"
import CalendarEndTime from "../../components/CalendarEndTime.vue"
import Clear from "../../components/Clear"
import Form2FA from "./Form2FA.vue"

export default {
  components: {
    InputText,
    Dropdown,
    MerchantDropdown,
    ChannelDropdown,
    Search,
    CalendarStartTime,
    CalendarEndTime,
    Clear,
    Form2FA,
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      filters: {
        start_time: {
          valid_date: helpers.withMessage(
            this.$i18n.t("invalid_date_format"),
            date()
          ),
        },
        end_time: {
          valid_date: helpers.withMessage(
            this.$i18n.t("invalid_date_format"),
            date()
          ),
          minValue: helpers.withMessage(
            this.$i18n.t("end_time_should_not_be_older_then_start_time"),
            minValue(this.filters.start_time)
          ),
        },
      },
    }
  },
  data() {
    return {
      loading: true,
      page: 1,
      limit: 10,
      filters: {
        deposit_id: null,
        merchant_order_id: null,
        order_status: null,
        push_status: null,
        merchant_id: null,
        channel_id: null,
        start_time: this.moment()
          .startOf("day")
          .toDate(),
        end_time: this.moment()
          .endOf("day")
          .toDate(),
      },
      records: [],
      totalRecords: 0,
      modal: {
        visible: false,
        header: null,
        data: {
          id: null,
          post_status: null,
          code: null,
        },
      },
    }
  },
  computed: {
    order_status_list() {
      return Object.entries(ORDER_STATUS).map(([key, value]) => {
        return {
          label: this.$i18n.t(`order_status_values.${key}`),
          value,
        }
      })
    },
  },
  methods: {
    post(data) {
      console.log("post", data)
      this.modal.data.id = data.id
      this.modal.data.post_status = 1
      this.modal.data.code = null
      this.modal.visible = true
      this.modal.header = this.$t("post")
      // MerchantOrder.update(data.id, { post_status: 1 })
    },
    stop_post(data) {
      console.log("stop", data)
      this.modal.data.id = data.id
      this.modal.data.post_status = 3
      this.modal.data.code = null
      this.modal.visible = true
      this.modal.header = this.$t("stop_post")
      // MerchantOrder.update(data.id, { post_status: 3 })
    },
    handle_search() {
      this.v$.$touch()

      if (this.v$.$error) {
        return
      }

      this.fetch()
    },
    async fetch() {
      this.loading = true
      const [records, count] = await Promise.all([
        MerchantOrder.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        MerchantOrder.count(this.filters),
      ])
      this.records = records.data.data
      this.totalRecords = count.data.count
      window.scrollTo(0, 0)
      this.loading = false
    },
    on_page(e) {
      this.page = e.page + 1
      this.fetch()
    },
    async handle_modal(data) {
      await MerchantOrder.update(data.id, {
        post_status: this.modal.data.post_status,
        code: data.code,
      })
      this.modal.visible = false
    },
    clear() {
      Object.keys(this.filters).forEach((x) => {
        this.filters[x] = null
      })
      this.filters.start_time = this.moment()
        .startOf("day")
        .toDate()
      this.filters.end_time = this.moment()
        .endOf("day")
        .toDate()
    },
  },
  mounted() {
    this.fetch()
  },
}
</script>

<style scoped>
.header > :not(:last-child) {
  margin: 0 0.5rem 0.5rem 0;
}

.summary {
  display: flex;
  justify-content: flex-end;
  color: var(--blue-500);
}

.summary > * + *::before {
  margin: 0 0.5rem;
  content: "|";
}
</style>
