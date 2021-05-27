<template>
  <h1>{{ $t("card_operation_management") }}</h1>
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
      <form @submit.prevent="fetch" class="p-d-flex p-jc-end p-flex-wrap">
        <MerchantDropdown v-model="filters.merchant_id" />
        <BankDropdown v-model="filters.bank_id" />
        <StatusDropdown v-model="filters.status" />
        <InputText
          :label="$t('card_number')"
          v-model="filters.account_number"
        />
        <div class="p-d-flex p-ai-center">
          <label :for="auto_refresh" class="p-mr-2">{{
            $t("auto_refresh")
          }}</label>
          <InputSwitch id="auto_refresh" v-model="auto_refresh" />
        </div>
        <Search />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column field="bank_name" :header="$t('bank')" />
    <Column field="card_holder_name" :header="$t('card_holder')" />
    <Column field="account_number" :header="$t('card_number')" />
    <Column :header="$t('limit_deposit')">
      <template #body="{ data }">
        <div>
          <div>{{ $t("deposit_today") }}: {{ data.deposit_today }}</div>
          <div>{{ $t("credit_today") }}: {{ data.credit_today }}</div>
          <div>{{ $t("remaining_today") }}: {{ data.remain_today }}</div>
        </div>
      </template>
    </Column>
    <Column field="deposit_limit_daily" :header="$t('deposit_limit_daily')" />
    <Column field="deposit_limit_once" :header="$t('deposit_limit_once')" />
    <Column field="balance" :header="$t('balance')" />
    <Column field="online" :header="$t('online')">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.online)"
          @click="update_online(data, !data.online)"
        />
      </template>
    </Column>
    <Column field="status" :header="$t('status')">
      <template #body="{ data }">
        <template v-if="data.status === 0">
          <Tag severity="danger" :value="$t('disabled')" />
        </template>
        <template v-else-if="data.status === 1">
          <Tag severity="success" :value="$t('enabled')" />
        </template>
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog />
</template>

<script>
import { PrimeIcons } from "primevue/api";
import Card from "../../api/Card";
import ToastService from "../../service/ToastService";
import MerchantDropdown from "../../components/MerchantDropdown";
import BankDropdown from "../../components/BankDropdown";
import StatusDropdown from "../../components/StatusDropdown";
import InputText from "../../components/InputText";
import Search from "../../components/Search.vue";

export default {
  components: {
    MerchantDropdown,
    BankDropdown,
    StatusDropdown,
    InputText,
    Search,
  },
  data() {
    return {
      auto_refresh: false,
      auto_refresh_interval_id: null,
      loading: true,
      page: 1,
      limit: 10,
      filters: {
        merchant_id: null,
        bank_id: null,
        status: null,
        account_number: null,
      },
      records: [],
      totalRecords: 0,
    };
  },
  methods: {
    async fetch() {
      this.loading = true;
      try {
        const [records, count] = await Promise.all([
          Card.find({ ...this.filters, page: this.page, limit: this.limit }),
          Card.count(this.filters),
        ]);

        this.records = records.data.data;
        this.totalRecords = count.data.count;
        window.scrollTo(0, 0);
        this.loading = false;
      } catch (e) {
        if (e.response.status >= 500) {
          this.auto_refresh = false;
          return;
        }
      }
    },
    on_page(e) {
      this.page = e.page + 1;
      this.fetch();
    },
    remove(data) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: this.$i18n.t("delete_card"),
        message: this.$i18n.t("card_will_be_deleted"),
        accept: () => {
          Card.delete(data.id).then(() => {
            ToastService.success({
              summary: this.$i18n.t("card_successfully_deleted"),
            });
            this.fetch();
          });
        },
      });
    },
    update_online(data, status) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: status
          ? this.$i18n.t("online_card")
          : this.$i18n.t("offline_card"),
        message: status
          ? `${this.$i18n.t("card_will_be_online")}: ${data.account_number}`
          : `${this.$i18n.t("card_will_be_offline")}: ${data.account_number}`,
        accept: () => {
          Card.update(data.id, { online: Number(status) }).then(() => {
            this.fetch();
            ToastService.success({
              summary: status
                ? this.$i18n.t("card_successfully_online")
                : this.$i18n.t("card_successfully_offline"),
            });
          });
        },
      });
    },
  },
  mounted() {
    this.auto_refresh = true;
    this.fetch();
  },
  watch: {
    auto_refresh(new_auto_refresh) {
      if (new_auto_refresh) {
        this.auto_refresh_interval_id = setInterval(this.fetch, 5000);
      } else {
        clearInterval(this.auto_refresh_interval_id);
        this.auto_refresh_interval_id = null;
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