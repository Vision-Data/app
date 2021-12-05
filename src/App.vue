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
      <dark-mode/>
    </header>
  </div>
</template>

<script>
import DarkMode from './components/Dark-Mode.vue';
import SearchBar from "./components/SearchBar.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    DarkMode,
  },
};
</script>
