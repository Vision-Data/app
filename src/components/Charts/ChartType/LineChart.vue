<template>
  <div class="ct-chart-line" />
</template>

<script>
  import Chartist from 'chartist';
  import ctAxisTitle from 'chartist-plugin-axistitle';

  export default {
    name: 'LineChart',
    props: ['data', 'options', 'responsiveOptions'],
    data() {
      return {
        chart: null,
        titleX: 'X',
        titleY: 'Y',
      };
    },
    watch: {
      data: {
        handler(newValue) {
          this.chart.update(newValue);
        },
        deep: true,
      },
    },
    mounted() {
      this.chart = new Chartist.Line(
        '.ct-chart-line',
        this.data,
        {
          width: 600,
          height: 300,
          labelInterpolationFnc: function (value) {
            return value[0];
          },
          plugins: [
            ctAxisTitle({
              axisX: {
                axisTitle: this.titleX,
                axisClass: 'ct-axis-title',
                offset: {
                  x: 0,
                  y: 30,
                },
                textAnchor: 'middle',
              },
              axisY: {
                axisTitle: this.titleY,
                axisClass: 'ct-axis-title',
                offset: {
                  x: 0,
                  y: 20,
                },
                textAnchor: 'middle',
                flipTitle: true,
              },
            }),
          ],
        },
        this.responsiveOptions
      );
    },
  };
</script>
