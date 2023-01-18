<template>
  <div class="register">
    <img
      id="logo"
      class="w-96 mb-8"
      :src="require(`@/assets/watermark-color.png`)"
      alt="logo-vision"
    />
    <h1 class="text-center font-bold text-4xl mt-4">
      {{ 'Inscription' }}
    </h1>
    <section
      class="flex flex-col-reverse md:flex-row justify-center md:space-x-10 items-center mt-8"
    >
      <Alert
        v-if="errors && errors.message"
        type="error"
        :label="errors.message"
      />
      <div class="register-form">
        <form
          class="flex flex-col items-center w-96"
          @submit.prevent="register"
        >
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

            <ErrorLabel v-if="errors && errors.email" :label="errors.email" />
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label flex flex-col items-start" for="username">
              <span class="label-text mb-2">Nom d'utilisateur</span>
              <input
                id="username"
                v-model="form.full_name"
                type="text"
                placeholder="Nom d'utilisateur"
                class="input input-bordered w-full max-w-xs"
                :class="{ 'input-error': errors && errors.full_name }"
              />
            </label>

            <ErrorLabel
              v-if="errors && errors.full_name"
              :label="errors.full_name"
            />
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
              <input
                v-model="form.passwordConf"
                type="password"
                placeholder="Confirmer le Mot de passe"
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
              class="btn-primary"
              :is-loading="isLoading"
              @click.prevent="register"
              >{{ 'Inscription' }}</Button
            >
          </div>
          <p class="text-center mt-4">
            <router-link to="/login" class="link-primary">{{
              'Vous avez déjà un compte ? Connectez-vous !'
            }}</router-link>
          </p>
        </form>
      </div>
      <div class="divider font-bold or">OU</div>
      <Providers />
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
    name: 'Registration',
    components: { Button, ErrorLabel, Alert, Providers },
    data() {
      return {
        form: {
          email: '',
          full_name: '',
          password: '',
          passwordConf: '',
        },
        errors: null,
        isLoading: false,
      };
    },
    methods: {
      async register() {
        if (this.form.password !== this.form.passwordConf) {
          this.errors = {
            password: 'Les deux mots de passe doivent être identiques',
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
          this.$store.dispatch('setToken', response.data.token);
          this.$store.dispatch('setUser', response.data.user);
          this.$router.push('/workspaces');
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

  .register-form {
    width: fit-content;
  }

  .register-form form {
    width: fit-content;
  }

  .or {
    width: fit-content;
  }
</style>
