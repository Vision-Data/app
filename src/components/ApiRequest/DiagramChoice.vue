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
        <label for="my-modal-2" class="btn" @click="cancel">{{
          'Annuler'
        }}</label>
        <label for="my-modal-2" class="btn btn-primary" @click="selectChart">{{
          'Selectionner'
        }}</label>
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
            name: 'Donut',
            image: 'donut',
            ref: 'donut',
          },
          {
            name: 'Courbes',
            image: 'curves',
            ref: 'curves',
          },
        ],
      };
    },
    methods: {
      cancel() {
        this.$emit('cancel', false);
      },
      selectChart() {
        this.$store.dispatch('setChart', {
          chart: this.diagrams[this.current].ref,
        });
        this.$emit('chart', { name: this.diagrams[this.current].ref });
      },
    },
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
  [data-theme='dark'] .modal-item:hover {
    background-color: #4e5666;
  }
  .modal-item img {
    width: 6rem;
    height: 6rem;
    object-fit: contain;
  }
  .modal-item.active {
    border: 2px solid black;
  }
</style>
