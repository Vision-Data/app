<template>
  <div class="response">
    <div class="alert alert-success">
      <div class="flex-1">
        <label><span class="badge bg-success border-transparent">Etat</span> 200 :
          OK !</label>
      </div>
    </div>
    <div class="alert bg-base-200">
      <div class="result-container">
        <b>Resultats</b>
        <template v-for="(component, index) in components" :key="index">
          <component :is="components[index].component" :name="components[index].name" :data="components[index].data" :color="components[index].color">
          </component>
        </template>
      </div>
      <button @click="parseData">Show Data</button>
    </div>
  </div>
</template>

<script>
import ValueComponent from "./Value.vue";
import ObjectComponent from "./Object.vue";
import ArrayComponent from "./Array.vue";
import Recursive from "../services/recursive.js";
import { markRaw } from "vue";

export default {
  name: "Response",
  components: {
    ValueComponent,
    ObjectComponent,
    ArrayComponent,
  },
  data() {
    return {
      responseData: this.$store.state.response,
      components: [],
      comps: {
        ValueComponent: markRaw(ValueComponent),
        ObjectComponent: markRaw(ObjectComponent),
        ArrayComponent: markRaw(ArrayComponent),
      },
    };
  },
  methods: {
    parseData() {
      this.components = Recursive.recursive(this.responseData, this.comps);
    },
  }
};
</script>

<style>
.selected {
  --tw-bg-opacity: 0.4 !important;
}
.alert.selected {
  color: rgb(77, 77, 77);
}
.value:not(.selected):not(.selected-value) {
  color: rgb(78, 78, 78) !important;
}
.response *::selection {
  background-color: #414141 !important;
  color: rgb(255, 255, 255) !important;
}
.result-container {
  display: flex;
  flex-direction: column;
}
.result-container .object > .flex-1 > .value-line > .alert{
  margin: 2px;
  padding: 10px!important;

}
.selection-data {
  position: absolute;
  top: 0;
  right: 0;
}
.alert {
  margin: 10px;
}
.alert label {
  max-width: 24rem;
  overflow-wrap: break-word;
}
.alert .flex-1 {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  align-items: flex-start;
}
.badge {
  margin-right: 0.8rem;
}
.data-result {
  font-weight: bold;
  flex: 1;
}
</style>
