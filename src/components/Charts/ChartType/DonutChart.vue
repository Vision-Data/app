<template>
  <div class="donut-container">
    <!-- définition du svg de base -->
    <svg class="donut" :height="margin.bottom + height + margin.top" :width="margin.right + width + margin.left" ref="donut">
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3"; //importation de d3 pour utiliser la librairie

export default {
  name: "DonutChart",
  props: ["data"],
  data: () => ({
    width: 400, //largeur du canvas du graphique
    height: 400, //hauteur du canvas du graphique
    margin: {
      top: 20,
      right: 40,
      bottom: 20,
      left: 40,
    },
    svg: null, //intialisation de la variable svg
    radius: 0, //rayon du donut
  }),
  watch: {
    data: "renderSvg",
  },
  mounted() {
    this.initSvg(); //lancer la création du svg
  },
  methods: {
    initSvg() {
      this.radius = Math.min(this.width, this.height) / 2 - this.margin.top; //calculer le rayon du donut en fonction de la largeur et de la hauteur du canvas


      //récupération de l'élément svg et ajout d'un groupe
      this.svg = d3.select(this.$refs.donut);

      // décalage du svg pour améliorer l'affichage
      this.svg = this.svg
        .append("g")
        .attr(
          "transform",
          `translate(${this.width / 2}, ${this.height / 2})`
        );

      this.renderSvg(); //lancer la création du graphique
    },
    renderSvg() {
      const pie = d3.pie().value((d) => d[1]); //création du donut en fonction des données
      
      
      const ready = pie(Object.entries(this.data)); //formattage des données grâce a Object.entries

      //création des carces du donut
      const arc = d3.arc()
        .innerRadius(this.radius * 0.5)
        .outerRadius(this.radius * 0.8); 

      // add color to the slices
      const color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

      this.svg = this.svg
        .selectAll('slices')
        .data(ready)
        .join('path')
          .attr('d', arc)
          .attr('fill', function(d){ return(color(d.data[1]))})
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          .style("opacity", 0.7)

    },
  },
};
</script>

<style>
.donut >>> rect.bar {
  fill: #009688;
}
</style>