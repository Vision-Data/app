<template>
  <section class="value-line" >
    <div class="alert value" :class="[`alert-${color}`, { selected: selected }, { 'value-over': selection }]" @mouseover="selection = true" @mouseout="selection = false">
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
  props: ["name", "data", "color"],
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

.selected {
  box-shadow: inset 0 0 0 2px rgb(88, 88, 88);
  border-radius: 1rem;
}

.result-container > section > .alert-info,
.alert-info .alert.selected {
  box-shadow: inset 0 0 0 2px hsl(var(--in));
  background-color: hsla(var(--in)/0.2);
}

.result-container > section > .alert-error,
.alert-error .alert.selected {
  box-shadow: inset 0 0 0 2px hsl(var(--er));
  background-color: hsla(var(--er)/0.2);
}
.result-container > section > .alert-warning,
.alert-warning .alert.selected {
  box-shadow: inset 0 0 0 2px hsl(var(--wa));
  background-color: hsla(var(--wa)/0.2);
}




.value-line {
  border-radius: 0.5rem;
}
.value {
  position: relative;
}
.value .flex-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.value b {
  text-transform: uppercase;
}
</style>