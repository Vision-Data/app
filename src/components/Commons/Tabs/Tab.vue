<template>
  <div v-show="title == selectedTitle">
    <slot />
  </div>
</template>

<script>
import { inject } from 'vue';
export default {
  name: 'Tab',
  props: ['title'],
  setup() {
    const selectedTitle = inject('selectedTitle');

    return { selectedTitle };
  },
  data() {
    return {
      isActive: true
    };
  }
};
</script>
