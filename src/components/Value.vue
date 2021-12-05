<template>
  <section class="value-line" :class="{ 'value-over': selection}" @mouseover="selection = true" @mouseout="selection = false">

    <div class="alert value" :class="`alert-${color}`" v-if="isStandalone">
      <div class="flex-1">
          <b class="badge border-transparent" :class="`bg-${color}`">{{ name }}</b>
          <span class="data-result">{{ data }}</span>
          <button class="btn btn-xs selection-data" id="select" v-show="selection">SELECT</button>
      </div>
    </div>
    <div class="value standalone" v-else>
        <b class="badge border-transparent" :class="`bg-${color}`">{{ name }}</b>
        <span class="data-result">{{ data }}</span>
        <button class="btn btn-xs selection-data" id="select" v-show="selection">SELECT</button>
    </div>

  </section>
</template>


<script>
export default {
  name: "Value",
  props: ['name','data','color', 'isStandalone'],
  data: ()=>({
    selection: false
  }),
};
</script>

<style scoped>
.value-line {
  width: 100%;
  border-radius: .5rem;
}
.value {
  position: relative;
}
.value-over .value.standalone {
  background-color: rgba(110, 110, 110, 0.05);
}
.value .flex-1{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.value b {
  text-transform: uppercase;
}
.value.standalone {
  margin-bottom: .6rem;
}
</style>