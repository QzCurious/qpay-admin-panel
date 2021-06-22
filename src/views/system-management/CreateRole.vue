<template>
  <div
    class="p-d-flex p-flex-column"
    :style="{ width: '100%', maxWidth: '22rem' }"
  >
    <form ref="form" @submit.prevent="handle_submit">
      <div class="p-field">
        <span class="p-float-label">
          <InputText
            id="name"
            :class="{ 'p-invalid': v$.name.$error }"
            v-model="name"
          />
          <label for="name" :class="{ 'p-error': v$.name.$error }">職位</label>
        </span>
        <small v-if="v$.name.$error" class="p-error">
          {{ v$.name.$errors?.[0]?.$message }}
        </small>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
export default {
  props: {
    p_name: {
      type: String,
      default: null,
    },
    p_permissions: {
      default: null,
    },
  },
  emits: ["submitted"],
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    if (!this.p_name) {
      return {
        name: { required },
      }
    }
  },
  data() {
    return {
      name: this.p_name,
      permissions: this.p_permissions,
    }
  },
  methods: {
    handle_submit() {
      this.v$.$touch()
      if (this.v$.$error) {
        return
      }

      this.$refs.reset()
      this.$emit("submitted")
    },
  },
}
</script>

<style></style>
