<template>
  <div class="select-workspace">
    <div class="lg:mx-48 md:mx-24 sm:mx-2 my-24">
      <header class="mb-8"> 
        <LanguageSelect />
        <dark-mode />
      </header>
      <div class="md:flex justify-between row">
        <h2 class="text-xl">
          {{ $t("selectWorkspace.title") }}
        </h2>

        <div>
          <button class="btn btn-primary" @click="this.goToCreatePage()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clip-rule="evenodd"
              />
            </svg>
            {{ $t("selectWorkspace.create") }}
          </button>
        </div>
      </div>
      <div class="container mx-auto px-auto ">
        <Alert
          label="Vous n'avez pas encore d'espace de travail. Créez le vôtre dès maintenant."
          type="info"
          v-if="!workspaces.length && isLoading === false"
        />
        <Loading v-if="isLoading" />
        <div class="grid sm:grid-rows-8 md:grid-cols-4 my-8">
          <WorkspaceCard
            v-for="workspace in workspaces"
            :key="workspace.id"
            :workspace="workspace"
          />
        </div>
        <div class="btn-group flex justify-center" v-if="workspaces.length">
          <button
            class="btn  btn-primary btn-outline w-6/12 md:w-24"
            v-bind:class="{
              'opacity-50': !previousPageUrl,
            }"
            :disabled="!previousPageUrl"
            @click="this.goToPreviousPage()"
          >
            {{ $t("selectWorkspace.previous") }}
          </button>
          <button
            class="btn btn-primary btn-outline w-6/12 md:w-24"
            v-bind:class="{
              'opacity-50': !nextPageUrl,
            }"
            :disabled="!nextPageUrl"
            @click="this.goToNextPage()"
          >
            {{ $t("selectWorkspace.next") }}
          </button>
        </div>
      </div>
    </div>
    <div class="help">
      <TooltipInformations
        class="tooltip absolute bottom-0 md:right-0 md:h-16"
        :helperText="$t('selectWorkspace.tooltip')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#afafaf"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </TooltipInformations>
    </div>
  </div>
</template>

<script>
import DarkMode from "../components/Commons/DarkMode.vue";
import WorkspaceCard from "../components/Workspaces/WorkspaceCard.vue";
import WorkspaceService from "../services/VisionApi/Workspace.js";
import LanguageSelect from "../components/Commons/LanguageSelect.vue";
import TooltipInformations from "../components/Commons/ToolTipInformations.vue";
import Alert from "../components/Commons/Alert.vue";
import Loading from "../components/Commons/Loading.vue";

export default {
  name: "SelectWorkspace",
  components: {
    DarkMode,
    LanguageSelect,
    TooltipInformations,
    WorkspaceCard,
    Alert,
    Loading,
  },
  data() {
    return {
      workspaces: [],
      nextPageUrl: undefined,
      previousPageUrl: undefined,
      isLoading: true,
      errors: null,
    };
  },
  methods: {
    goToCreatePage() {
      this.$router.push("/workspaces/create");
    },

    async goToNextPage() {
      if (this.nextPageUrl) {
        this.isLoading = true;
        let { response, errors } = await WorkspaceService.findAll(
          this.$store.state.token,
          this.nextPageUrl
        );

        this.isLoading = false;
        this.workspaces = response.data.data;
        this.errors = errors;
        this.previousPageUrl = response.data.meta.previous_page_url;
        this.nextPageUrl = response.data.meta.next_page_url;
      }
    },
    async goToPreviousPage() {
      if (this.previousPageUrl) {
        let { response, errors } = await WorkspaceService.findAll(
          this.$store.state.token,
          this.previousPageUrl
        );

        this.errors = errors;
        this.workspaces = response.data.data;
        this.previousPageUrl = response.data.meta.previous_page_url;
        this.nextPageUrl = response.data.meta.next_page_url;
      }
    },
  },
  async mounted() {
    let { response, errors } = await WorkspaceService.findAll(
      this.$store.state.token
    );
    this.isLoading = false;
    this.errors = errors;
    this.workspaces = response.data.data;
    this.nextPageUrl = response.data.meta.next_page_url;
  },
};
</script>

<style scoped>
.select-workspace {
  max-height: 100vh;
}
@media (max-width: 768px) {
  .select-workspace {
    margin: 2rem;
  }
}
  

.help {
  position: fixed;
  bottom: 2rem;
  right: 4rem;
}
.avatar {
  background-color: #afafaf !important;
}

.titleBlock {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.tooltip::before {
  font-weight: bold;
  font-size: 1.2em;
  color: #afafaf !important;
  background-color: #f0f0f0 !important;
  transform: translateX(-80%);
}

.tooltip {
  cursor: pointer;
}

.text-xl {
  color: #afafaf;
  font-weight: bold;
}
</style>
