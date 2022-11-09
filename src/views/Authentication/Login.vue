<template>
  <div class="login">
    <img
      id="logo"
      class="w-96"
      :src="require(`@/assets/watermark-color.png`)"
      alt="logo-vision mb-8"
    />
    <h1 class="text-center font-bold text-4xl mt-4">
      {{ $t('authentication.login') }}
    </h1>
    <section class="flex flex-col justify-center items-center mt-8">
      <div class="w-96 mb-2">
        <div class="flex flex-col">
          <Providers />
        </div>
      </div>
      <div class="divider divider-horizontal font-bold">OU</div>
      <div class="flex flex-col items-center w-96">
        <Alert
          v-if="errors && errors.message"
          type="error"
          :label="errors.message"
        />
        <form class="w-full max-w-xs" @submit.prevent="login">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{{
                $t('authentication.emailAdress')
              }}</span>
            </label>
            <input
              v-model="form.email"
              type="text"
              :placeholder="$t('authentication.emailAdress')"
              class="input input-bordered w-full max-w-xs"
              :class="{ 'input-error': errors && errors.email }"
            />
            <ErrorLabel v-if="errors && errors.email" :label="errors.email" />
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{{
                $t('authentication.password')
              }}</span>
            </label>
            <input
              v-model="form.password"
              type="password"
              :placeholder="$t('authentication.password')"
              class="input input-bordered w-full max-w-xs"
              :class="{ 'input-error': errors && errors.password }"
            />
            <ErrorLabel
              v-if="errors && errors.password"
              :label="errors.password"
            />
          </div>
          <div class="form-control w-full max-w-xs mt-4">
            <Button
              class="btn btn-primary"
              :is-loading="isLoading"
              @click.prevent="login"
            >
              {{ $t('authentication.loginButton') }}
            </Button>
          </div>
        </form>
        <p class="text-center mt-4">
          <router-link to="/register" class="link-primary">
            {{ $t('authentication.notRegisteredText') }}
          </router-link>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import Button from '../../components/Commons/Form/Button.vue';
import ErrorLabel from '../../components/Commons/Form/ErrorLabel.vue';
import Alert from '../../components/Commons/Alert.vue';
import Providers from '../../components/Authentication/Providers.vue';

import AuthenticationService from '../../services/VisionApi/Authentication.js';

export default {
  name: 'Login',
  components: { Button, ErrorLabel, Alert, Providers },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: null,
      isLoading: false
    };
  },

  methods: {
    async login() {
      this.isLoading = true;
      const { response, errors } = await AuthenticationService.login(this.form);
      this.isLoading = false;

      this.errors = errors;
      if (!this.errors) {
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
        this.$router.push('/workspaces');
      }
    }
  }
};
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
