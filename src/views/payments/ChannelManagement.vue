<template>
  <h1>{{ $t("channel_management") }}</h1>
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
        @submit.prevent="fetch"
        class="header p-d-flex p-jc-end p-ai-start p-flex-wrap"
      >
        <Button class="p-mr-auto" :label="$t('form.create')" @click="create" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="name" :header="`${$t('channel')}`" />
    <Column field="status" :header="$t('status')">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.status)"
          @click="update_status(data, !data.status)"
        />
      </template>
    </Column>
    <Column :header="$t('operation')">
      <template #body="{ data }">
        <Button :label="$t('form.edit')" @click="edit(data)" />
        <Button
          class="p-button-danger"
          :label="$t('form.delete')"
          @click="remove(data)"
        />
      </template>
    </Column>
    <Column :header="$t('card')">
      <template #body="{ data }">
        <div class="p-d-flex p-flex-column">
          <Chip :key="bank_card_id" v-for="bank_card_id in data.bank_card_id">
            {{ bank_card_id }}
          </Chip>
        </div>
      </template>
    </Column>
  </DataTable>
  <ConfirmDialog />
  <Dialog modal :header="modal_title" v-model:visible="modal.visible">
    <ChannelModal :mode="modal.mode" :data="modal.data" @success="success" />
  </Dialog>
</template>

<script>
import { PrimeIcons } from "primevue/api"
import Channel from "../../api/Channel"
import ChannelModal from "./ChannelModal"
import ToastService from "../../service/ToastService"

export default {
  components: { ChannelModal },
  data() {
    return {
      loading: true,
      page: 1,
      limit: 10,
      filters: {},
      records: [],
      totalRecords: 0,
      modal: {
        visible: false,
        mode: null,
        data: {},
      },
    }
  },
  computed: {
    modal_title() {
      return this.modal.mode === "edit"
        ? this.$i18n.t("edit_channel")
        : this.$i18n.t("create_channel")
    },
  },
  methods: {
    async fetch() {
      this.loading = true
      const [records, count] = await Promise.all([
        Channel.find({ ...this.filters, page: this.page, limit: this.limit }),
        Channel.count(this.filters),
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
    edit(data) {
      this.modal.mode = "edit"
      this.modal.data = data
      this.modal.visible = true
    },
    create() {
      this.modal.mode = "create"
      this.modal.data = {}
      this.modal.visible = true
    },
    remove(data) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: this.$i18n.t("delete_channel"),
        message: this.$i18n.t("channel_will_be_deleted"),
        accept: async () => {
          await Channel.delete(data.id)
          ToastService.success({
            summary: this.$i18n.t("channel_successfully_deleted"),
          })
          this.fetch()
        },
      })
    },
    update_status(data, status) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: status
          ? this.$i18n.t("enable_channel")
          : this.$i18n.t("disable_channel"),
        message: status
          ? `${this.$i18n.t("channel_will_be_enabled")}: ${data.name}`
          : `${this.$i18n.t("channel_will_be_disabled")}: ${data.name}`,
        accept: async () => {
          await Channel.update(data.id, { status: Number(status) })
          this.fetch()
          ToastService.success({
            summary: status
              ? this.$i18n.t("channel_successfully_enabled")
              : this.$i18n.t("channel_successfully_disabled"),
          })
        },
      })
    },
    success() {
      this.fetch()
      this.modal.visible = false
    },
  },
  mounted() {
    this.fetch()
  },
}
</script>

<style></style>
