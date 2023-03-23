<template>
  <div class="donut-container">
    <!-- définition du svg de base -->
    <svg
      ref="donut"
      class="donut"
      :height="margin.bottom + height + margin.top"
      :width="margin.right + width + margin.left"
    ></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'; //importation de d3 pour utiliser la librairie
  export default {
    name: 'DonutChart',
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
      radius: 0, //rayon du donut
    }),
    computed: {
      donut() {
        const pie = d3
          .pie()
          .sort(null)
          .value((d) => Number(d[1]));
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
      this.unwatchUnique = this.$store.watch(
        (state) => state.unique,
        (newValue) => {
          this.data = newValue;
        }
      );
    },
    methods: {
      initSvg() {
        this.radius = Math.min(this.width, this.height) / 2 - this.margin.top; //calculer le rayon du donut en fonction de la largeur et de la hauteur du canvas
        //récupération de l'élément svg et ajout d'un groupe
        this.svg = d3.select(this.$refs.donut);
        // décalage du svg pour améliorer l'affichage
        this.svg = this.svg
          .append('g')
          .attr(
            'transform',
            `translate(${this.width / 2}, ${this.height / 2})`
          );
        this.renderSvg(); //lancer la création du graphique
      },
      renderSvg() {
        //création des cercles du donut
        const arc = d3
          .arc()
          .innerRadius(this.radius * 0.5)
          .outerRadius(this.radius * 0.8);
        const outerArc = d3
          .arc()
          .innerRadius(this.radius * 0.9)
          .outerRadius(this.radius * 0.9);
        // add color to the slices
        const color = d3
          .scaleOrdinal()
          .range(['#FE9430', '#FBB800', '#28965a', '#4099DD', '#DD4040']);
        //affect to a useable var for d3
        const radius = this.radius;

        this.svg = this.svg
          .selectAll('allSlices')
          .data(this.donut)
          .join('path')
          .attr('d', arc)
          .attr('fill', (d) => color(d.data[1]))
          .attr('stroke', 'white')
          .style('stroke-width', '2px');
        this.svg = this.svg
          .selectAll('allPolylines')
          .insert('polyline', ':first-child')
          .data(this.donut)
          .join('polyline')
          .attr('stroke', 'black')
          .style('fill', 'none')
          .attr('stroke-width', 1)
          .attr('points', function (d) {
            const posA = arc.centroid(d); // line insertion in the slice
            const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
            const posC = outerArc.centroid(d); // Label position = almost the same as posB
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            return [posA, posB, posC];
          });
        this.svg = this.svg
          .selectAll('allLabels')
          .data(this.donut)
          .join('text')
          .text((d) => d.data[0])
          .attr('transform', function (d) {
            const pos = outerArc.centroid(d);
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return `translate(${pos})`;
          })
          .style('text-anchor', function (d) {
            const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return midangle < Math.PI ? 'start' : 'end';
          });
      },
    },
  };
</script>

<style>
  .donut >>> rect.bar {
    fill: #009688;
  }
</style>
