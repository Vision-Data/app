<template>
  <section class="value-line" :class="{ 'value-over': selection }" @mouseover="selection = true" @mouseout="selection = false">
    <div class="alert value" :class="[`alert-${color}`, { selected: selected }]" v-if="isStandalone">
      <div class="flex-1">
        <b class="badge border-transparent value-name" :class="`bg-${color}`" v-if="name !== ''">{{ name }}</b>

        <span class="data-result" :class="{ 'italic': dataValue === '(vide)' || dataValue === '' }">{{ dataValue === '' ? '(vide)' : dataValue }}</span>
        <button class="btn btn-xs selection-data" id="select" v-show="selection" @click="selectData()">
          SELECT
        </button>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  name: "Value",
  props: ["name", "data", "color", "isStandalone"],
  data: () => ({
    dataValue: "",
    selection: false,
    selected: false,
  }),
  created() {
    this.dataValue = this.data;
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

<style scoped>

.array-content > .value-line  > .value > .flex-1 > .value-name {
  display: none;
}

.response *:not(.result-container):not(.array-content) > .value-line > .alert.value {
  background: none;
  padding: 0;
}

.selected-value {
  box-shadow: inset 0 0 0 1px rgb(173, 173, 173);
  border-radius: 0.5rem;
  background-color: rgba(110, 110, 110, 0.05);
}

.alert .value:not(.selected-value):not(.selected) {
  color: rgb(104, 104, 104);
}
.value-line {
  border-radius: 0.5rem;
}
.value {
  position: relative;
}
.value-over .value.notstandalone {
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
.value.notstandalone {
  margin-bottom: 0.6rem;
  padding: 0.5rem;
}
</style>