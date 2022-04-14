<template>
  <div class="workspace">
    <Menu v-if="$store.getters.isLogin" :requests="requests" />
    <div class="workspace-body">
      <div class="flex justify-center mt-10">
        <header>
          <div class="workspace-head">
            <language-select />
            <div class="save" v-if="$store.getters.isLogin">
              <Button class="btn-secondary" @click="saveRequest">
                <img id="save" :src="require(`@/assets/save.svg`)" alt="icon-save" />
                <span>{{ $t("workspace.saveButton") }}</span>
              </Button>
            </div>
          </div>
          <dark-mode />
          <div class="sending-container">
            <ApiUrl class="container w-full max-w-screen-lg" @query="query = $event" />
            <SelectHttpMethod :query="query" @detectChoice="choice = $event" :body="body" />
            <Button class="btn-primary runButton" :isLoading="isLoading" @click="fetchData()">{{ $t("searchbarTooltip.runButton") }}
            </Button>
          </div>
          <Button class="btn-sm mt-2" v-if="needBodyToSend()" @click="isBodyOpen = true">
            {{ $t("requestBody.editButton") }}
          </Button>
          <RequestBody :needBodyToSend="needBodyToSend()" v-show="isBodyOpen" @close="closing" @requestBodyContent="body = $event" class="container w-full md:w-screen max-w-screen-lg md:-mx-60" />
        </header>
      </div>
      <DiagramChoice @chart="displayChart" @cancel="isOpened" v-show="isOpen" />
      <Button id="selectSchema" class="btn-circle btn-lg floating-btn" @click="openModal">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
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
import LanguageSelect from "../components/Commons/LanguageSelect.vue";
import ApiUrl from "../components/ApiRequest/ApiUrl.vue";
import Response from "../components/ApiRequest/Response.vue";
import SelectHttpMethod from "../components/ApiRequest/SelectHttpMethod.vue";
import Chart from "../components/Charts/Chart.vue";
import RequestBody from "../components/ApiRequest/RequestBody.vue";
import DiagramChoice from "../components/ApiRequest/DiagramChoice.vue";
import Menu from "../components/Menu.vue";
import Button from "../components/Commons/Form/Button.vue";

import makeRequest from "../services/api-request.js";

export default {
  name: "Workspace",
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
      requests: [],
      isOpen: false,
      isChartDisplayed: false,
      isBodyOpen: true,
      isLoading: false,
      store: [],
    };
  },
  mounted() {
    this.initStructure();
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
    getRequestById(db, id) {
      let transaction = db.transaction("requests", "readwrite");
      let store = transaction.objectStore("requests").get(id);

      store.onsuccess = (event) => {
        if (!event.target.result) {
          console.log(`The contact with ${id} not found`);
        } else {
          console.table(event.target.result);
        }
      };

      store.onerror = (event) => {
        console.log(`Error: ${event.target.errorCode}`);
      };

      transaction.oncomplete = function () {
        console.log("The request completed successfully");
        db.close();
      };
    },
    insertRequest(db, payload) {
      let transaction = db.transaction("requests", "readwrite");
      let store = transaction.objectStore("requests").put(payload);

      store.onerror = function () {
        console.error("Error adding request to database");
      };
      transaction.oncomplete = function () {
        console.log("Request added to database");
        db.close();
      };
    },
    getAllRequests(db, callback) {
      let transaction = db.transaction("requests", "readonly");
      let store = transaction.objectStore("requests");
      let items = [];

      transaction.oncomplete = function () {
        callback(items);
      };

      let cursorRequest = store.openCursor();

      cursorRequest.onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor) {
          items.push(cursor.value);
          cursor.continue();
        }
      };
      cursorRequest.onerror = function () {
        console.error("Error adding request to database");
      };
    },
    getItems(data) {
      let addRequest = this.addRequest;

      data.forEach((element) => {
        addRequest(element.query, element.workspaceId);
      });
    },
    addRequest(path, id) {
      const result = path.split("//")[1]; //get characters after ://
      const directories = result.split("/"); //array of directories
      const name = directories.shift().split(/[?#]/)[0];

      const hostRequestIndex = this.requests.findIndex(
        (request) => request.name === name
      );

      if (hostRequestIndex === -1) {
        this.requests.push({
          workspaceId: id,
          name: name,
          children: [],
        });
      }

      const parent =
        hostRequestIndex === -1
          ? this.requests[this.requests.length - 1]
          : this.requests[hostRequestIndex];

      if (directories.length > 0) {
        this.addChildrenRequest(directories, parent, id);
      }
    },
    addChildrenRequest(directories, parent, id) {
      const name = directories.shift().split(/[?#]/)[0];

      const childrenRequestIndex = parent.children.findIndex(
        (request) => request.name === name
      );

      if (childrenRequestIndex === -1) {
        parent.children.push({
          workspaceId: id,
          path: `/workspaces/${id}/${name}`,
          name: name,
          children: [],
        });
      }

      if (directories.length > 0) {
        const parentElement =
          childrenRequestIndex === -1
            ? parent.children[parent.children.length - 1]
            : parent.children[childrenRequestIndex];

        this.addChildrenRequest(directories, parentElement, id);
      }
    },
    initStructure() {
      const req = indexedDB.open("db", 1);
      const getAllRequests = this.getAllRequests;
      const getItems = this.getItems;

      req.onerror = function (event) {
        console.error(event);
      };

      req.onupgradeneeded = function () {
        let db = req.result;
        if (!db.objectStoreNames.contains("requests")) {
          db.createObjectStore("requests", { autoIncrement: true });
        }
      };

      req.onsuccess = async () => {
        let db = req.result;

        db.versiononchange = function () {
          db.close();
          alert("Database is outdated, please reload the page.");
        };

        await getAllRequests(db, getItems);
        this.$store.dispatch("sendStructure", this.requests);
        console.log(this.requests);
      };
    },
    saveRequest() {
      const req = indexedDB.open("db", 1);
      const insertRequest = this.insertRequest;
      const getAllRequests = this.getAllRequests;
      const getItems = this.getItems;

      req.onerror = function (event) {
        //TODO: gérer l'affichage de l'erreur (autorisation, etc)
        console.error(event);
      };

      req.onupgradeneeded = function () {
        let db = req.result;
        //si le client n'a pas de base de données (initialisation)
        if (!db.objectStoreNames.contains("requests")) {
          db.createObjectStore("requests", { autoIncrement: true });
        }
      };

      req.onsuccess = async () => {
        let db = req.result;

        db.versiononchange = function () {
          db.close();
          alert("Database is outdated, please reload the page.");
        };
        if (this.query.split("//").length > 1) {
          await insertRequest(db, {
            workspaceId: this.$route.params.workspaceId,
            query: this.query,
            body: this.body,
            choice: this.choice,
          });
          await getAllRequests(db, getItems);
          this.$store.commit("setStructure", this.requests);
        }
      };
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
