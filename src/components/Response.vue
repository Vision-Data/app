<template>
  <div class="response">
    <div class="alert alert-success">
      <div class="flex-1">
        <label><span class="badge bg-success border-transparent">Etat</span> 200 : OK !</label>
      </div>
    </div>
    <div class="alert bg-base-200">
      <div class="result-container">
        <b>Resultats</b>
        <Value name="Expérience de Base" :data="pokemon.base_experience" color="info" isStandalone="true"/>
        <Object name="Form" :data="pokemon" color="warning"/>
        <Array name="Abilities" :data="pokemon" color="error"/>
      </div>
    </div>

  </div>
</template>

<script>
import bidoof from "../assets/bidoof.json";
import Value from "./Value.vue";
import Object from "./Object.vue";
import Array from "./Array.vue"

export default {
  name: "Response",
  components: {
    Value,
    Object,
    Array
  },
  data() {
    return {
      id: 1,
      pokemon: bidoof
    };
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
  margin-right: .8rem;
}
.data-result {
  font-weight: bold;
  flex: 1;
}
</style>
