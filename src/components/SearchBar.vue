<template>
  <div class="searchbar">
    <input
      v-model="request"
      id="input_url"
      placeholder="https://api.example.com/v1
"
    />
  </div>
</template>

<script>
export default { name: "SearchBar", request: "" };
</script>

<style scoped>
.searchbar {
  width: 100%;
}
#input_url {
  width: 40vw;
  height: 4em;
}
</style>
