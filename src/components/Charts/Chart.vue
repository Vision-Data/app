<template>
  <div class="chart-container">
    <h1>Schéma de données</h1>
    <LineChart
      :data="dataChart"
      :options="optionsChart"
      :responsiveOptions="responsiveOptionsChart"
    />
  </div>
</template>

<script>
import LineChart from "./ChartType/LineChart.vue";
export default {
  name: "Chart",
  data() {
    return {
      selectedData: this.$store.state.selectedData,
      dataChart: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        series: this.selectedData ? [this.selectedData] : [],
      },
      optionsChart: {
        width: 600,
        height: 300,
        labelInterpolationFnc: function(value) {
          return value[0];
        },
      },
      responsiveOptionsChart: [
        [
          "screen and (min-width: 640px)",
          {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: "explode",
            labelInterpolationFnc: function(value) {
              return value;
            },
          },
        ],
        [
          "screen and (min-width: 1024px)",
          {
            labelOffset: 80,
            chartPadding: 20,
          },
        ],
      ],
    };
  },
  components: {
    LineChart,
  },
  mounted() {
    this.unwatch = this.$store.watch(
      (state) => state.selectedData,
      (newValue) => {
        // TODO : gérer la sélection de tableau, d'objet...
        this.selectedData = newValue.map((item) => item.value);
      }
    );
  },
  beforeUnmount() {
    this.unwatch();
  },
  watch: {
    selectedData: {
      handler(newValue) {
        this.dataChart.series = [newValue];
      },
      deep: true,
    },
  },
};
</script>
