<template>
  <section>

    <div class="alert alert-info value">
      <div class="flex-1">
          <b class="badge bg-info border-transparent">Expérience de Base</b>
          <span class="data-result">{{ pokemon.base_experience }}</span>
      </div>
    </div>

  </section>
</template>


<script>
import bidoof from "../assets/bidoof.json";

export default {
  name: "Value",
  data() {
    return {
      pokemon: bidoof,
    };
  },
};
</script>

<style scoped>
.value .flex-1{
  align-items: center;
}
</style>