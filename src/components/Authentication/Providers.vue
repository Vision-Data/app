<template>
  <div class="flex flex-col">
    <Button class="btn-md google" @click.prevent="logWithProvider('google')">
      <img :src="require(`@/assets/LogoGoogle.png`)" class="w-8 mr-4" />
      Connexion avec Google
    </Button>
    <Button class="btn-md git" @click.prevent="logWithProvider('github')">
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
      Button,
    },
    methods: {
      logWithProvider(provider) {
        window.location = `${process.env.VUE_APP_HOST_API}auth/${provider}`;
      },
    },
  };
</script>
<style>
  .google {
    margin-top: 36px;
  }

  .git {
    margin-top: 52px;
  }

  @media only screen and (max-width: 600px) {
    .google {
      margin-top: 10px;
    }

    .git {
      margin-top: 10px;
    }
  }
</style>
