<template>
  <div class="workspace">
    <Menu v-if="$store.getters.isLogin" />
    <div class="workspace-body">
      <div class="flex justify-center mt-10">
        <header>
          <div class="workspace-head">
            <language-select />
            <div class="save" v-if="$store.getters.isLogin">
              <button class="btn btn-secondary">
                <img
                  id="save"
                  :src="require(`@/assets/save.svg`)"
                  alt="icon-save"
                />
                <span>Sauvegarder la requête</span>
              </button>
            </div>
          </div>
          <dark-mode />
          <div class="sending-container">
            <ApiUrl
              class="container w-full max-w-screen-lg"
              @query="query = $event"
            />
            <SelectHttpMethod
              :query="query"
              @detectChoice="choice = $event"
              :body="body"
            />
            <Button
              class="btn-primary runButton"
              :isLoading="isLoading"
              @click="fetchData()"
              >{{ $t("searchbarTooltip.runButton") }}
            </Button>
          </div>
          <Button
            class="btn-sm mt-2"
            v-if="needBodyToSend()"
            @click="isBodyOpen = true"
          >
            Modifier Body
          </Button>
          <RequestBody
            :needBodyToSend="needBodyToSend()"
            v-show="isBodyOpen"
            @close="closing"
            @requestBodyContent="body = $event"
            class="container w-full md:w-screen max-w-screen-lg md:-mx-60"
          />
        </header>
      </div>
      <DiagramChoice @chart="displayChart" @cancel="isOpened" v-show="isOpen" />
      <Button
        id="selectSchema"
        class="btn-circle btn-lg floating-btn"
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
      </Button>
      <div class="response-container">
        <Response @launch-modal="isOpenByResponse" />
        <Chart v-if="isChartDisplayed" />
      </div>
    </div>
  </div>
</template>

<script>
import DarkMode from "../components/Commons/DarkMode.vue";
import ApiUrl from "../components/ApiRequest/ApiUrl.vue";
import Response from "../components/ApiRequest/Response.vue";
import SelectHttpMethod from "../components/ApiRequest/SelectHttpMethod.vue";
import Chart from "../components/Charts/Chart.vue";
import RequestBody from "../components/ApiRequest/RequestBody.vue";
import DiagramChoice from "../components/ApiRequest/DiagramChoice.vue";
import LanguageSelect from "../components/Commons/LanguageSelect.vue";
import Menu from "../components/Menu.vue";
import Button from "../components/Commons/Form/Button.vue";

import makeRequest from "../services/api-request.js";

export default {
  name: "Home",
  components: {
    ApiUrl,
    Response,
    SelectHttpMethod,
    DarkMode,
    Chart,
    RequestBody,
    DiagramChoice,
    LanguageSelect,
    Button,
    Menu,
  },
  data() {
    return {
      query: "",
      body: "",
      choice: "GET",
      chart: {},
      isOpen: false,
      isChartDisplayed: false,
      isBodyOpen: true,
      isLoading: false,
    };
  },
  methods: {
    isOpenByResponse(payload) {
      this.isOpen = payload;
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
    needBodyToSend() {
      return this.choice == "POST" || this.choice == "PUT";
    },
    async fetchData() {
      if (this.query === "") {
        window.alert(this.$t("searchbarTooltip.emptyInputText"));
      } else {
        this.isLoading = true;
        const response = await makeRequest(this.choice, this.query, this.body);
        this.isLoading = false;
        this.$store.dispatch("sendRequest", response);
      }
    },
  },
};
</script>

<style scoped>
.workspace {
  display: flex;
}
.workspace-head {
  display: flex;
  justify-content: space-between;
}

.workspace-body {
  width: 100%;
  margin: 1rem;
}

.save button {
  display: flex;
  width: auto;
  margin: 0;
}
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
.sending-container > .selectMethod {
  margin-top: 1rem;
  padding-left: 0;
  margin-right: 1rem;
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

#save {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.4rem;
}

.runButton {
  margin: 0;
}
</style>
