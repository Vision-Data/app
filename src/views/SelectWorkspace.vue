<template>
  <div class="mx-24 lg:mx-48 md:mx-24  my-24">
    <header class="mb-8">
      <LanguageSelect />
      <dark-mode />
    </header>
    <div class="titleBlock">
      <h2 class="text-xl">
        {{ $t("selectWorkspace.title") }}
      </h2>

      <div>
        <button class="btn btn-primary" @click="console.log('Vision')">
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

    <div
      class="grid md:grid-cols-4  md:gap-24 sm:gap-32  my-12 mb sm:grid-row-1 "
    >
      <WorkspaceCard
        v-for="workspace in workspaces"
        :key="workspace.id"
        :workspace="workspace"
      />
    </div>
    <div class="relative">
      <div
        class="tooltip tooltip-open absolute 
    bottom-0
    right-0"
        :data-tip="$t('selectWorkspace.tooltip')"
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
      </div>
    </div>
  </div>
</template>

<script>
import DarkMode from "../components/Dark-Mode.vue";
import WorkspaceCard from "../components/WorkspaceCard.vue";
import WorkspaceService from "../services/workspace.js";
import LanguageSelect from "../components/LanguageSelect.vue";

export default {
  name: "SelectWorkspace",
  components: {
    DarkMode,
    LanguageSelect,
    WorkspaceCard,
  },
  data() {
    return {
      workspaces: [],
    };
  },
  async mounted() {
    const result = await WorkspaceService.fetchAllWorkspaces(
      "MQ.CS2VTCBJX1j8myrjnKYgOdkrXyfyF0CmoVHC2u0hKcgll6yhvI5qsxoF0PmQ"
    );
    this.workspaces = result.data;
    console.log(result.data);
  },
};
</script>

<style scoped>
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
}

.tooltip {
  cursor: pointer;
}

.text-xl {
  color: #afafaf;
  font-weight: bold;
}
</style>
