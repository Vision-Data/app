<template>
  <div class="flex justify-center mt-10 ">
    <header>
      <SearchBar
        class="container w-full md:w-screen max-w-screen-lg md:-mx-60"
        @query="sendQuery"
      />
      <dark-mode/>
      <CallApi :query="query" />
    </header>

    <Chart />
      <Response />
  </div>
</template>

<script>
import DarkMode from './components/Dark-Mode.vue';
import SearchBar from "./components/SearchBar.vue";
import Response from "./components/Response.vue";
import CallApi from "./components/CallApi.vue";
import Chart from "./components/Chart.vue";


export default {
  name: "App",
  components: {
    SearchBar,
    Response,
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
