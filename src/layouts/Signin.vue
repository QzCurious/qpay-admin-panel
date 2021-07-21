<template>
  <div class="p-pt-6 p-d-flex p-jc-center">
    <div class="container">
      <div class="p-d-flex p-ai-center">
        <h1 class="p-mr-auto">{{ $t("signin") }}</h1>
        <LocaleDropdown />
      </div>
      <form
        @submit.prevent="handle_submit"
        class="p-fluid p-d-flex p-flex-column"
      >
        <InputText
          float
          v-model="signin_id"
          :label="$t('signin_id')"
          name="signin_id"
          :errors="v$.signin_id.$errors.map((e) => e.$message)"
        />
        <Password
          float
          v-model="password"
          :label="$t('signin_password')"
          name="password"
          :errors="v$.password.$errors.map((e) => e.$message)"
        />
        <Button
          :loading="submitting"
          class="p-mt-3"
          :label="$t('signin')"
          type="submit"
        />
      </form>
    </div>
  </div>
  <Dialog modal :header="$t('verify_2fa')" v-model:visible="show_verify_2fa">
    <Verify2fa @success="next_page" />
  </Dialog>
  <Dialog modal :header="'2fa QR code'" v-model:visible="show_qrcode">
    <form class="p-fluid p-d-flex p-flex-column">
      <img :src="qrcode" />
      <Button autofocus :label="$t('form.next')" @click="continue_to_signin" />
    </form>
  </Dialog>
</template>

<script>
import auth from "../api/Auth"
import User from "../api/User"
import router from "../router"
import useVuelidate from "@vuelidate/core"
import { required, minLength } from "@vuelidate/validators"
import InputText from "../components/InputText"
import Password from "../components/Password"
import store from "../store"
import Verify2fa from "../components/Verify2fa"
import LocaleDropdown from "../components/LocaleDropdown"
import { ApiError } from "../api/ErrorHandler"

export default {
  components: { InputText, Password, Verify2fa, LocaleDropdown },
  setup() {
    const v$ = useVuelidate()
    return { v$ }
  },
  validations() {
    return {
      signin_id: { required, minLength: minLength(2) },
      password: { required },
    }
  },
  data() {
    return {
      signin_id: null,
      password: null,
      submitting: false,
      show_verify_2fa: false,
      qrcode: null,
      show_qrcode: false,
    }
  },
  methods: {
    async handle_submit() {
      this.v$.$touch()

      if (this.v$.$error) {
        return
      }

      this.submitting = true
      try {
        await auth.signin({
          signin_id: this.signin_id,
          signin_password: this.password,
        })
      } finally {
        this.submitting = false
      }

      // 用 twofa_flag = 0 的 token 打任何一支 api，一定會錯誤
      // 取 error 訊息判斷是否有註冊過 2fa
      try {
        await User.get(store.getters["auth/signin_id"])
      } catch (err) {
        if (!(err instanceof ApiError)) {
          throw err
        }

        if (err.code === 9002) {
          this.show_verify_2fa = true
          return
        }

        if (err.code === 9001) {
          const res = await auth.get_2fa_qrcode()
          this.show_qrcode = true
          this.qrcode = URL.createObjectURL(res.data)

          // 後端說要打 cookie 回去
          auth.trigger_bind_2fa()
          return
        }

        throw err
      }
      await auth.singin_2fa(this.code)
      this.$router.push({ name: "user_management" })
      return
    },
    continue_to_signin() {
      this.show_qrcode = false
      this.show_verify_2fa = true
    },
    next_page() {
      router.push(this.$route.redirectedFrom?.fullPath || "/")
    },
  },
  watch: {
    show_verify_2fa(new_value) {
      this.submitting = new_value
    },
    show_qrcode(new_value) {
      this.submitting = new_value
    },
  },
}
</script>

<style scoped>
.container {
  width: min(100%, 18rem);
}
</style>
