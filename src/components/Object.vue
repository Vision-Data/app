<template>
  <section>

    <div class="alert alert-warning object">
      <div class="flex-1">
        <b class="badge bg-warning border-transparent object-title">Form</b>
        <label class="object-value">
          <b class="badge bg-warning border-transparent">Name</b>
          <span class="data-result">{{ pokemon.forms.name }}</span>
        </label>
        <label class="object-value">
          <b class="badge bg-warning border-transparent">Url</b>
          <span class="data-result">{{ pokemon.forms.url }}</span>
        </label>
      </div>
    </div>

  </section>
</template>


<script>
import bidoof from "../assets/bidoof.json";

export default {
  name: "Data",
  data() {
    return {
      pokemon: bidoof,
    };
  },
};
</script>

 <style scoped>
.object .object-title {
  border-radius: 5px;
  position: relative;
  top: -1rem;
  left: -1rem;
}
.object .flex-1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.object-value {
  margin-bottom: 0.4rem;
}
</style>