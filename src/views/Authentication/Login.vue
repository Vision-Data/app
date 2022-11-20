<template>
  <div class="login">
    <img
      id="logo"
      class="w-96"
      :src="require(`@/assets/watermark-color.png`)"
      alt="logo-vision mb-8"
    />
    <h1 class="text-center font-bold text-4xl mt-4">
      {{ 'Connexion' }}
    </h1>
    <section class="flex flex-col justify-center items-center mt-8">
      <Providers />
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
              <span class="label-text">{{ 'Adresse e-mail' }}</span>
            </label>
            <input
              v-model="form.email"
              type="text"
              placeholder="Adresse e-mail"
              class="input input-bordered w-full max-w-xs"
              :class="{ 'input-error': errors && errors.email }"
            />
            <ErrorLabel v-if="errors && errors.email" :label="errors.email" />
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">{{ 'Mot de passe' }}</span>
            </label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Mot de passe"
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
              >{{ 'Connexion' }}</Button
            >
          </div>
        </form>
        <p class="text-center mt-4">
          <router-link to="/register" class="link-primary">{{
            "Vous n'avez pas de compte ? Inscrivez-vous !"
          }}</router-link>
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

  import { Buffer } from 'buffer';

  import AuthenticationService from '../../services/VisionApi/Authentication.js';

  export default {
    name: 'Login',
    components: { Button, ErrorLabel, Alert, Providers },
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        errors: null,
        isLoading: false,
      };
    },
    mounted() {
      if (
        this.$route.query &&
        this.$route.query.token &&
        this.$route.query.user
      ) {
        const token = Buffer.from(this.$route.query.token, 'base64').toString(
          'ascii'
        );

        const user = JSON.parse(
          Buffer.from(this.$route.query.user, 'base64').toString('ascii')
        );

        this.loggedUser(token, user);
      }
    },

    methods: {
      async login() {
        this.isLoading = true;
        const { response, errors } = await AuthenticationService.login(
          this.form
        );
        this.isLoading = false;

        this.errors = errors;
        if (!this.errors) {
          this.loggedUser(response.data.token, response.data.user);
        }
      },

      loggedUser(token, user) {
        this.$store.dispatch('setToken', token);
        this.$store.dispatch('setUser', user);
        this.$router.push('/workspaces');
      },
    },
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
