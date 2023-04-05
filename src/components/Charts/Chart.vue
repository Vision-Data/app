<template>
  <div class="chart-container ml-4">
    <h1>{{ 'Schéma de données' }}</h1>
    <LineChart
      v-if="type === 'curves'"
      :data="dataChart"
      :options="optionsChart"
      :responsive-options="responsiveOptionsChart"
    />
    <DonutChart v-if="type === 'donut'" />
    <Export :chart-type="type" />
  </div>
</template>

<script>
  import LineChart from './ChartType/LineChart.vue';
  import DonutChart from './ChartType/DonutChart.vue';
  import Export from './Export/Export.vue';

  export default {
    name: 'Chart',
    components: {
      LineChart,
      DonutChart,
      Export,
    },
    props: ['type'],
    data() {
      return {
        selectedDataX: this.$store.state.selectedData.x,
        selectedDataY: this.$store.state.selectedData.y,
        selectedDataKeyx: this.$store.state.selectedData?.keyX,
        selectedDataKeyY: this.$store.state.selectedData?.keyY,
        dataChart: {
          labels: this.selectedDataKeyx
            ? this.selectedDataKeyx
            : this.selectedDataX
            ? this.selectedDataX
            : [],
          // xName: selectedDataKeyX,
          // yName: selectedDataKeyY
          // ? series
          // : this.selectedDataY
          // ? [this.selectedDataY]
          // : [],
        },
        responsiveOptionsChart: [
          [
            'screen and (min-width: 640px)',
            {
              chartPadding: 30,
              labelOffset: 100,
              labelDirection: 'explode',
              labelInterpolationFnc: function (value) {
                return value;
              },
            },
          ],
          [
            'screen and (min-width: 1024px)',
            {
              labelOffset: 80,
              chartPadding: 20,
            },
          ],
        ],
      };
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
  };
</script>

<style>
  [data-theme='dark'] .ct-label {
    filter: invert(1) !important;
  }
</style>
