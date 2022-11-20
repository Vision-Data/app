<template>
  <div class="chart-container">
    <h1>{{ 'Schéma de données' }}</h1>
    <LineChart
      :data="dataChart"
      :options="optionsChart"
      :responsive-options="responsiveOptionsChart"
    />
  </div>
</template>

<script>
  import LineChart from './ChartType/LineChart.vue';
  export default {
    name: 'Chart',
    components: {
      LineChart,
    },
    data() {
      return {
        selectedDataX: this.$store.state.selectedData.x,
        selectedDataY: this.$store.state.selectedData.y,
        dataChart: {
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
