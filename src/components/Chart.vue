<template>
  <div>
    <h1>Diagramme :</h1>
    <div class="ct-chart ct-perfect-fourth"></div>
  </div>
</template>
 
<script>
import Chartist from "chartist";
export default {
  name: "Chart",

  mounted() {
    // new Chartist.Line(
    //   ".donut-chart",
    //   {
    //     labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    //     series: [
    //       [12, 9, 7, 8, 5],
    //       [2, 1, 3.5, 7, 3],
    //       [1, 3, 4, 5, 6],
    //     ],
    //   },
    //   {
    //     width: 600,
    //     height: 300,
    //     chartPadding: {
    //       right: 40,
    //     },
    //   }
    // );

    // new Chartist.Bar(
    //   ".ct-chart",
    //   {
    //     labels: ["Q1", "Q2", "Q3", "Q4"],
    //     series: [
    //       [800, 1200, 1400, 1300],
    //       [200, 400, 500, 300],
    //       [100, 200, 400, 600],
    //     ],
    //   },
    //   {
    //     width: 600,
    //     height: 300,
    //     stackBars: true,
    //     axisY: {
    //       labelInterpolationFnc: function (value) {
    //         return value;
    //       },
    //     },
    //   }
    // ).on("draw", function (data) {
    //   if (data.type === "bar") {
    //     data.element.attr({
    //       style: "stroke-width: 30px",
    //     });
    //   }
    // });

    var data = {
      labels: ["Bananas", "Apples", "Grapes"],
      series: [20, 15, 40],
    };

    var options = {
      width: 600,
      height: 300,
      labelInterpolationFnc: function (value) {
        return value[0];
      },
    };

    var responsiveOptions = [
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
    ];

    new Chartist.Pie(".ct-chart", data, options, responsiveOptions);
  },
};
</script>