<template>
  <h1>{{ $t("merchant_channel_rate") }}</h1>
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
        @submit.prevent="fetch"
        class="p-d-flex p-ai-center p-jc-end p-flex-wrap"
      >
        <MerchantDropdown v-model="filters.merchant_id" />
        <ChannelDropdown v-model="filters.channel_id" />
        <StatusDropdown v-model="filters.status" />
        <Search />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column field="channel_name" :header="$t('channel')" />
    <Column :header="$t('deposit_fee_rate')">
      <template #body="{ data }">{{
        data.deposit_fee_rate && numeral(data.deposit_fee_rate).format("0%")
      }}</template>
    </Column>
    <Column field="deposit_fee" :header="$t('deposit_fee')" />
    <Column field="deposit_limit_daily" :header="$t('deposit_limit_daily')" />
    <Column :header="$t('withdraw_fee_rate')">
      <template #body="{ data }">{{
        data.withdraw_fee_rate && numeral(data.withdraw_fee_rate).format("0%")
      }}</template>
    </Column>
    <Column field="withdraw_fee" :header="$t('withdraw_fee')" />
    <Column field="withdraw_limit_daily" :header="$t('withdraw_limit_daily')" />
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
    <Column :header="$t('operation')">
      <template #body="{ data }">
        <Button :label="$t('form.edit')" @click="edit(data)" />
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog />
  <Dialog
    modal
    :header="$t('edit_merchant_channel')"
    v-model:visible="edit_modal.visible"
  >
    <EditMerchantChannel :data="edit_modal.data" @success="success" />
  </Dialog>
</template>

<script>
import MerchantChannel from "../../api/MerchantChannel";
import MerchantDropdown from "../../components/MerchantDropdown";
import ChannelDropdown from "../../components/ChannelDropdown";
import StatusDropdown from "../../components/StatusDropdown";
import Search from "../../components/Search.vue";
import EditMerchantChannel from "./EditMerchantChannel";
import { falsy_to_null } from "../../helper/transform";

export default {
  components: {
    EditMerchantChannel,
    ChannelDropdown,
    MerchantDropdown,
    StatusDropdown,
    Search,
  },
  data() {
    return {
      loading: true,
      page: 1,
      limit: 10,
      filters: {
        merchant_id: null,
        channel_id: null,
        status: null,
      },
      records: [],
      totalRecords: 0,
      edit_modal: {
        visible: false,
        data: null,
      },
    };
  },
  methods: {
    async fetch() {
      this.loading = true;
      const [records, count] = await Promise.all([
        MerchantChannel.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        MerchantChannel.count(this.filters),
      ]);
      this.records = records.data.data.map((data) => ({
        ...data,
        deposit_fee_rate: falsy_to_null(data.deposit_fee_rate),
        deposit_fee: falsy_to_null(this.data?.deposit_fee),
        withdraw_fee_rate: falsy_to_null(this.data?.withdraw_fee_rate),
        withdraw_fee: falsy_to_null(this.data?.withdraw_fee),
      }));
      this.totalRecords = count.data.count;
      window.scrollTo(0, 0);
      this.loading = false;
    },
    on_page(e) {
      this.page = e.page + 1;
      this.fetch();
    },
    edit(data) {
      this.edit_modal.data = data;
      this.edit_modal.visible = true;
    },
    success() {
      this.fetch();
      this.edit_modal.visible = false;
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style scoped>
form > :not(:last-child) {
  margin-right: 0.5rem;
}
</style>