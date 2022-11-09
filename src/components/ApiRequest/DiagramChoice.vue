<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <div class="modal-list">
        <div
          v-for="(diagram, i) in diagrams"
          :key="diagram.ref"
          class="modal-item"
          :class="{ active: i == current }"
          @click="current = i"
        >
          <img :src="require(`@/assets/${diagram.image}.png`)" alt="" />

          <p>{{ diagram.name }}</p>
        </div>
      </div>

      <div class="modal-action">
        <label for="my-modal-2" class="btn" @click="cancel">
          {{ $t('diagramChoice.cancelButton') }}
        </label>

        <label for="my-modal-2" class="btn btn-primary" @click="selectChart">
          {{ $t('diagramChoice.selectButton') }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiagramChoice',
  emits: ['cancel', 'chart'],
  data() {
    return {
      current: null,
      diagrams: [
        {
          name: this.$t('diagramChoice.donutDiagram'),
          image: 'donut',
          ref: 'donut'
        },
        {
          name: this.$t('diagramChoice.curvesDiagram'),
          image: 'curves',
          ref: 'curves'
        },
        {
          name: this.$t('diagramChoice.barsDiagram'),
          image: 'bars',
          ref: 'bars'
        },
        {
          name: this.$t('diagramChoice.mapDiagram'),
          image: 'map',
          ref: 'map'
        }
      ]
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel', false);
    },
    diagramName(number) {
      return this.$$t('diagramChoice'[number]);
    },
    selectChart() {
      this.$emit('chart', { name: this.diagrams[this.current].ref });
    }
  }
};
</script>

<style scoped>
.modal-list {
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: center;
}
.modal-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.5rem;
  width: 100%;
}
.modal-item:hover {
  background-color: #f5f5f5;
}
.modal-item img {
  width: 6rem;
  height: 6rem;
  object-fit: contain;
}

/* TODO: remove css temporary */
.modal-item:nth-child(4),
.modal-item:nth-child(2n + 1) {
  opacity: 0.4;
}
.modal-item.active {
  border: 2px solid black;
}
</style>
