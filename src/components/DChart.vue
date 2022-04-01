<template>
  <div class="chart">
    <!-- Chart in another component -->
    <HistoChart/>
    
    <!-- chart with circles -->
    <!-- <svg :height="height" :width="width"> -->
      <!-- <g transform="translate(50,50)"> -->
      <!-- <g>
        <circle v-for="c in output" :key="c.id" :r="c.r" :cx="c.x" :cy="c.y" :fill="c.fill" :stroke="c.stroke">
        </circle>
      </g>
    </svg> -->
  </div>
</template>

<script>
import * as d3 from "d3";//import de d3 pour utiliser la librairie
import HistoChart from '../components/Charts/ChartType/HistoChart.vue'//importation du composant HistoChart

export default {
  name: "DChart",
  created() {
    //définition des couleurs du graphique
    this.colorScale = d3
      .scaleOrdinal()
      .range(["#ECECEC", "AFAFAF", "#000", "#EC0D7A"]);
  },
  components: {
    HistoChart
  },
  computed: {
    packData() {
      const nestedTweets = d3.group(this.tweetData, d => d.user);
      return d3
        .hierarchy(nestedTweets)
        .sum(d =>
          d.retweets ? d.retweets.length + d.favorites.length + 1 : 1
        );
    },
    // Fonction qui va être utilisée dans la template (un tableau avec un élément pour chaque cercle)
    output() {
      // Lancer la fonction de création du graphique
      return this.packChart();
    }
  },
  methods: {
    packChart() {
      const packChart = d3.pack();//utiliser la fonction pack de D3 (groupement de données)
      packChart.size([200, 200]);//taille du graphique
      packChart.padding(10); //padding entre les éléments
      const output = packChart(this.packData).descendants(); // définition des descendants (éléments du graphique)
      // Pour chaque élément on lui donne une couleur et une taille (i: index, d: données)
      return output.map((d, i) => {
        const fill = this.colorScale(d.depth);
        return {
          id: i + 1,
          r: d.r,
          x: d.x,
          y: d.y,
          fill,
          stroke: "gray"
        };
      });
    }
  },
  data: () => ({
    height: 200, //hauteur du canvas du graphique
    width: 200, //largeur du canvas du graphique
    // donnée du graphique
    tweetData: [
      {
        user: "Al",
        content: "I really love seafood.",
        timestamp: " Mon Dec 23 2013 21:30 GMT-0800 (PST)",
        retweets: ["Raj", "Pris", "Roy"],
        favorites: ["Sam"]
      },
      {
        user: "Al",
        content: "I take that back, this doesn't taste so good.",
        timestamp: "Mon Dec 23 2013 21:55 GMT-0800 (PST)",
        retweets: ["Roy"],
        favorites: []
      },
      {
        user: "Al",
        content: "From now on, I'm only eating cheese sandwiches.",
        timestamp: "Mon Dec 23 2013 22:22 GMT-0800 (PST)",
        retweets: [],
        favorites: ["Roy", "Sam"]
      },
      {
        user: "Roy",
        content: "Great workout!",
        timestamp: " Mon Dec 23 2013 7:20 GMT-0800 (PST)",
        retweets: [],
        favorites: []
      },
      {
        user: "Roy",
        content: "Spectacular oatmeal!",
        timestamp: " Mon Dec 23 2013 7:23 GMT-0800 (PST)",
        retweets: [],
        favorites: []
      },
      {
        user: "Roy",
        content: "Amazing traffic!",
        timestamp: " Mon Dec 23 2013 7:47  GMT-0800 (PST)",
        retweets: [],
        favorites: []
      },
      {
        user: "Roy",
        content: "Just got a ticket for texting and driving!",
        timestamp: " Mon Dec 23 2013 8:05 GMT-0800 (PST)",
        retweets: [],
        favorites: ["Sam", "Sally", "Pris"]
      },
      {
        user: "Pris",
        content: "Going to have some boiled eggs.",
        timestamp: " Mon Dec 23 2013 18:23 GMT-0800 (PST)",
        retweets: [],
        favorites: ["Sally"]
      },
      {
        user: "Pris",
        content: "Maybe practice some gymnastics.",
        timestamp: " Mon Dec 23 2013 19:47  GMT-0800 (PST)",
        retweets: [],
        favorites: ["Sally"]
      },
      {
        user: "Sam",
        content: "@Roy Let's get lunch",
        timestamp: " Mon Dec 23 2013 11:05 GMT-0800 (PST)",
        retweets: ["Pris"],
        favorites: ["Sally", "Pris"]
      }
    ]
  })
};
</script>

<style>
.chart {
  padding: 1rem;
}
</style>