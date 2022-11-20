<template>
  <div class="modal" :class="{ 'modal-open': isOpen }">
    <div class="modal-box">
      <h3 class="font-bold text-2xl mb-4">{{ title }}</h3>
      <slot></slot>
      <div class="modal-action">
        <slot name="actions"></slot>
        <label for="my-modal-2" class="btn btn-primary" @click="close">
          {{ closeLabel || 'Fermer' }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Modal',
    props: ['isOpen', 'title', 'closeLabel'],
    emits: ['close'],
    query: ['close'],
    methods: {
      close() {
        this.$emit('close', false);
      },
    },
  };
</script>

<style scoped>
  .modal {
    margin: 0;
    max-width: unset;
  }
</style>
