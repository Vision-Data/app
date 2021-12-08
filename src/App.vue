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
    </header>

    <CallApi :query="query" />
  </div>
</template>

<script>
import SearchBar from "./components/SearchBar.vue";
import CallApi from "./components/CallApi.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    CallApi,
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
