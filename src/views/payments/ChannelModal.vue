<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText
      float
      autofocus
      class="p-mb-3"
      v-model="channel"
      :label="$t('channel')"
      name="channel"
      :errors="v$.channel.$errors.map((e) => e.$message)"
    />
    <InputSwitch v-model="status" />

    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import Channel from "../../api/Channel"
import useVuelidate from "@vuelidate/core"
import { required, maxLength } from "@vuelidate/validators"
import InputText from "../../components/InputText"
import ToastService from "../../service/ToastService"

export default {
  components: { InputText },
  props: {
    mode: {
      type: String,
      validator: (value) => ["edit", "create"].includes(value),
      required: true,
    },
    data: Object,
  },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      channel: { required, maxLength: maxLength(16) },
    }
  },
  data() {
    return {
      channel: this.data?.name,
      status: this.data?.status ?? true,
    }
  },
  methods: {
    async handle_submit() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }

      const data = {
        name: this.channel,
        status: Number(this.status),
      }
      if (this.mode === "create") {
        await Channel.create(data)
        ToastService.success({
          summary: this.$i18n.t("channel_successfully_created"),
        })
        this.$emit("success", data)
      } else if (this.mode === "edit") {
        await Channel.update(this.data.id, data)
        ToastService.success({
          summary: this.$i18n.t("channel_successfully_updated"),
        })
        this.$emit("success", data)
      }

      this.v$.$reset()
    },
  },
}
</script>

<style></style>
