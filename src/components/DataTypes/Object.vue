<template>
  <section>
    <div
      class="alert object"
      :data-identifier="identifier"
      :class="[
        `alert-${color}`,
        { selected: selected },
        { 'object-over': selection },
      ]"
      role="button"
      tabindex="0"
      @mouseover="selection = true"
      @focus="selection = true"
      @mouseout="selection = false"
      @blur="selection = false"
    >
      <div class="flex-1">
        <b
          class="badge border-transparent object-title tooltip"
          :class="`bg-${color}`"
          data-tip="Objet"
          >📕 {{ name }}</b
        >
        <template v-for="(component, index) in components" :key="index">
          <component
            :is="components[index].component"
            :name="components[index].name"
            :data="components[index].data"
            :color="components[index].color"
            :is-parent-selected="selected"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script>
  import ValueComponent from './Value.vue';
  import ObjectComponent from './Object.vue';
  import ArrayComponent from './Array.vue';
  import Recursive from '../../services/recursive.js';
  import { markRaw } from 'vue';

  export default {
    name: 'Object',
    components: {
      ValueComponent,
      ObjectComponent,
      ArrayComponent,
    },
    props: ['name', 'data', 'color', 'isParentSelected'],
    data: () => ({
      identifier: null,
      selection: false,
      selected: false,
      components: [],
      comps: {
        ValueComponent: markRaw(ValueComponent),
        ObjectComponent: markRaw(ObjectComponent),
        ArrayComponent: markRaw(ArrayComponent),
      },
    }),
    watch: {
      isParentSelected: {
        immediate: true,
        handler(val, oldVal) {
          if (!oldVal && val) this.selected = true;
          else this.selected = false;
        },
      },
    },
    async created() {
      this.components = Recursive.recursive(this.data, this.comps);
      this.identifier = await this.$store.dispatch('giveIdentifier');
    },
  };
</script>

<style scoped>
  .object-over {
    box-shadow: inset 0 0 0 2px rgba(98, 98, 98, 0.123);
    border-radius: 1rem;
  }
  .object .object-title {
    border-radius: 5px;
    position: relative;
    top: -1rem;
    left: -1rem;
    text-transform: uppercase;
  }
  .object .flex-1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
