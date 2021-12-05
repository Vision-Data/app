<template>
  <section>

    <div class="alert object" :class="`alert-${color}`">
      <div class="flex-1">
        <b class="badge border-transparent object-title tooltip" :class="`bg-${color}`" data-tip="Objet">📕 {{ name }}</b>
        <Value name="Name" :data="data.forms.name" color="warning"/>
        <Value name="URL" :data="data.forms.url" color="warning"/>
      </div>
    </div>

  </section>
</template>


<script>
import Value from "./Value.vue";

export default {
  name: "Data",
  components: {
    Value
  },
  props: ['name','data', 'color']
};
</script>

 <style scoped>
.object .object-title {
  border-radius: 5px;
  position: relative;
  top: -1rem;
  left: -1rem;
  text-transform: uppercase;
}
.object .flex-1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>