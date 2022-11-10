<template>
  <label class="label">
    <span class="label-text text-2xs text-red-400">{{ label }}</span>
  </label>
</template>
<script>
export default {
  name: 'ErrorLabel',
  props: ['label']
};
</script>
