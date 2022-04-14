<template>
  <div class="menu">
    <div class="workspace-page">
      <div class="workspace-header">
        <img id="logo" :src="require(`@/assets/watermark-color.png`)" alt="logo-vision" />
        <select name="workspace" id="workspace-select" @change="changeRoute" v-model="selectedWorkspace" class="select select-bordered w-full max-w-xs loading">
          <option v-for="workspace in workspaces" :key="workspace.id" :value="workspace.id">
            {{ workspace.name }}
          </option>
        </select>
        <div class="param">
          <button @click="$router.push('Settings')" class="btn btn-primary settings">
            <img id="settings" :src="require(`@/assets/settings.svg`)" alt="icon-settings" />
            {{ $t('workspace.settings') }}
          </button>
        </div>
        <div class="divider"></div>
      </div>
      <div class="tree-structure">
        <vue3-router-tree activeColor="#FE9430" :items="requests">
          <template #item="{ item }">
            <div class="tree-structure-container">
              <div class="tree-structure-head">
                <svg aria-hidden="true" focusable="false" role="img" class="tree-structure-icon iconify iconify--carbon" width="20px" height="20px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style="transform: rotate(360deg)">
                  <path d="M11.17 6l3.42 3.41l.58.59H28v16H4V6h7.17m0-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H16l-3.41-3.41A2 2 0 0 0 11.17 4z" fill="currentColor" />
                </svg>
                <a :href="item.path" class="menu-link"><span class="tree-structure-name"> {{ item.name }}</span></a>
              </div>
            </div>
          </template>
        </vue3-router-tree>
      </div>
      <div class="schemas">
        <!-- <button @click="$router.push('Schemas')" class="btn btn-secondary"> -->
        <button @click="display" class="btn btn-secondary">
          <img id="schemas" :src="require(`@/assets/schemas.svg`)" alt="icon-schemas" />
          {{ $t('workspace.graphs') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3RouterTree from "vue3-router-tree";
import WorkspaceService from "../services/VisionApi/Workspace.js";

export default {
  name: "Menu",
  methods: {
    changeRoute() {
      this.$router.push(`/workspaces/${this.selectedWorkspace}`);
    },
    display() {
      console.log(this.requests);
    },
  },
  components: {
    Vue3RouterTree,
  },
  watch: {
    "$store.state.treeStructure"(newValue) {
      this.requests = newValue;
    },
  },
  async mounted() {
    const { response } = await WorkspaceService.findAll(
      this.$store.state.token
    );

    this.workspaces = response.data.data;
    this.selectedWorkspace =
      this.$route.params.workspaceId || this.workspaces[0]?.id || "";
  },
  data() {
    return {
      test: 0,
      selectedWorkspace: "",
      workspaces: [],
      requests: this.$store.state.treeStructure,
    };
  },
};
</script>

<style scoped>
.px-4 {
  padding-right: 0rem !important;
}
.menu {
  background-color: var(--menu);
  justify-content: left;
  display: flex;
}

.menu-link {
  transition: color .2s,
   bold .3s;
}

.menu-link:hover {
  color: var(--vision-orange);
  font-weight: bold;
}
.workspace-page {
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.divider {
  margin: 1rem;
}

.workspaceLogo,
.btn,
#logo {
  margin: 0 auto;
}

#settings,
#schemas {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
}

[data-theme="dark"] #settings,
[data-theme="dark"] #schemas {
  filter: invert(1);
}

.btn {
  width: auto;
  display: flex;
}

#workspace-select {
  margin: 1rem 0;
}

#workspaceImg {
  width: 4rem;
  height: 4rem;
}

.workspaceLogo {
  height: auto;
  width: 10rem;
  display: flex;
}

.tree-structure {
  flex: 1;
}
.tree-structure > div {
  margin-left: -1rem;
}

.tree-structure-icon {
  margin-right: 0.5rem;
  height: 1rem;
  width: 1rem;
  min-height: 1rem;
  min-width: 1rem;
}

.tree-structure-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.tree-structure-head {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.tree-structure-chip {
  margin-left: auto;
}

.settings {
  background-color: transparent;
  color: var(--p);
}
</style>
