<template>
  <h1>{{ $t("card_holder_management") }}</h1>
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
      <form @submit.prevent="fetch" class="p-d-flex p-ai-start p-jc-end">
        <Button class="p-mr-auto" :label="$t('form.create')" @click="create" />
      </form>
    </template>
    <template #empty> No log found. </template>
    <template #loading> Loading... </template>
    <Column field="name" :header="$t('card_holder')" />
    <Column field="status" :header="$t('status')">
      <template #body="{ data }">
        <InputSwitch
          :modelValue="Boolean(data.status)"
          @click="update_status(data, !data.status)"
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
    <Column field="phone" :header="$t('phone')" />
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
  </DataTable>
  <ConfirmDialog />
  <Dialog modal :header="modal_title" v-model:visible="modal.visible">
    <CardHolderModal :mode="modal.mode" :data="modal.data" @success="fetch" />
  </Dialog>
</template>

<script>
import { PrimeIcons } from "primevue/api";
import Holder from "../../api/Holder";
import CardHolderModal from "./CardHolderModal";
import ToastService from "../../service/ToastService";

export default {
  components: { CardHolderModal },
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
    };
  },
  computed: {
    modal_title() {
      return this.modal.mode === "edit"
        ? this.$i18n.t("edit_card_holder")
        : this.$i18n.t("create_card_holder");
    },
  },
  methods: {
    async fetch() {
      this.loading = true;
      const [records, count] = await Promise.all([
        Holder.find({ ...this.filters, page: this.page, limit: this.limit }),
        Holder.count(this.filters),
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
    edit(data) {
      this.modal.mode = "edit";
      this.modal.data = data;
      this.modal.visible = true;
    },
    create() {
      this.modal.mode = "create";
      this.modal.data = {};
      this.modal.visible = true;
    },
    remove(data) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: this.$i18n.t("delete_card_holder"),
        message: this.$i18n.t("card_holder_will_be_deleted"),
        accept: () => {
          Holder.delete(data.id).then(() => {
            ToastService.success({
              summary: this.$i18n.t("card_holder_successfully_deleted"),
            });
            this.fetch();
          });
        },
      });
    },
    update_status(data, status) {
      this.$confirm.require({
        icon: PrimeIcons.EXCLAMATION_TRIANGLE,
        header: status
          ? this.$i18n.t("enable_card_holder")
          : this.$i18n.t("disable_card_holder"),
        message: status
          ? `${this.$i18n.t("card_holder_will_be_enabled")}: ${data.name}`
          : `${this.$i18n.t("card_holder_will_be_disabled")}: ${data.name}`,
        accept: () => {
          Holder.update(data.id, { status: Number(status) }).then(() => {
            this.fetch();
            ToastService.success({
              summary: status
                ? this.$i18n.t("card_holder_successfully_enabled")
                : this.$i18n.t("card_holder_successfully_disabled"),
            });
          });
        },
      });
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style>
</style>