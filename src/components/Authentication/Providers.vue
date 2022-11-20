<template>
  <div class="flex flex-col">
    <Button class="btn-lg" @click.prevent="logWithProvider('google')">
      <img :src="require(`@/assets/LogoGoogle.png`)" class="w-8 mr-4" />
      Connexion avec Google
    </Button>
    <Button class="btn-lg mt-4 mb-8" @click.prevent="logWithProvider('github')">
      <img :src="require(`@/assets/LogoGithub.png`)" class="w-8 mr-4" />
      Connexion avec Github
    </Button>
  </div>
</template>

<script>
import Button from '../Commons/Form/Button.vue';
export default {
  name: 'Providers',
  components: {
    Button
  },
  methods: {
    logWithProvider(provider) {
      window.location = `${process.env.VUE_APP_HOST_API}auth/${provider}`;
    }
  }
};
</script>
