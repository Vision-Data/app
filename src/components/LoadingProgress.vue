<template>
  <!-- <div class="radial-progress" :style="`--value:${value}`" /> -->
  <div class="radial-progress" style="--value:0;">0%</div>
</template>

<script>
export default {
  name: "LoadingProgress",
  props: ["done"],
  data() {
    return {
      value: 10,
    };
  },
  watch: {
    value(newValue) {
      this.value = newValue;
    },
  },
  computed: {
    valueInPercent() {
      return this.value * 100;
    },
  },
};
</script>
