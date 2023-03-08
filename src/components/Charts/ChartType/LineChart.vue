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
      console.log(this.data);
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
                axisTitle: 'Time (mins)',
                axisClass: 'ct-axis-title',
                offset: {
                  x: 0,
                  y: 50,
                },
                textAnchor: 'middle',
              },
              axisY: {
                axisTitle: 'Goals',
                axisClass: 'ct-axis-title',
                offset: {
                  x: 0,
                  y: -1,
                },
                flipTitle: false,
              },
            }),
          ],
        },
        this.responsiveOptions
      );
    },
  };
</script>
