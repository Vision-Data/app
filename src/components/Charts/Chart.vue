<template>
  <div class="chart-container">
    <h1>{{ $t("chart.title") }}</h1>
    <LineChart :data="dataLine" :options="optionsChart" :responsiveOptions="responsiveOptionsChart" v-if="type === 'curves'" />
    <HistoChart :data="dataHisto" v-if="type === 'bars'"/>
    <DonutChart :data="dataDonut" v-if="type === 'donut'"/>
  </div>
</template>

<script>
import LineChart from "./ChartType/LineChart.vue";
import HistoChart from "./ChartType/HistoChart.vue";
import DonutChart from "./ChartType/DonutChart.vue";

export default {
  name: "Chart",
  props: ['type'],
  data() { return {
    selectedDataX: this.$store.state.selectedData.x,
    selectedDataY: this.$store.state.selectedData.y,
    dataDonut:  {a: 9, b: 20, c:30, d:8, e:12},
    dataHisto: [
      -0.07759597784808844, 0.5619279383911953, -0.051554452335713964,
      -0.3839089613567747, 0.9658295198906364, 0.48366524934238464,
    ],
    dataLine: {
      labels: this.selectedDataX ? this.selectedDataX : [],
      series: this.selectedDataY ? [this.selectedDataY] : [],
    },
    optionsChart: {
      width: 600,
      height: 300,
      labelInterpolationFnc: function (value) {
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
          labelInterpolationFnc: function (value) {
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
  }},
  components: {
    LineChart,
    HistoChart,
    DonutChart
  },
  mounted() {
    this.unwatchX = this.$store.watch(
      (state) => state.selectedData.x,
      (newValue) => {
        // TODO : gérer la sélection de tableau, d'objet...
        this.selectedDataX = newValue.map((item) => item.value);
      }
    );
    this.unwatchY = this.$store.watch(
      (state) => state.selectedData.y,
      (newValue) => {
        // TODO : gérer la sélection de tableau, d'objet...
        this.selectedDataY = newValue.map((item) => item.value.toString());
      }
    );
  },
  beforeUnmount() {
    this.unwatchX();
    this.unwatchY();
  },
  watch: {
    selectedDataX: {
      handler(newValue) {
        this.dataChart.labels = newValue;
      },
      deep: true,
    },
    selectedDataY: {
      handler(newValue) {
        this.dataChart.series = [newValue];
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>