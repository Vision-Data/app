<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <div class="modal-list">
        <div
          v-for="(diagram, i) in diagrams"
          :key="diagram.ref"
          class="modal-item"
          :class="{ active: i == current }"
          role="button"
          tabindex="0"
          @click="current = i"
          @keypress.enter="current = i"
        >
          <img :src="require(`@/assets/${diagram.image}.png`)" alt="" />
          <p>{{ diagram.name }}</p>
        </div>
      </div>
      <div class="modal-action">
        <Button @click="cancel">Annuler</Button>
        <Button class="btn-primary" @click="selectChart">Sélectionner</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import Button from '../Commons/Form/Button.vue';

  export default {
    name: 'DiagramChoice',
    components: {
      Button,
    },
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
          {
            name: 'Barres',
            image: 'bars',
            ref: 'bars',
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
