<template>
  <div class="register">
    <img
      id="logo"
      class="w-96 mb-8"
      :src="require(`@/assets/watermark-color.png`)"
      alt="logo-vision"
    />
    <h1 class="text-center font-bold text-4xl mt-4">
      {{ $t("authentication.signup") }}
    </h1>
    <section
      class="flex flex-col md:flex-row justify-center md:space-x-10 items-center mt-8"
    >
      <Alert
        type="error"
        :label="errors.message"
        v-if="errors && errors.message"
      />
      <form class="flex flex-col items-center w-96" @submit.prevent="register">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">{{
              $t("authentication.emailAdress")
            }}</span>
          </label>
          <input
            type="text"
            :placeholder="$t('authentication.emailAdress')"
            class="input input-bordered w-full max-w-xs"
            :class="{ 'input-error': errors && errors.email }"
            v-model="form.email"
          />
          <ErrorLabel :label="errors.email" v-if="errors && errors.email" />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">{{ $t("authentication.username") }}</span>
          </label>
          <input
            type="text"
            :placeholder="$t('authentication.username')"
            class="input input-bordered w-full max-w-xs"
            :class="{ 'input-error': errors && errors.full_name }"
            v-model="form.full_name"
          />
          <ErrorLabel
            :label="errors.full_name"
            v-if="errors && errors.full_name"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">{{ $t("authentication.password") }}</span>
          </label>
          <input
            type="password"
            :placeholder="$t('authentication.password')"
            class="input input-bordered w-full max-w-xs"
            :class="{ 'input-error': errors && errors.password }"
            v-model="form.password"
          />
          <input
            type="password"
            :placeholder="$t('authentication.confirmPassword')"
            class="input input-bordered w-full max-w-xs"
            :class="{ 'input-error': errors && errors.password }"
            v-model="form.passwordConf"
          />
          <ErrorLabel
            :label="errors.password"
            v-if="errors && errors.password"
          />
        </div>
        <div class="form-control w-full max-w-xs mt-4">
          <Button
            class="btn-primary"
            @click.prevent="register"
            :isLoading="isLoading"
            >{{ $t("authentication.signupButton") }}</Button
          >
        </div>
        <p class="text-center mt-4">
          <router-link to="/login" class="link-primary">{{
            $t("authentication.alreadyRegisteredText")
          }}</router-link>
        </p>
      </form>
      <div class="divider divider-horizontal font-bold">
        OU
      </div>
      <div class="w-96">
        <div class="flex flex-col">
          <Providers />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Button from "../../components/Commons/Form/Button.vue";
import ErrorLabel from "../../components/Commons/Form/ErrorLabel.vue";
import Alert from "../../components/Commons/Alert.vue";
import Providers from "../../components/Authentication/Providers.vue";

import AuthenticationService from "../../services/VisionApi/Authentication.js";

export default {
  name: "Registration",
  components: { Button, ErrorLabel, Alert, Providers },
  data() {
    return {
      form: {
        email: "",
        full_name: "",
        password: "",
        passwordConf: "",
      },
      errors: null,
      isLoading: false,
    };
  },
  methods: {
    async register() {
      if (this.form.password !== this.form.passwordConf) {
        this.errors = {
          password: "Les deux mots de passe doivent être identiques",
        };
        return;
      }

      this.isLoading = true;
      const { response, errors } = await AuthenticationService.signUp(
        this.form
      );

      this.isLoading = false;
      this.errors = errors;

      if (!this.errors) {
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$router.push("/workspaces");
      }
    },
  },
};
</script>

<style scoped>
.register {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
