<template>
  <h1>{{ $t("funds_operation_panel") }}</h1>
  <DataTable
    responsiveLayout="scroll"
    :lazy="true"
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
        class="header p-d-flex p-ai-center p-flex-wrap"
      >
        <MerchantDropdown v-model="filters.merchant_id" />
        <ChannelDropdown v-model="filters.channel_id" />
        <StatusDropdown v-model="filters.merchant_channel_status" />
        <Search />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="channel_name" :header="$t('channel')" />
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column :header="$t('balance_d0')">
      <template #body="{ data }">
        {{ data.amount_d0.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('lock_balance_d0')">
      <template #body="{ data }">
        {{ data.lock_amount_d0.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('balance_t1')">
      <template #body="{ data }">
        {{ data.amount_t1.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('lock_balance_t1')">
      <template #body="{ data }">
        {{ data.lock_amount_t1.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('status')">
      <template #body="{ data }">
        <template v-if="data.merchant_channel_status === 0">
          <Tag severity="danger" :value="$t('disabled')" />
        </template>
        <template v-else-if="data.merchant_channel_status === 1">
          <Tag severity="success" :value="$t('enabled')" />
        </template>
      </template>
    </Column>
  </DataTable>
</template>
<script>
import { defineComponent } from "vue";
import Funds from "../../api/Funds";
import MerchantDropdown from "../../components/MerchantDropdown";
import ChannelDropdown from "../../components/ChannelDropdown";
import Search from "../../components/Search";
import StatusDropdown from "../../components/StatusDropdown";

export default defineComponent({
  name: "FundsOperationPanel",
  components: {
    StatusDropdown,
    MerchantDropdown,
    ChannelDropdown,
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
        merchant_channel_status: null,
      },
      records: [],
      totalRecords: 0,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = true;
      const [records, count] = await Promise.all([
        Funds.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        Funds.count(this.filters),
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
  },
});
</script>

<style scoped>
.header > :not(:last-child) {
  margin-right: 0.5rem;
}
</style>