<template>
  <section>

      <div class="alert array" :class="`alert-${color}`">
        <div class="flex-1">
          <b class="badge border-transparent array-title tooltip" :class="`bg-${color}`" data-tip="Tableau">🗃 {{ name }}</b>
          <div class="array-content">

                <div class="alert array-container" :class="`alert-${color}`" v-for="(ability, index) in data.abilities" :key="ability.data" :data-id="index" >
                  <div class="flex-1">
                    <Value name="Name" :data="ability.ability.name === '' ? '(vide)' : ability.ability.name" color="error"/>
                    <Value name="URL" :data="ability.ability.url" color="error"/>
                  </div>
                </div>

          </div>
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
  props: ['name','data','color']
};
</script>

<style>
.array .array-title {
  border-radius: 5px;
  text-transform: uppercase;
}
.array .flex-1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.array .flex-1 > span {
  display: block;
}
.array .array-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -0.5rem;
}
.array .array-container {
  position: relative;
}
.array .array-container:hover {
  box-shadow: inset 0 0 0 2px rgb(255, 255, 255);
}
.array .array-container:hover::before {
  content: attr(data-id);
  position: absolute;
  top: 0;
  left: 0;
  padding: .2rem .5rem;
  background-color: rgb(255, 255, 255);
  color: black;
  border-radius: 5px;
  z-index: 15;
}
.array .array-value {
  margin-bottom: 0.4rem;
}
</style>