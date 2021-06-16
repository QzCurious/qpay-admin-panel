<template>
  <h1>{{ $t("funds_withdraw_audit") }}</h1>
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
    @page="on_page($event)"
  >
    <template #header>
      <form
        @submit.prevent="handle_search"
        class="header p-d-flex p-ai-center p-flex-wrap"
      >
        <InputText :label="$t('transaction_id')" v-model="filters.id" />
        <MerchantDropdown v-model="filters.merchant_id" />
        <ChannelDropdown v-model="filters.channel_id" />
        <Dropdown
          :label="$t('status')"
          :options="status_list"
          v-model="filters.status"
        />
        <CalendarStartTime
          v-model="filters.start_time"
          :errors="v$.filters.start_time.$errors.map((e) => e.$message)"
        />
        <CalendarEndTime
          v-model="filters.end_time"
          :errors="v$.filters.end_time.$errors.map((e) => e.$message)"
        />
        <Search />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="channel_name" :header="$t('channel')" />
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column field="id" :header="$t('transaction_id')" />
    <Column field="amount" :header="$t('withdraw_amount')" />
    <Column field="fee" :header="$t('withdraw_fee')" />
    <Column field="debit_amount" :header="$t('debit_amount')" />
    <Column field="status" :header="$t('status')">
      <template #body="{ data }">
        {{ status_list.find(({ value }) => value === data.status).label }}
      </template>
    </Column>
    <Column field="bank_name" :header="$t('to_bank')" />
    <Column field="branch" :header="$t('to_branch')" />
    <Column field="account_name" :header="$t('to_account_name')" />
    <Column field="account_number" :header="$t('to_account_number')" />
    <Column field="remark" :header="$t('remark')" />
    <Column :header="$t('operation')">
      <template #body="{ data }">
        <Button
          class="p-button-warning"
          :label="$t('funds_withdraw_status.processing')"
          @click="show_update_status_modal(data, PROCESSING)"
        />
        <Button
          class="p-button-success"
          :label="$t('funds_withdraw_status.paid')"
          @click="show_update_status_modal(data, PAID)"
        />
        <Button
          class="p-button-danger"
          :label="$t('funds_withdraw_status.reject')"
          @click="show_update_status_modal(data, REJECT)"
        />
      </template>
    </Column>
  </DataTable>
  <Dialog modal :header="modal.header" v-model:visible="modal.visible">
    <div class="modal-wrapper">
      <div class="p-mb-3">
        {{ modal.message }}
      </div>
      <form @submit.prevent="update_status" class="p-d-flex p-flex-column">
        <InputText
          required
          :placeholder="$t('enter_2fa_to_permit_action')"
          v-model="code"
        />
        <Button
          :loading="modal.submitting"
          type="submit"
          class="p-mt-2"
          :label="$t('form.submit')"
        />
      </form>
    </div>
  </Dialog>
</template>

<script>
import FundsWithdraw, {
  PENDING,
  PROCESSING,
  PAID,
  REJECT,
} from "../../api/FundsWithdraw";
import MerchantDropdown from "../../components/MerchantDropdown";
import ChannelDropdown from "../../components/ChannelDropdown";
import Dropdown from "../../components/Dropdown";
import Search from "../../components/Search.vue";
import InputText from "../../components/InputText.vue";
import { date } from "../../helper/validator";
import { helpers, minValue } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import ToastService from "../../service/ToastService";
import CalendarStartTime from "../../components/CalendarStartTime.vue";
import CalendarEndTime from "../../components/CalendarEndTime.vue";

export default {
  components: {
    ChannelDropdown,
    MerchantDropdown,
    Dropdown,
    Search,
    InputText,
    CalendarStartTime,
    CalendarEndTime,
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
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
    };
  },
  data() {
    return {
      PENDING: 0,
      PROCESSING: 1,
      PAID: 2,
      REJECT: 3,
      status_list: [
        {
          value: PENDING,
          label: this.$i18n.t("funds_withdraw_status.pending"),
        },
        {
          value: PROCESSING,
          label: this.$i18n.t("funds_withdraw_status.processing"),
        },
        { value: PAID, label: this.$i18n.t("funds_withdraw_status.paid") },
        { value: REJECT, label: this.$i18n.t("funds_withdraw_status.reject") },
      ],
      loading: true,
      page: 1,
      limit: 10,
      filters: {
        id: null,
        merchant_id: null,
        channel_id: null,
        status: null,
        transaction_id: null,
        start_time: this.moment().startOf("day").toDate(),
        end_time: this.moment().endOf("day").toDate(),
      },
      records: [],
      totalRecords: 0,
      modal: {
        visible: false,
        header: this.$i18n.t("status_will_be_updated"),
        message: null,
        data: {
          id: null,
          status: null,
        },
        submitting: false,
      },
      code: null,
    };
  },
  methods: {
    handle_search() {
      this.v$.$touch();

      if (this.v$.$error) {
        return;
      }

      this.fetch();
    },
    async fetch() {
      this.loading = true;
      const [records, count] = await Promise.all([
        FundsWithdraw.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        FundsWithdraw.count(this.filters),
      ]);
      this.records = records.data.data;
      this.totalRecords = count.data.count;
      window.scrollTo(0, 0);
      this.loading = false;
    },
    on_page(e) {
      this.page = e.page + 1;
      this.fetch();
    },
    show_update_status_modal(data, status) {
      this.modal.data.id = data.id;
      this.modal.data.status = status;

      if (status === PROCESSING) {
        this.modal.message = `${this.$i18n.t(
          "status_will_be_updated_to_processing"
        )}: ${data.id}`;
      } else if (status === PAID) {
        this.modal.message = `${this.$i18n.t(
          "status_will_be_updated_to_paid"
        )}: ${data.id}`;
      } else if (status === REJECT) {
        this.modal.message = `${this.$i18n.t(
          "status_will_be_updated_to_reject"
        )}: ${data.id}`;
      }
      this.modal.visible = true;
    },
    async update_status() {
      let success_message = null;
      if (this.modal.data.status === PROCESSING) {
        this.modal.header = this.$i18n.t(
          "status_will_be_updated_to_processing"
        );
        success_message = this.$i18n.t("status_successfully_set_to_processing");
      } else if (this.modal.data.status === PAID) {
        this.modal.header = this.$i18n.t("status_will_be_updated_to_paid");
        success_message = this.$i18n.t("status_successfully_set_to_paid");
      } else if (this.modal.data.status === REJECT) {
        this.modal.header = this.$i18n.t("status_will_be_updated_to_reject");
        success_message = this.$i18n.t("status_successfully_set_to_reject");
      }

      this.modal.submitting = true;
      FundsWithdraw.update(this.modal.data.id, {
        status: this.modal.data.status,
        code: this.code,
      })
        .then(() => ToastService.success({ summary: success_message }))
        .catch((err) => {
          if (err.response.status === 401 && err.response.data.code === 9003) {
            ToastService.error({ summary: this.$i18n.t("api.error.9003") });
            return;
          }
          throw err;
        })
        .finally(() => {
          this.modal.submitting = false;
        });
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style scoped>
.header > :not(:last-child) {
  margin-right: 0.5rem;
}

.modal-wrapper {
  width: min-content;
}
</style>