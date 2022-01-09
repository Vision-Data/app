<template>
  <div class="ct-chart-line"></div>
</template>

<script>
import Chartist from "chartist";
export default {
  name: "LineChart",
  props: ["data", "options", "responsiveOptions"],
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.chart = new Chartist.Line(
      ".ct-chart-line",
      this.data,
      this.options,
      this.responsiveOptions
    );
  },
  watch: {
    data: {
      handler(newValue) {
        this.chart.update(newValue);
      },
      deep: true,
    },
  },
};
</script>
