<template>
  <img
    id="logo"
    class="w-96 m-auto"
    :src="require(`@/assets/watermark-color.png`)"
    alt="logo-vision"
  />
  <h1 class="text-center font-bold text-4xl mt-4">Connexion</h1>
  <section class="flex flex-col justify-center items-center mt-8">
    <div class="w-96 mb-2">
      <div class="flex flex-col">
        <Button class="btn-lg">
          <img :src="require(`@/assets/LogoGoogle.png`)" class="w-8 mr-4" />
          Connexion avec Google
        </Button>
        <Button class="btn-lg mt-4">
          <img :src="require(`@/assets/LogoGithub.png`)" class="w-8 mr-4" />
          Connexion avec Github
        </Button>
      </div>
    </div>
    <div class="divider divider-horizontal font-bold">
      OU
    </div>
    <div class="flex flex-col items-center w-96">
      <Alert
        type="error"
        :label="errors.message"
        v-if="errors && errors.message"
      />
      <form class="w-full max-w-xs" @submit.prevent="login">
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text">Adresse e-mail</span>
          </label>
          <input
            type="text"
            placeholder="Adresse e-mail"
            class="input input-bordered w-full max-w-xs"
            :class="{ 'input-error': errors && errors.email }"
            v-model="email"
          />
          <ErrorLabel :label="errors.email" v-if="errors && errors.email" />
        </div>
        <div class="form-control w-full max-w-xs mt-2">
          <label class="label">
            <span class="label-text">Mot de passe</span>
          </label>
          <input
            type="password"
            placeholder="Mot de passe"
            class="input input-bordered w-full max-w-xs"
            :class="{ 'input-error': errors && errors.password }"
            v-model="password"
          />
          <ErrorLabel
            :label="errors.password"
            v-if="errors && errors.password"
          />
        </div>
        <div class="form-control w-full max-w-xs mt-8">
          <Button class="btn-primary" @click="login" :isLoading="isLoading"
            >Connexion</Button
          >
        </div>
      </form>

      <p class="text-center mt-4">
        <router-link to="/register" class="link-primary"
          >Vous n'avez pas de compte ? Inscrivez-vous !</router-link
        >
      </p>
    </div>
  </section>
</template>

<script>
import Button from "../../components/Commons/Form/Button.vue";
import ErrorLabel from "../../components/Commons/Form/ErrorLabel.vue";
import Alert from "../../components/Commons/Alert.vue";

import { login } from "../../services/VisionApi/authentication";

export default {
  name: "Login",
  components: { Button, ErrorLabel, Alert },
  data() {
    return {
      email: "",
      password: "",
      errors: null,
      isLoading: false,
    };
  },

  methods: {
    async login() {
      this.isLoading = true;
      const { response, errors } = await login({
        email: this.email,
        password: this.password,
      });
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
