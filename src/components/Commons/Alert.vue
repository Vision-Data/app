<template>
  <div class="alert alert-error shadow-lg" v-if="type === 'error'">
    <div>
      <span> {{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: ["label", "type"],
};
</script>
