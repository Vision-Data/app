<template>
  <section
    :class="{ 'array-over': selection }"
    @mouseover="selection = true"
    @mouseout="selection = false"
  >
    <div class="alert array" :class="[`alert-${color}`,{'selected': selected}]">
      <div class="flex-1">
        <b
          class="badge border-transparent array-title tooltip"
          :class="`bg-${color}`"
          data-tip="Tableau"
          >🗃 {{ name }}</b
        >
        <div class="array-content">
          <div
            class="alert array-container"
            :class="[`alert-${color}`,{'selected': selected}]"
            v-for="(elt, index) in data"
            :key="index"
            :data-id="index"
          >
            <div class="flex-1">
              <Value
                :name="index"
                :data="elt === '' ? '(vide)' : elt"
                color="error"
                isFromArray="true"
              />
            </div>
          </div>
        </div>
        <button
          class="btn btn-xs selection-data"
          id="select"
          v-show="selection"
          @click="selectData()"
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
    selected: false
  }),
  methods: {
    selectData() {
      this.selected = !this.selected;
      console.log({
        key:this.name,
        value:this.data
      })
    }},
  props: ["name", "data", "color"],
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
.array .array-container:hover::before {
  content: attr(data-id);
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.2rem 0.5rem;
  background-color: rgb(216, 216, 216);
  color: black;
  border-radius: 5px;
  z-index: 15;
}
.array .array-value {
  margin-bottom: 0.4rem;
}
</style>