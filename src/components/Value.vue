<template>
  <section>

    <div class="alert value" :class="`alert-${color}`" v-if="isStandalone">
      <div class="flex-1">
          <b class="badge border-transparent" :class="`bg-${color}`">{{ name }}</b>
          <span class="data-result">{{ data }}</span>
      </div>
    </div>
    <div class="value standalone" v-else>
        <b class="badge border-transparent" :class="`bg-${color}`">{{ name }}</b>
        <span class="data-result">{{ data }}</span>
    </div>

  </section>
</template>


<script>
export default {
  name: "Value",
  props: ['name','data','color', 'isStandalone']
};
</script>

<style scoped>
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