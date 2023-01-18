<template>
  <div class="login">
    <img
      id="logo"
      :src="require(`@/assets/watermark-color.png`)"
      alt="Logo Vision"
    />
    <h1 class="text-center font-bold text-3xl mt-4">
      {{ 'Connexion' }}
    </h1>
    <section
      class="login-info flex flex-row-reverse justify-center items-flex_start mt-8"
    >
      <Providers />
      <div class="divider divider-horizontal font-bold center">OU</div>
      <div class="classique flex flex-col items-center w-17">
        <Alert
          v-if="errors && errors.message"
          type="error"
          :label="errors.message"
        />
        <form class="w-full max-w-xs" @submit.prevent="login">
          <div class="form-control w-full max-w-xs">
            <label class="label flex flex-col items-start" for="email">
              <span class="label-text mb-2">Adresse e-mail</span>
              <input
                id="email"
                v-model="form.email"
                type="text"
                placeholder="Adresse e-mail"
                class="input input-bordered w-full max-w-xs"
                :class="{ 'input-error': errors && errors.email }"
              />
            </label>
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label flex flex-col items-start" for="password">
              <span class="label-text mb-2">Mot de passe</span>
              <input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="Mot de passe"
                class="input input-bordered w-full max-w-xs"
                :class="{ 'input-error': errors && errors.password }"
              />
            </label>

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

  #logo {
    width: 20rem;
  }

  .w-17 {
    width: 17rem;
  }

  .center {
    margin-top: 100px;
  }

  @media only screen and (max-width: 600px) {
    .login-info {
      flex-direction: column;
      margin-top: 0;
    }

    .center {
      margin-top: 20px;
    }

    .classique input {
      margin: 0;
    }
  }
</style>
