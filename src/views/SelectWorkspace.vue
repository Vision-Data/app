<template>
  <div class="mx-96 my-24">
    <header>
      <language-select />
      <dark-mode />
    </header>
    <div class="titleBlock">
      <h2 class="text-xl">
        {{ $t("selectWorkspace.title") }}
      </h2>

      <div>
        <button class="btn btn-primary">
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
    <div class="grid grid-cols-4 gap-16 my-24">
      <WorkspaceCard
        name="Google"
        logo="https://asset.brandfetch.io/id6O2oGzv-/id-DuOtor_.png"
      />
      <WorkspaceCard
        name="The New York Times"
        logo="https://asset.brandfetch.io/ida5pjO05F/idVD16ua83.png"
      />
      <WorkspaceCard
        name="Goldman Sach"
        logo="https://asset.brandfetch.io/id7L59h6d0/ido15vEWwP.png"
      />
      <WorkspaceCard
        name="Wikipédia"
        logo="https://asset.brandfetch.io/idAo3WRIoq/id1yioAtJ5.jpeg"
      />
      <WorkspaceCard
        name="Paypal"
        logo="https://asset.brandfetch.io/id-Wd4a4TS/id8rCKc-lT.png"
      />
      <WorkspaceCard
        name="Netflix"
        logo="https://asset.brandfetch.io/ideQwN5lBE/idEpcd_1YX.jpeg"
      />
      <WorkspaceCard
        name="Spotify"
        logo="https://asset.brandfetch.io/id20mQyGeY/idyE-PQqf2.png"
      />
      <WorkspaceCard
        name="Zoom"
        logo="https://asset.brandfetch.io/id3aO4Szj3/idNReQwCF2.png"
      />
    </div>
    <div class="relative h-32 w-32 left-1/2 bottom-0">
      <div
        class="tooltip tooltip-open absolute h-16 w-16"
        :data-tip="$t('selectWorkspace.tooltip')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
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
export default {
  name: "SelectWorkspace",
  components: {
    DarkMode,
    WorkspaceCard,
  },
  data() {
    return {};
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
.text-xl {
  color: #afafaf;
  font-weight: bold;
}
</style>
