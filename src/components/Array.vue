<template>
  <section>

      <div class="alert array" :class="`alert-${color}`">
        <div class="flex-1">
          <b class="badge border-transparent array-title" :class="`bg-${color}`">{{ name }}</b>
          <div class="array-content">

                  <div class="alert array-container" :class="`alert-${color}`" v-for="(ability, index) in data.abilities" :key="ability.data" :data-id="index" >
                    <div class="flex-1">
                      <label class="array-value">
                        <b class="badge border-transparent" :class="`bg-${color}`">Name</b>
                        <span class="data-result">{{ ability.ability.name === "" ? "(vide)" : ability.ability.name }}</span>
                      </label>
                      <label class="array-value">
                        <b class="badge border-transparent" :class="`bg-${color}`">URL</b>
                        <span class="data-result">{{ ability.ability.url }}</span>
                      </label>
                    </div>
                  </div>

          </div>
        </div>
      </div>

  </section>
</template>


<script>
export default {
  name: "Data",
  props: ['name','data','color']
};
</script>

<style>
.array .array-title {
  border-radius: 5px;
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
  box-shadow: inset 0 0 0 2px rgb(211, 211, 211);
}
.array .array-container:hover::before {
  content: attr(data-id);
  position: absolute;
  top: 0;
  left: 0;
  padding: .2rem .5rem;
  background-color: rgb(195, 195, 195);
  color: black;
  border-radius: 5px;
  z-index: 15;
}
.array .array-value {
  margin-bottom: 0.4rem;
}
</style>