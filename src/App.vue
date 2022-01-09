<template>
  <div class="flex justify-center mt-10 ">
    <header>
      <div class="sending-container">
        <SearchBar
          class="container w-full max-w-screen-lg"
          @query="sendQuery"
        />
        <CallApi
          :query="query"
          @detectChoice="needBodyToSend = $event"
          :body="body"
        />
      </div>
      <RequestBody
        :needBodyToSend="needBodyToSend"
        @requestBodyContent="body = $event"
        class="container w-full md:w-screen
      max-w-screen-lg md:-mx-60"
      />
      <dark-mode />
    </header>
  </div>
  <div class="response-container">
    <Response />
    <Chart />
  </div>
</template>

<script>
import DarkMode from "./components/Dark-Mode.vue";
import SearchBar from "./components/SearchBar.vue";
import Response from "./components/Response.vue";
import CallApi from "./components/CallApi.vue";
import Chart from "./components/Charts/Chart.vue";
import RequestBody from "./components/RequestBody.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    Response,
    CallApi,
    DarkMode,
    Chart,
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

<style scoped>
.response-container {
  display: flex;
}
.sending-container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex-wrap: wrap;
}
.sending-container > .form-control {
  min-width: 500px;
  max-width: 700px;
  margin-right: 2rem;
}
.sending-container > .select {
  margin-top: 1rem;
  padding-left: 0;
}
header {
  width: 100%;
  margin: 1rem;
}
</style>