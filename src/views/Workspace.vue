<template>
  <div class="workspace">
    <Menu v-if="$store.getters.isLogin" @openSettings="isSettingsOpen = true" />
    <Settings
      :open-settings="isSettingsOpen"
      @close="isSettingsOpen = false"
    ></Settings>
    <div class="workspace-body">
      <div class="flex justify-center mt-10">
        <header>
          <dark-mode />
          <Logout />
          <div class="sending-container">
            <ApiUrl
              class="container w-full max-w-screen-lg"
              :content="query"
              @query="query = $event"
            />
            <Button
              class="btn-primary runButton"
              :is-loading="isLoading"
              @click="
                fetchData();
                openModal();
              "
              >Lancer
            </Button>

            <Button v-if="isLoading" class="ml-2" @click="cancelRequest"
              >Annuler</Button
            >
          </div>
        </header>
      </div>
      <DiagramChoice v-show="isOpen" @chart="displayChart" @cancel="isOpened" />
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
        <Response
          :fullwidth="isChartDisplayed"
          @launch-modal="isOpenByResponse"
        />
        <Chart v-if="isChartDisplayed" :type="chartType" />
      </div>
    </div>
  </div>
</template>

<script>
  import DarkMode from '../components/Commons/DarkMode.vue';
  import Logout from '../components/Commons/Logout.vue';
  import ApiUrl from '../components/ApiRequest/ApiUrl.vue';
  import Response from '../components/ApiRequest/Response.vue';
  import Chart from '../components/Charts/Chart.vue';
  import DiagramChoice from '../components/ApiRequest/DiagramChoice.vue';
  import Menu from '../components/Menu.vue';
  import Button from '../components/Commons/Form/Button.vue';
  import Settings from '../components/Workspaces/Settings.vue';

  import makeRequest from '../services/api-request.js';
  import WorkspaceService from '../services/VisionApi/Workspace.js';

  export default {
    name: 'Workspace',
    components: {
      ApiUrl,
      Response,
      DarkMode,
      Chart,
      DiagramChoice,
      Button,
      Menu,
      Settings,
      Logout,
    },
    data() {
      return {
        query: '',
        body: '',
        choice: 'GET',
        chartType: 'curves',
        chart: {},
        requests: [],
        isOpen: false,
        isChartDisplayed: false,
        isBodyOpen: true,
        isLoading: false,
        store: [],
        isSettingsOpen: false,
        abortController: new AbortController(),
      };
    },
    async mounted() {
      if (!this.$route.params.workspaceId) {
        return this.$router.push('/workspaces');
      }

      this.getWorkspace();

      this.initStructure();
    },
    async beforeUpdate() {
      // Quick hack to avoid errors when the user is logs out
      if (!this.$store.getters.isLogin) {
        return;
      }

      if (!this.$route.params.workspaceId) {
        return this.$router.push('/workspaces');
      }

      this.getWorkspace();
      // Reset requests tree
      this.requests = [];
      this.$store.dispatch('sendStructure', this.requests);

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
        if (this.query !== '') {
          this.isOpen = true;
        }
      },
      displayChart(payload) {
        if (
          payload.name === 'curves' ||
          payload.name === 'donut' ||
          payload.name === 'bars'
        ) {
          this.isChartDisplayed = true;
          this.isOpen = false;
          this.chartType = payload.name;
        }
      },
      async fetchData() {
        if (this.query === '') {
          window.alert('Le champ URL est vide');
        } else {
          this.isLoading = true;
          const response = await makeRequest(
            this.choice,
            this.query,
            this.body,
            this.abortController
          );
          this.isLoading = false;
          this.$store.dispatch('resetSelectedData');
          this.$store.dispatch('resetChartData');
          this.$store.dispatch('sendRequest', response);
        }
      },
      cancelRequest() {
        this.abortController.abort();
        this.abortController = new AbortController();
        this.isLoading = false;
      },
      insertRequest(db) {
        let transaction = db.transaction('requests', 'readwrite');

        transaction.oncomplete = function () {
          db.close();
        };
      },
      getAllRequests(db, callback) {
        let transaction = db.transaction('requests', 'readonly');
        let store = transaction.objectStore('requests');
        let cursorRequest = store.openCursor();
        let items = [];

        transaction.oncomplete = function () {
          callback(items);
        };

        cursorRequest.onsuccess = function (event) {
          let cursor = event.target.result;
          if (cursor) {
            const item = cursor.value;
            item.primaryKey = cursor.primaryKey;
            items.push(item);
            cursor.continue();
          }
        };
      },
      getItems(data) {
        const addRequest = this.addRequest;
        let items = data.filter(
          (item) => item.workspaceId === this.$route.params.workspaceId
        );

        items.forEach((element) => {
          addRequest(
            element.query,
            this.$route.params.workspaceId,
            element.primaryKey
          );
        });
      },
      addRequest(path, id, key) {
        const result = path.split('//')[1]; //get characters after ://
        const directories = result.split('/'); //array of directories
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

        if (directories.length > 0) {
          const parent =
            hostRequestIndex === -1
              ? this.requests[this.requests.length - 1]
              : this.requests[hostRequestIndex];
          this.addChildrenRequest(directories, parent, id, key);
        }
      },
      addChildrenRequest(directories, parent, id, key) {
        const name = directories.shift().split(/[?#]/)[0];

        const childrenRequestIndex = parent.children.findIndex(
          (request) => request.name === name
        );

        if (childrenRequestIndex === -1) {
          parent.children.push({
            workspaceId: id,
            path: `/workspaces/${id}?request=${key}`,
            name: name,
            children: [],
          });
        }

        if (directories.length > 0) {
          const parentElement =
            childrenRequestIndex === -1
              ? parent.children[parent.children.length - 1]
              : parent.children[childrenRequestIndex];

          this.addChildrenRequest(directories, parentElement, id, key);
        }
      },
      getRequestById(db, callback, id) {
        let transaction = db.transaction('requests', 'readwrite');
        let store = transaction.objectStore('requests').get(id);

        store.onsuccess = (event) => {
          if (event.target.result) {
            callback(event.target.result);
          }
        };

        transaction.oncomplete = function () {
          db.close();
        };
      },
      setInfoInputs(data) {
        this.query = data.query;
        this.body = data.body;
        this.choice = data.choice;
        this.$store.state.response = JSON.parse(data.response);
      },
      initStructure() {
        const req = indexedDB.open('db', 1);
        const getAllRequests = this.getAllRequests;
        const getItems = this.getItems;
        const getRequestById = this.getRequestById;
        const setInfoInputs = this.setInfoInputs;

        req.onupgradeneeded = function () {
          let db = req.result;
          if (!db.objectStoreNames.contains('requests')) {
            db.createObjectStore('requests', { autoIncrement: true });
          }
        };

        req.onsuccess = async () => {
          let db = req.result;

          db.versiononchange = function () {
            db.close();
            alert('Database is outdated, please reload the page.');
          };

          await getAllRequests(db, getItems);
          this.$store.dispatch('sendStructure', this.requests);
          if (this.$route.query.request !== undefined) {
            const id = Number(this.$route.query.request);
            await getRequestById(db, setInfoInputs, id);
          }
        };
      },
      async getWorkspace() {
        const { response } = await WorkspaceService.find(
          this.$store.state.token,
          this.$route.params.workspaceId
        );

        if (response && response.data) {
          this.$store.dispatch('setSelectedWorkspace', response.data);
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
