<template>
  <section>
    <div class="alert array" :class="[`alert-${color}`, { selected: selected }, { 'array-over': selection }]" @mouseover="selection = true" @mouseout="selection = false">
      <div class="flex-1">
        <b class="badge border-transparent array-title tooltip" :class="`bg-${color}`" data-tip="Tableau">🗃 {{ name }}</b>
        <div class="array-content">
          <template v-for="(component, index) in components" :key="index">
            <component :is="components[index].component" :name="components[index].name" :data="components[index].data" :color="components[index].color">
            </component>
          </template>
        </div>
        <button class="btn btn-xs selection-data" id="select" v-show="selection" @click="selectData()">
          SELECT
        </button>
      </div>
    </div>
  </section>
</template>


<script>
import ValueComponent from "./Value.vue";
import ObjectComponent from "./Object.vue";
import ArrayComponent from "./Array.vue";
import Recursive from "../services/recursive.js";
import { markRaw } from "vue";

export default {
  name: "Array",
  props: ["name", "data", "color"],
  components: {
    ValueComponent,
    ObjectComponent,
    ArrayComponent,
  },
  data: () => ({
    selection: false,
    selected: false,
    components: [],
    comps: {
      ValueComponent: markRaw(ValueComponent),
      ObjectComponent: markRaw(ObjectComponent),
      ArrayComponent: markRaw(ArrayComponent),
    },
  }),
  created() {
    this.components = Recursive.recursive(this.data, this.comps);
  },
  methods: {
    selectData() {
      this.selected = !this.selected;
      console.log({
        key: this.name,
        value: this.data,
      });
    },
  },
};
</script>

<style>
.array-over {
  box-shadow: inset 0 0 0 2px rgba(98, 98, 98, 0.123);
  border-radius: 1.5rem;
}
.array .array-title {
  border-radius: 5px;
  text-transform: uppercase;
}
.array .flex-1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.array .flex-1 > span {
  display: block;
}
.array .array-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -0.5rem;
}
.array .array-container {
  position: relative;
}
.array .array-container:hover {
  box-shadow: inset 0 0 0 2px rgb(216, 216, 216);
}
.array .array-value {
  margin-bottom: 0.4rem;
}
</style>