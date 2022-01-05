<template>
  <div class="m-4">
    <header class="flex justify-center items-center">
      <img
        class="p-10"
        alt="Vue logo"
        src="./assets/color-logo.svg"
        width="150"
      />
      <SearchBar class="w-8/12" @query="sendQuery" />
      <dark-mode/>
    </header>

    <CallApi :query="query" />
    <Chart />
  </div>
</template>

<script>
import DarkMode from './components/Dark-Mode.vue';
import SearchBar from "./components/SearchBar.vue";
import CallApi from "./components/CallApi.vue";
import Chart from "./components/Chart.vue";


export default {
  name: "App",
  components: {
    SearchBar,
    CallApi,
    DarkMode,
    Chart
  },
  data() {
    return {
      query: "",
    };
  },

  methods: {
    sendQuery(data) {
      this.query = data;
    },
  },
};
</script>
