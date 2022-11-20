<template>
  <div
    class="alert shadow-lg"
    :class="{ 'alert-error': type === 'error', 'alert-info': type === 'info' }"
  >
    <div>
      <span> {{ label }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Alert',
    props: ['label', 'type'],
  };
</script>
