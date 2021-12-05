<template>
  <section>

    <div class="alert value" :class="`alert-${color}`">
      <div class="flex-1">
          <b class="badge border-transparent" :class="`bg-${color}`">{{ name }}</b>
          <span class="data-result">{{ data.base_experience }}</span>
      </div>
    </div>

  </section>
</template>


<script>
export default {
  name: "Value",
  props: ['name','data','color']
};
</script>

<style scoped>
.value .flex-1{
  align-items: center;
}
</style>