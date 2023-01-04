<template>
  <div class="histograms">
    <!-- définition du svg de base -->
    <svg class="histogram" :height="margin.bottom + height + margin.top" :width="margin.right + width + margin.left" ref="histogram">
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3"; //importation de d3 pour utiliser la librairie

export default {
  name: "HistoChart",
  props: ["data"],
  data: () => ({
    width: 800, //largeur du canvas du graphique
    height: 400, //hauteur du canvas du graphique
    margin: {
      top: 20,
      right: 40,
      bottom: 20,
      left: 40,
    },
    numBins: 0, //nombre de bars
    svg: null, //intialisation de la variable svg
  }),
  watch: {
    data: "renderSvg",
    numBins: "renderSvg",
  },
  mounted() {
    this.initSvg(); //lancer la création du svg
  },
  computed: {
    histogram() {
      const countHistogram = d3
        .histogram() //utiliser un type histogram de d3
        .domain(d3.extent(this.data)) //prendre le min et le max parmis les données pour définir les limites du domaine
        .thresholds(this.numBins); //définir le nombre max de barres
      // renvoie un tableat de chaque éléments (barres) avec ses coordonnées
      return countHistogram(this.data).map((bins) => ({
        x: bins.x0,
        y: bins.length,
      }));
    },
  },
  methods: {
    initSvg() {
      //récupération de l'élément svg et ajout d'un groupe
      this.svg = d3.select(this.$refs.histogram);
      
      this.svg = this.svg
        .append("g")
        .attr(
          "transform",
          `translate(${this.margin.left}, ${this.margin.top})`
        );

      this.numBins = this.data.length; //le nombre de bars correspond au nombre de données
      this.renderSvg(); //lancer la création du graphique
    },
    renderSvg() {
      //initialisation de l'axe des abscisses
      const x = d3
        .scaleBand()
        .padding(0.2)
        .domain(this.histogram.map((d) => d.x))
        .rangeRound([0, this.width]);

      //initialisation de l'axe des ordonnées
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(this.histogram, (d) => d.y)])
        .range([this.height, 0]);

      //sélection des rectangles avec les données de la computed "histogram"
      const selection = this.svg.selectAll("rect").data(this.histogram);
      //Ajouter l'axe des ordonnées
      this.svg = this.svg.append("g").call(d3.axisLeft(y));
      this.svg = this.svg
        .append("g")
        .attr("transform", `translate(0,${this.height})`)
        .call(d3.axisBottom(x));

      // affectation des propriétés à la sélection des rectangles
      selection
        .enter() // quand il y a plus de données que d'élements rect
        .append("rect") // on rajoute un élément rect
        .attr("class", "bar") // on attribue la class "bar" au rectangle
        .merge(selection) // on ajoute le rectangle à la sélection
        .attr(
          "transform",
          (d) => `translate(${x(d.x)} ${this.height}) scale(1 -1)`
        ) // on positionne la barre horizontalement (décalage sur axe x)
        .attr("width", x.bandwidth()) // largeur de la barre est définie par la scale x
        .attr("height", (d) => y(d.y)); // on donne une hauteur à la barre selon la valeur de la donnée

      selection.exit().remove(); // on sort et on enlève les excédants
    },
  },
};
</script>

<style>
.histogram >>> rect.bar {
  fill: #009688;
}
</style>