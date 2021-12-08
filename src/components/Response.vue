<template>
  <div class="response">
    <div class="alert alert-success">
      <div class="flex-1">
        <label
          ><span class="badge bg-success border-transparent">Etat</span> 200 :
          OK !</label
        >
      </div>
    </div>
    <div class="alert bg-base-200">
      <div class="result-container">
        <b>Resultats</b>
        <template v-for="(component, index) in components" :key="index">
          <component
            :is="component"
            :name="parameters[index].name"
            :data="parameters[index].data"
            :color="parameters[index].color"
            :isStandalone="parameters[index].isStandalone"
          >
          </component>
        </template>
        <!-- <ValueComponent
          name="Expérience de Base"
          :data="pokemon.base_experience"
          color="info"
          isStandalone="true"
        /> -->
        <!-- <ObjectComponent name="Form" :data="pokemon" color="warning" /> -->
        <ArrayComponent name="Abilities" :data="pokemon" color="error" />
      </div>
      <button @click="one_value">One Value</button>
    </div>
  </div>
</template>

<script>
import bidoof from "../assets/bidoof.json";
import ValueComponent from "./Value.vue";
import ObjectComponent from "./Object.vue";
import ArrayComponent from "./Array.vue";
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
      id: 1,
      pokemon: bidoof,
      components: [],
      parameters: [],
    };
  },
  methods: {
    one_value() {
      const json = Object.keys(this.pokemon);
      console.log(json);
      json.forEach((key) => {
        console.log(this.pokemon[key]);
        console.log(typeof this.pokemon[key]);
        if (
          typeof this.pokemon[key] === "string" ||
          typeof this.pokemon[key] === "number" ||
          typeof this.pokemon[key] === "boolean"
        ) {
          console.log("C'est une valeur unique");
          this.components.push(markRaw(ValueComponent));
          this.parameters.push({
            name: key,
            data: this.pokemon[key],
            color: "info",
            isStandalone: true,
          });
        } else if (typeof this.pokemon[key] === "object") {
          if (Array.isArray(this.pokemon[key])) {
            console.log("C'est un tableau");
            this.components.push(markRaw(ArrayComponent));
            this.parameters.push({
              name: key,
              data: this.pokemon[key],
              color: "warning",
              isStandalone: true,
            });
          } else {
            console.log("C'est un objet");
          }
        }
      });
    },
  },
};
</script>

<style>
.response ::selection {
  background-color: #afafaf;
  color: black;
}
.result-container {
  display: flex;
  flex-direction: column;
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
