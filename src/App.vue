<template>
  <div class="flex justify-center mt-10 ">
    <header>
      <SearchBar
        class="container w-full md:w-screen max-w-screen-lg md:-mx-60"
        @query="sendQuery"
      />
      <CallApi
        :query="query"
        @detectChoice="needBodyToSend = $event"
        :body="body"
      />
      <RequestBody
        :needBodyToSend="needBodyToSend"
        @requestBodyContent="body = $event"
        class="container w-full md:w-screen
      max-w-screen-lg md:-mx-60"
      />
      <dark-mode />
    </header>
  </div>
</template>

<script>
import DarkMode from "./components/Dark-Mode.vue";
import SearchBar from "./components/SearchBar.vue";
import CallApi from "./components/CallApi.vue";
import RequestBody from "./components/RequestBody.vue";
export default {
  name: "App",
  components: {
    SearchBar,
    CallApi,
    DarkMode,
    RequestBody,
  },
  data() {
    return {
      query: "",
      body: "",
      needBodyToSend: false,
    };
  },

  methods: {
    sendQuery(data) {
      this.query = data;
    },
  },
};
</script>
