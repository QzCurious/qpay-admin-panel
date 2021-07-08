<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <ChannelDropdown
      float
      v-model="channel_id"
      :filter="(item) => item.status !== 0"
      :errors="v$.channel_id.$errors.map((e) => e.$message)"
    />
    <HolderDropdown
      float
      v-model="card_holder_id"
      :filter="(item) => item.status !== 0"
      :errors="v$.card_holder_id.$errors.map((e) => e.$message)"
    />
    <BankDropdown
      float
      v-model="bank_id"
      :filter="(item) => item.status !== 0"
      :errors="v$.bank_id.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="branch"
      :label="$t('bank_branch')"
      name="branch"
      :errors="v$.branch.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="account_number"
      :label="$t('card_number')"
      name="account_number"
      :errors="v$.account_number.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="ibanking_id"
      :label="$t('internet_banking_id')"
      name="ibanking_id"
      :errors="v$.ibanking_id.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="ibanking_password"
      :label="$t('internet_banking_password')"
      name="ibanking_password"
      :errors="v$.ibanking_password.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="pb_api_key"
      :label="$t('pb_api_key')"
      name="pb_api_key"
      :errors="v$.pb_api_key.$errors.map((e) => e.$message)"
    />
    <Dropdown
      float
      :label="$t('plugin_mode')"
      v-model="plugin_mode"
      optionLabel="name"
      optionValue="id"
      :options="plugin_mode_options"
    />
    <div class="p-d-flex p-ai-center p-mt-3">
      <InputSwitch v-model="status" />
      <span class="p-ml-2">{{ $t("status") }}</span>
    </div>
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import Card from "../../api/Card"
import useVuelidate from "@vuelidate/core"
import { required, maxLength, numeric } from "@vuelidate/validators"
import InputText from "../../components/InputText"
import HolderDropdown from "../../components/HolderDropdown"
import ChannelDropdown from "../../components/ChannelDropdown"
import ToastService from "../../service/ToastService"
import Dropdown from "../../components/Dropdown.vue"
import BankDropdown from "../../components/BankDropdown.vue"

export default {
  components: {
    InputText,
    HolderDropdown,
    ChannelDropdown,
    Dropdown,
    BankDropdown,
  },
  props: {
    mode: {
      type: String,
      validator: (value) => ["edit", "create"].includes(value),
      required: true,
    },
    data: Object,
  },
  emits: ["success"],
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      channel_id: { required },
      card_holder_id: { required },
      bank_id: { required },
      branch: { maxLength: maxLength(20) },
      account_number: { required, numeric, maxLength: maxLength(20) },
      ibanking_id: { maxLength: maxLength(45) },
      ibanking_password: { maxLength: maxLength(45) },
      pb_api_key: { maxLength: maxLength(100) },
      plugin_mode: {},
      status: { required },
    }
  },
  data() {
    return {
      channel_id: undefined,
      card_holder_id: undefined,
      bank_id: undefined,
      branch: undefined,
      account_number: undefined,
      ibanking_id: undefined,
      ibanking_password: undefined,
      pb_api_key: undefined,
      plugin_mode: undefined,
      status: true,

      plugin_mode_options: [
        { id: 1, name: "push bullet SMS" },
        { id: 2, name: "ibanking Back-office spider" },
      ],
    }
  },
  methods: {
    async handle_submit() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }

      const data = {
        channel_id: this.channel_id,
        card_holder_id: this.card_holder_id,
        bank_id: this.bank_id,
        branch: this.branch,
        account_number: this.account_number,
        ibanking_id: this.ibanking_id,
        ibanking_password: this.ibanking_password,
        pb_api_key: this.pb_api_key,
        plugin_mode: this.plugin_mode,
        status: Number(this.status),
      }
      if (this.mode === "create") {
        await Card.create(data)
        ToastService.success({
          summary: this.$i18n.t("card_successfully_created"),
        })
        this.$emit("success", data)
      } else if (this.mode === "edit") {
        await Card.update(this.data.id, data)
        ToastService.success({
          summary: this.$i18n.t("card_successfully_updated"),
        })
        this.$emit("success", data)
      }

      this.v$.$reset()
    },
  },
  async mounted() {
    if (this.mode === "edit") {
      const { data } = await Card.get(this.data.id)
      this.channel_id = data.channel_id
      this.card_holder_id = data.card_holder_id
      this.bank_id = data.bank_id
      this.branch = data.branch
      this.account_number = data.account_number
      this.ibanking_id = data.ibanking_id
      this.ibanking_password = data.ibanking_password
      this.pb_api_key = data.pb_api_key
      this.plugin_mode = data.plugin_mode
      this.status = Boolean(data.status)
    }
  },
}
</script>

<style scoped>
form {
  min-width: 20rem;
}
</style>
