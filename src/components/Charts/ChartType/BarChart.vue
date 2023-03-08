<template>
  <div ref="chart">
    <svg width="500" height="300"></svg>
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
      };
    },
    mounted() {
      const storage = JSON.parse(
        JSON.stringify(this.$store.state.selectedData.x)
      );
      +storage.forEach((element) => {
        this.data.push({ name: element.key, value: element.value });
      });
      this.drawChart();
    },
    methods: {
      drawChart() {
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = this.width - margin.left - margin.right;
        const height = this.height - margin.top - margin.bottom;

        const svg = d3
          .select(this.$refs.chart)
          .append('svg')
          .attr('width', this.width)
          .attr('height', this.height)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3
          .scaleBand()
          .range([0, width])
          .padding(0.1)
          .domain(this.data.map((d) => d.name));

        const y = d3
          .scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(this.data, (d) => d.value)]);

        svg
          .append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x));

        svg.append('g').call(d3.axisLeft(y));

        svg
          .selectAll('.bar')
          .data(this.data)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', (d) => x(d.name))
          .attr('y', (d) => y(d.value))
          .attr('width', x.bandwidth())
          .attr('height', (d) => height - y(d.value))
          .attr('fill', 'steelblue')
          .on('mouseover', function () {
            d3.select(this).attr('fill', '#1e90ff');
          })
          .on('mouseout', function () {
            d3.select(this).attr('fill', 'steelblue');
          });

        svg
          .selectAll('.text')
          .data(this.data)
          .enter()
          .append('text')
          .attr('class', 'text')
          .attr('text-anchor', 'middle')
          .attr('x', (d) => x(d.name) + x.bandwidth() / 2)
          .attr('y', (d) => y(d.value) - 5)
          .text((d) => d.value);
      },
    },
  };
</script>

<style>
  .bar {
    fill: steelblue;
  }
</style>
