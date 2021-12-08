<template>
  <div class="flex justify-center mt-10 ">
    <header>
      <SearchBar
        class="container w-full md:w-screen max-w-screen-lg md:-mx-60"
      />
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
