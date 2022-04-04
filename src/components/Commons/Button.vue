<template>
  <button class="btn" :class="{ loading: isLoading }">
    {{ label }}
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: ["label", "isLoading"],
};
</script>
