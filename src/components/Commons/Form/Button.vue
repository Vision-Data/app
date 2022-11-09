<template>
  <button class="btn" :class="{ loading: isLoading }">
    <slot />
  </button>
</template>

<script>
export default { name: 'Button', props: ['isLoading'] };
</script>
