<template>
  <div
    :data-tip="helperText"
    :class="`tooltip tooltip-${direction} tooltip-${color}`"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ToolTipInformations",
  props: ["helperText", "direction", "color"]
};
</script>
