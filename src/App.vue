<template>
  <div class="flex justify-center mt-10 ">
    <header>
      <language-select />
      <dark-mode />
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
      <button
        class="btn btn-sm"
        title="Utiliser ces données"
        @click="isBodyOpen = true"
        v-if="needBodyToSend"
      >
        Modifier Body
      </button>
      <RequestBody
        :needBodyToSend="needBodyToSend"
        v-show="isBodyOpen"
        @close="closing"
        @requestBodyContent="body = $event"
        class="container w-full md:w-screen
      max-w-screen-lg md:-mx-60"
      />
    </header>
  </div>
  <DiagramChoice @chart="displayChart" @cancel="isOpened" v-show="isOpen" />
  <button
    id="selectSchema"
    class="btn btn-circle btn-lg floating-btn"
    title="Utiliser ces données"
    @click="openModal"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
      />
    </svg>
  </button>
  <div class="response-container">
    <Response @launch-modal="isOpenByResponse" />
    <Chart v-if="isChartDisplayed" />
  </div>
</template>

<script>
import DarkMode from "./components/Dark-Mode.vue";
import SearchBar from "./components/SearchBar.vue";
import Response from "./components/Response.vue";
import CallApi from "./components/CallApi.vue";
import Chart from "./components/Charts/Chart.vue";
import RequestBody from "./components/RequestBody.vue";
import DiagramChoice from "./components/DiagramChoice.vue";
import LanguageSelect from "./components/LanguageSelect.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    Response,
    CallApi,
    DarkMode,
    Chart,
    RequestBody,
    DiagramChoice,
    LanguageSelect,
  },
  data() {
    return {
      query: "",
      body: "",
      chart: {},
      needBodyToSend: false,
      isOpen: false,
      isChartDisplayed: false,
      isBodyOpen: true,
    };
  },

  methods: {
    isOpenByResponse(payload) {
      this.isOpen = payload;
    },
    sendQuery(data) {
      this.query = data;
    },
    isOpened(payload) {
      this.isOpen = payload;
    },
    closing() {
      this.isBodyOpen = false;
    },
    openModal() {
      this.isOpen = true;
    },
    displayChart(payload) {
      // TODO: change for dynamic chart display
      if (payload.name === "curves") {
        this.isChartDisplayed = true;
        this.isOpen = false;
      }
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
.floating-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
}
#selectSchema {
  z-index: 99;
}
#selectSchema svg {
  pointer-events: none;
}
</style>
