<template>
  <section
    :class="{ 'object-over': selection }"
    @mouseover="selection = true"
    @mouseout="selection = false"
  >
    <div class="alert object" :class="`alert-${color}`">
      <div class="flex-1">
        <b
          class="badge border-transparent object-title tooltip"
          :class="`bg-${color}`"
          data-tip="Objet"
          >📕 {{ name }}</b
        >
        <Value
          :name="index"
          :data="elt"
          color="error"
          v-for="(elt, index) in data"
          :key="index"
        />
        <button
          class="btn btn-xs selection-data"
          id="select"
          v-show="selection"
        >
          SELECT
        </button>
      </div>
    </div>
  </section>
</template>


<script>
import Value from "./Value.vue";

export default {
  name: "Data",
  components: {
    Value,
  },
  data: () => ({
    selection: false,
  }),
  props: ["name", "data", "color"],
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