<template>
  <Button class="ml-2" @click="isOpen = true">Exporter le schéma</Button>

  <Modal
    :is-open="isOpen"
    title="Nom du schéma"
    close-label="Enregistrer"
    @close="isOpen = false"
  >
    <label for="chart-name">
      <input
        id="chart-name"
        v-model="chartTitle"
        type="text"
        class="input input-bordered w-full max-w-xs"
        placeholder="Ex: Répartition de la population en France"
    /></label>
  </Modal>
</template>

<script setup>
  import Button from '../../Commons/Form/Button.vue';
  import Modal from '../../Commons/Modal.vue';
  import { ref, watch } from 'vue';

  const isOpen = ref(false);
  const chartTitle = ref(null);

  const props = defineProps({
    chartType: {
      type: String,
      required: true,
    },
  });

  watch([chartTitle, isOpen], ([newChartTitle, newIsOpen]) => {
    const chartExport = {
      curves: {
        selector: '.ct-chart-line svg',
        width: 600,
        height: 300,
      },
      donut: {
        selector: '.donut-container svg',
        width: 480,
        height: 440,
      },
      bars: {
        selector: '.bar-container svg',
        width: 500,
        height: 300,
      },
    };

    if (newChartTitle !== null && !newIsOpen) {
      const chart = document.querySelector(
        chartExport[props.chartType].selector
      );

      /*global svgExport*/
      /*eslint no-undef: "error"*/
      svgExport.downloadPdf(chart, newChartTitle, {
        width: chartExport[props.chartType].width,
        height: chartExport[props.chartType].height,
      });

      chartTitle.value = null;
    }
  });
</script>
