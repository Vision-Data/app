<template>
  <section
    class="value-line"
    :class="{ 'value-over': selection }"
    @mouseover="selection = true"
    @mouseout="selection = false"
  >
    <div class="alert value" :class="[`alert-${color}`,{'selected': selected}]" v-if="isStandalone">
      <div class="flex-1">
        <b class="badge border-transparent" :class="`bg-${color}` " v-if="isKeyHidden()">{{
          name
        }}</b>
          
        <span class="data-result">{{ data }}</span>
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
    <div class="value standalone" :class="{'selected-value': selected}" v-else>
      <b class="badge border-transparent" :class="`bg-${color}`" v-if="isKeyHidden()">{{ name }}</b>
      <span class="data-result">{{ data }}</span>
      <button
        class="btn btn-xs selection-data"
        id="select"
        v-show="selection"
        @click="selectData()"
      >
        SELECT
      </button>
    </div>
  </section>
</template>


<script>
export default {
  name: "Value",
  props: ["name", "data", "color", "isStandalone", "isFromArray"],
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
    },
    isKeyHidden() {
      return this.isFromArray && typeof this.data !== "object" ? false : true
    }
  },
};
</script>

<style scoped>
.selected-value {
  border: 3px solid rgb(124, 185, 32);
  border-radius: .5rem;
}
.value-line {
  width: 100%;
  border-radius: 0.5rem;
}
.value {
  position: relative;
}
.value-over .value.standalone {
  background-color: rgba(110, 110, 110, 0.05);
}
.value .flex-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.value b {
  text-transform: uppercase;
}
.value.standalone {
  margin-bottom: 0.6rem;
}
</style>