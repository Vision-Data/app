<template>
  <div class="reset-button">
    <button class="btn-primary btn-outline" @click="reset">
      Réinitialiser
    </button>
  </div>
</template>

<script>
  export default {
    name: 'ResetButton',
    methods: {
      reset() {
        this.$store.commit('resetSelectedData');
      },
    },
  };
</script>
<style></style>
