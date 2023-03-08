<template>
  <div class="scatterPoint-container">
    <!-- définition du svg de base -->
    <svg
      ref="scatterPoint"
      class="scatterPoint"
      :height="margin.bottom + height + margin.top"
      :width="margin.right + width + margin.left"
    ></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'; //importation de d3 pour utiliser la librairie
  export default {
    name: 'ScatterPointChart',
    // this.$store.state.unique !== [] ? this.$store.state.unique : [1]
    data: () => ({
      data: [],
      width: 400, //largeur du canvas du graphique
      height: 400, //hauteur du canvas du graphique
      margin: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40,
      },
      svg: null, //intialisation de la variable svg
    }),
    computed: {
      scatterPoint() {
        const pie = d3.pie().sort(null);
        return pie(Object.entries(JSON.parse(JSON.stringify(this.data)))); //formattage des données grâce a Object.entries
      },
    },
    watch: {
      data: {
        handler(newValue, oldValue) {
          if (newValue !== oldValue) {
            this.initSvg();
          }
        },
        deep: true,
      },
    },
    mounted() {
      const storage = JSON.parse(JSON.stringify(this.$store.state.unique));
      this.data = storage.length === 0 ? [1] : storage;
      this.initSvg(); //lancer la création du svg
    },
    methods: {
      initSvg() {
        //récupération de l'élément svg et ajout d'un groupe
        this.svg = d3.select(this.$refs.scatterPoint);
        console.table(this.svg);
        this.svg = this.svg
          .append('svg')
          .attr('width', this.width + this.margin.left + this.margin.right)
          .attr('height', this.height + this.margin.top + this.margin.bottom)
          .append('g')
          .attr(
            'transform',
            'translate(' + this.margin.left + ',' + this.margin.top + ')'
          );
        this.renderSvg(); //lancer la création du graphique
      },
      renderSvg() {
        //création des axes du nuage de points

        var x = d3.scaleLinear().domain([0, 4000]).range([0, this.width]);
        this.svg
          .append('g')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear().domain([0, 500000]).range([this.height, 0]);
        this.svg.append('g').call(d3.axisLeft(y));

        //ajout des points au graphique
        this.svg
          .append('g')
          .selectAll('dot')
          .data(this.data)
          .enter()
          .append('circle')
          .attr('cx', function (d) {
            return x(d.x);
          })
          .attr('cy', function (d) {
            return y(d.y);
          })
          .attr('r', 1.5)
          .style('fill', '#69b3a2');
      },
    },
  };
</script>
