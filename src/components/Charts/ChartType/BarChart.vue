<template>
  <div class="bar-container">
    <svg
      ref="bar"
      class="barchart"
      :height="margin.bottom + height + margin.top"
      :width="margin.right + width + margin.left"
    ></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'; //importation de d3 pour utiliser la librairie
  export default {
    name: 'BarChart',
    data() {
      return {
        width: 500,
        height: 300,
        barPadding: 5,
        data: [],
        svg: null,
        x: null,
        y: null,
        margin: { top: 20, right: 20, bottom: 30, left: 40 },
      };
    },
    watch: {
      data: {
        handler(newValue, oldValue) {
          if (newValue !== oldValue) {
            this.initChart();
          }
        },
        deep: true,
      },
    },
    mounted() {
      const storage = JSON.parse(
        JSON.stringify(this.$store.state.selectedData.x)
      );
      this.data = storage.length === 0 ? [1] : storage;
      storage.forEach((element) => {
        this.data.push({ name: element.key, value: element.value });
      });
      this.unwatchX = this.$store.watch(
        (state) => state.selectedData.x,
        (newValue) => {
          this.data = newValue;
        }
      );
      this.initChart();
    },
    computed: {
      bar() {
        const x = d3
          .scaleBand()
          .range([0, this.width])
          .padding(0.1)
          .domain(this.data.map((d) => d.name));
        const y = d3
          .scaleLinear()
          .range([this.height, 0])
          .domain([0, d3.max(this.data, (d) => d.value)]);
        return { x, y };
      },
    },
    methods: {
      initChart() {
        this.svg = d3.select(this.$refs.bar);

        this.svg = this.svg
          .append('g')
          .attr(
            'transform',
            `translate(${this.margin.left},${this.margin.top})`
          );
        this.drawChart();
      },
      drawChart() {
        const width = this.width - this.margin.left - this.margin.right;
        const height = this.height - this.margin.top - this.margin.bottom;

        const x = d3
          .scaleBand()
          .range([0, width])
          .domain(this.data.map((d) => d.name))
          .padding(0.1);
        this.svg = this.svg
          .append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x));

        const y = d3
          .scaleLinear()
          .domain([0, d3.max(this.data, (d) => d.value)])
          .range([0, -height]);
        this.svg = this.svg.append('g').call(d3.axisLeft(y));

        // this.svg = this.svg
        //   .selectAll('.bar')
        //   .data(this.data)
        //   .enter()
        //   .append('rect')
        //   .attr('class', 'bar')
        //   .attr('x', (d) => x(d.name))
        //   .attr('y', (d) => y(d.value))
        //   .attr('width', x.bandwidth())
        //   .attr('height', (d) => height - y(d.value))
        //   .attr('fill', 'steelblue');

        // this.svg = this.svg
        //   .selectAll('.text')
        //   .data(this.data)
        //   .enter()
        //   .append('text')
        //   .attr('class', 'text')
        //   .attr('text-anchor', 'middle')
        //   .attr('x', (d) => x(d.name) + x.bandwidth() / 2)
        //   .attr('y', (d) => y(d.value) - 5)
        //   .text((d) => d.value);
      },
    },
  };
</script>

<style>
  .bar {
    fill: steelblue;
  }
</style>
