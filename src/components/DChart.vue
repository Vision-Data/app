<template>
  <div class="chart">
    <!-- Chart in another component -->
    <HistoChart/>
  </div>
</template>

<script>
import HistoChart from '../components/Charts/ChartType/HistoChart.vue'//importation du composant HistoChart

export default {
  name: "DChart",
  components: {
    HistoChart
  }
};
</script>

<style>
.chart {
  padding: 1rem;
}
</style>