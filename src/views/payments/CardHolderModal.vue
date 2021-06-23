<template>
  <form @submit.prevent="handle_submit" class="p-fluid p-d-flex p-flex-column">
    <InputText
      float
      autofocus
      v-model="name"
      :label="$t('card_holder')"
      name="name"
      :errors="v$.name.$errors.map((e) => e.$message)"
    />
    <InputText
      float
      v-model="phone"
      :label="$t('phone')"
      name="phone"
      :errors="v$.phone.$errors.map((e) => e.$message)"
    />
    <div class="p-d-flex p-ai-center p-mt-3">
      <InputSwitch v-model="status" />
      <span class="p-ml-2">狀態</span>
    </div>
    <Button class="p-mt-3" :label="$t('form.submit')" type="submit" />
  </form>
  <Toast position="top-right" />
</template>

<script>
import Holder from "../../api/Holder"
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
      name: { required, maxLength: maxLength(16) },
      phone: { maxLength: maxLength(20) },
    }
  },
  data() {
    return {
      name: this.data?.name,
      phone: this.data?.phone,
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
        name: this.name,
        phone: this.phone,
        status: Number(this.status),
      }
      if (this.mode === "create") {
        await Holder.create(data)
        ToastService.success({
          summary: this.$i18n.t("card_holder_successfully_created"),
        })
        this.$emit("success", data)
      } else if (this.mode === "edit") {
        await Holder.update(this.data.id, data)
        ToastService.success({
          summary: this.$i18n.t("card_holder_successfully_updated"),
        })
        this.$emit("success", data)
      }

      this.v$.$reset()
    },
  },
}
</script>

<style></style>
