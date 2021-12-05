<template>
  <section>

    <div class="alert object" :class="`alert-${color}`">
      <div class="flex-1">
        <b class="badge border-transparent object-title" :class="`bg-${color}`">{{ name }}</b>
        <label class="object-value">
          <b class="badge border-transparent" :class="`bg-${color}`">Name</b>
          <span class="data-result">{{ data.forms.name }}</span>
        </label>
        <label class="object-value">
          <b class="badge border-transparent" :class="`bg-${color}`">Url</b>
          <span class="data-result">{{ data.forms.url }}</span>
        </label>
      </div>
    </div>

  </section>
</template>


<script>
export default {
  name: "Data",
  props: ['name','data', 'color']
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