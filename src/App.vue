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
      <Response />
  </div>
</template>

<script>
import DarkMode from './components/Dark-Mode.vue';
import SearchBar from "./components/SearchBar.vue";
import Response from "./components/Response.vue";
import CallApi from "./components/CallApi.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    Response,
    CallApi,
    DarkMode,
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
