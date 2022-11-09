<template>
  <div class="modal" :class="{ 'modal-open': isOpen }">
    <div class="modal-box">
      <h3 class="font-bold text-2xl mb-4">
        {{ title }}
      </h3>

      <slot />

      <div class="modal-action">
        <slot name="actions" />

        <label for="my-modal-2" class="btn btn-primary" @click="close">
          {{ closeLabel || $t('commons.closeModal') }}
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
  methods: {
    close() {
      this.$emit('close', false);
    }
  }
};
</script>

<style scoped>
.modal {
  margin: 0;
  max-width: unset;
}
</style>
