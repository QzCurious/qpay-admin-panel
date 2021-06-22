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
      <div class="summary p-mt-2">
        <span>{{ $t("total_balance_d0") }}: {{ summary.amount_d0 }}</span>
        <span>{{ $t("total_balance_t1") }}: {{ summary.amount_t1 }}</span>
      </div>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="channel_name" :header="$t('channel')" />
    <Column field="merchant_name" :header="$t('merchant')" />
    <Column :header="$t('balance_d0')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.amount_d0.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('lock_balance_d0')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.lock_amount_d0.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('balance_t1')" bodyClass="p-text-right">
      <template #body="{ data }">
        {{ data.amount_t1.toLocaleString("en-US") }}
      </template>
    </Column>
    <Column :header="$t('lock_balance_t1')" bodyClass="p-text-right">
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
    <Column>
      <template #body="{ data }">
        <div style="width: min-content">
          <Button
            class="p-d-flex p-text-nowrap"
            :label="$t('deposit_with_fee')"
            @click="show_modal(DEPOSIT_WITH_FEE, data)"
          />
          <Button
            class="p-mt-1 p-d-flex p-text-nowrap"
            :label="$t('deposit_without_fee')"
            @click="show_modal(DEPOSIT_NO_FEE, data)"
          />
        </div>
      </template>
    </Column>
    <Column>
      <template #body="{ data }">
        <div style="width: min-content">
          <Button
            class="p-d-flex p-text-nowrap"
            :label="$t('withdraw_with_fee')"
            @click="show_modal(WITHDRAW_WITH_FEE, data)"
          />
          <Button
            class="p-mt-1 p-d-flex p-text-nowrap"
            :label="$t('withdraw_without_fee')"
            @click="show_modal(WITHDRAW_NO_FEE, data)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <Dialog modal :header="modal.header" v-model:visible="modal.visible">
    <div class="modal-wrapper">
      <form @submit.prevent="make_transaction" class="p-d-flex p-flex-column">
        <InputText
          float
          autofocus
          :label="$t('amount')"
          v-model="modal.amount"
          :errors="v$.modal.amount.$errors.map((e) => e.$message)"
        />
        <InputText
          class="p-mt-5"
          :placeholder="$t('enter_2fa_to_permit_action')"
          v-model="modal.code"
          :errors="v$.modal.code.$errors.map((e) => e.$message)"
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
import { defineComponent } from "vue"
import Funds, {
  DEPOSIT_WITH_FEE,
  DEPOSIT_NO_FEE,
  WITHDRAW_WITH_FEE,
  WITHDRAW_NO_FEE,
} from "../../api/Funds"
import MerchantDropdown from "../../components/MerchantDropdown"
import ChannelDropdown from "../../components/ChannelDropdown"
import Search from "../../components/Search"
import StatusDropdown from "../../components/StatusDropdown"
import InputText from "../../components/InputText"
import { required, numeric } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import ToastService from "../../service/ToastService"

export default defineComponent({
  name: "FundsOperationPanel",
  components: {
    StatusDropdown,
    MerchantDropdown,
    ChannelDropdown,
    Search,
    InputText,
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      modal: {
        amount: { required, numeric },
        code: { required },
      },
    }
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
      summary: {},
      modal: {
        visible: false,
        header: null,
        message: null,
        data: {},
        submitting: false,
        operation_type: null,
        amount: null,
        code: null,
      },
      success_message: null,
    }
  },
  computed: {
    DEPOSIT_WITH_FEE: () => DEPOSIT_WITH_FEE,
    DEPOSIT_NO_FEE: () => DEPOSIT_NO_FEE,
    WITHDRAW_WITH_FEE: () => WITHDRAW_WITH_FEE,
    WITHDRAW_NO_FEE: () => WITHDRAW_NO_FEE,
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      const [records, count] = await Promise.all([
        Funds.find({
          ...this.filters,
          page: this.page,
          limit: this.limit,
        }),
        Funds.count(this.filters),
      ])
      this.records = records.data.data
      this.totalRecords = count.data.count
      this.summary = count.data
      window.scrollTo(0, 0)
      this.loading = false
    },
    on_page(e) {
      this.page = e.page + 1
      this.fetch()
    },
    show_modal(operation_type, data) {
      this.v$.$reset()
      this.modal.operation_type = operation_type
      this.modal.data = data
      this.modal.amount = null
      this.modal.code = null

      switch (operation_type) {
        case DEPOSIT_WITH_FEE:
          this.modal.header = this.$i18n.t("deposit_with_fee")
          this.success_message = this.$i18n.t("deposit_with_fee_successfully")
          break
        case DEPOSIT_NO_FEE:
          this.modal.header = this.$i18n.t("deposit_without_fee")
          this.success_message = this.$i18n.t(
            "deposit_without_fee_successfully"
          )
          break
        case WITHDRAW_WITH_FEE:
          this.modal.header = this.$i18n.t("withdraw_with_fee")
          this.success_message = this.$i18n.t("withdraw_with_fee_successfully")
          break
        case WITHDRAW_NO_FEE:
          this.modal.header = this.$i18n.t("withdraw_without_fee")
          this.success_message = this.$i18n.t(
            "withdraw_without_fee_successfully"
          )
          break
      }

      this.modal.visible = true
    },
    make_transaction() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }

      this.modal.submitting = true
      Funds.make_transaction(this.modal.data.merchant_channel_id, {
        operation_type: Number(this.modal.operation_type),
        amount: Number(this.modal.amount),
        code: this.modal.code,
      })
        .then(() => {
          ToastService.success({ summary: this.$i18n.t(this.success_message) })
          this.fetch()
        })
        .finally(() => {
          this.modal.submitting = false
        })
    },
  },
})
</script>

<style scoped>
.header > :not(:last-child) {
  margin-right: 0.5rem;
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
