<template>
  <Button id="logout" class="btn-error btn-outline" @click="logout">
    {{ 'Déconnexion' }}
  </Button>
</template>

<script>
  import Button from '../Commons/Form/Button.vue';

  import AuthenticationService from '../../services/VisionApi/Authentication.js';

  export default {
    name: 'Settings',
    components: { Button },
    props: ['openSettings'],
    methods: {
      async logout() {
        await AuthenticationService.logout(this.$store.state.token);
        this.$store.dispatch('logout');
        this.$router.push('/login');
        this.$notyf.success('Vous avez été déconnecté avec succès.');
      },
    },
  };
</script>

<style scoped>
  #logout {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 1rem;
    right: 1rem;
  }
</style>
