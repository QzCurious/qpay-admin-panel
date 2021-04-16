<template>
  <div class="p-pt-6 p-d-flex p-jc-center">
    <div>
      <h1>登入</h1>
      <form class="p-fluid p-d-flex p-flex-column">
        <div class="p-field p-sm-12">
          <span class="p-float-label">
            <InputText id="username" v-model="username" />
            <label for="username">帳號</label>
          </span>
        </div>
        <div class="p-field p-sm-12">
          <span class="p-float-label">
            <Password id="password" v-model="password" :feedback="false" />
            <label for="password">密碼</label>
          </span>
        </div>
        <Button label="Login" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
};
</script>

<style>
</style>