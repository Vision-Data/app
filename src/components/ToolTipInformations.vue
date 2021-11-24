<template>
  <div :data-tip="helperText" :class="`tooltip tooltip-${direction}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ToolTipInformations",
  props: ["helperText", "direction"]
};
</script>
