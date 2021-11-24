<template>
  <div class="m-4">
    <header class="flex justify-center items-center">
      <img
        class="p-10"
        alt="Vue logo"
        src="./assets/color-logo.svg"
        width="150"
      />
      <SearchBar class="w-8/12" />
    </header>
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar.vue";

export default {
  name: "App",
  components: {
    SearchBar,
  },
};
</script>
