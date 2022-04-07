<template>
  <img
    id="logo"
    class="w-96 m-auto"
    :src="require(`@/assets/watermark-color.png`)"
    alt="logo-vision"
  />
  <h1 class="text-center font-bold text-4xl mt-4">Inscription</h1>
  <section
    class="flex flex-col md:flex-row justify-center md:space-x-10 items-center mt-8"
  >
    <Alert
      type="error"
      :label="errors.message"
      v-if="errors && errors.message"
    />e
    <form class="flex flex-col items-center w-96" @submit.prevent="register">
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
          <span class="label-text">Pseudo</span>
        </label>
        <input
          type="text"
          placeholder="Pseudo"
          class="input input-bordered w-full max-w-xs"
          :class="{ 'input-error': errors && errors.full_name }"
          v-model="pseudo"
        />
        <ErrorLabel
          :label="errors.full_name"
          v-if="errors && errors.full_name"
        />
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
        <input
          type="password"
          placeholder="Confirmation du mot de passe"
          class="input input-bordered w-full max-w-xs"
          :class="{ 'input-error': errors && errors.password }"
          v-model="passwordConf"
        />
        <ErrorLabel :label="errors.password" v-if="errors && errors.password" />
      </div>
      <div class="form-control w-full max-w-xs mt-8">
        <Button class="btn-primary" @click="register" :isLoading="isLoading"
          >Inscription</Button
        >
      </div>
    </form>
    <div class="divider divider-horizontal font-bold">
      OU
    </div>
    <div class="w-96">
      <div class="flex flex-col">
        <Button class="btn-lg">
          <img :src="require(`@/assets/LogoGoogle.png`)" class="w-8 mr-4" />
          Connexion avec Google
        </Button>
        <Button class="btn-lg mt-4 mb-8">
          <img :src="require(`@/assets/LogoGithub.png`)" class="w-8 mr-4" />
          Connexion avec Github
        </Button>
        <p class="text-center">
          <router-link to="/login" class="link-primary"
            >Vous avez déjà un compte ? Connectez-vous !</router-link
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import Button from "../../components/Commons/Form/Button.vue";
import ErrorLabel from "../../components/Commons/Form/ErrorLabel.vue";
import Alert from "../../components/Commons/Alert.vue";

import { signUp } from "../../services/VisionApi/authentication";

export default {
  name: "Registration",
  components: { Button, ErrorLabel, Alert },
  data() {
    return {
      email: "",
      pseudo: "",
      password: "",
      passwordConf: "",
      errors: null,
      isLoading: false,
    };
  },
  methods: {
    async register() {
      if (this.password !== this.passwordConf) {
        this.errors = {
          password: "Les deux mots de passe doivent être identiques",
        };
        return;
      }

      this.isLoading = true;
      const { response, errors } = await signUp({
        email: this.email,
        full_name: this.pseudo,
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
