<template>
  <img alt="Vue logo" src="./assets/color-logo.svg" width="200" />

  <HelloWorld msg="Vision, l'application de visualisation de données ! :]" />
  <SearchBar />
  <CallApi />
</template>

<script>
import SearchBar from "./components/SearchBar.vue";
import HelloWorld from "./components/HelloWorld.vue";
import CallApi from "./components/CallApi.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    HelloWorld,
    CallApi
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
