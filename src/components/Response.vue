<template>
  <div class="response">
    <div class="alert alert-success">
      <div class="flex-1">
        <label><span class="badge bg-success border-transparent">Etat</span> 200 : OK !</label>
      </div>
    </div>
    <div class="alert">
      <div class="result-container">
        <b>Resultats</b>
        <Value />
        <Object/>
        <Array/>
      </div>
    </div>

  </div>
</template>

<script>
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
    };
  },
};
</script>

<style>
.result-container {
  display: flex;
  flex-direction: column;
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
}
</style>
