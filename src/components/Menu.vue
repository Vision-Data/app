<template>
  <div class="menu">
    <div class="workspace-page">
      <div class="workspace-header">
        <img
          id="logo"
          :src="require(`@/assets/watermark-color.png`)"
          alt="logo-vision"
        />
        <select
          name="workspace"
          id="worskpace"
          @change="changeRoute"
          v-model="selectedWorkspace"
          class="select select-bordered w-full max-w-xs loading"
        >
          <!-- <option selected value="-1">  Worskpace </option> -->
          <option
            v-for="workspace in workspaces"
            :key="workspace.id"
            :value="workspace.id"
          >
            {{ workspace.name }}
          </option>
        </select>
        <div class="param">
          <button
            @click="$router.push('Settings')"
            class="btn btn-primary settings"
          >
            <img
              id="settings"
              :src="require(`@/assets/settings.svg`)"
              alt="icon-settings"
            />
            Paramètres
          </button>
        </div>
        <div class="divider"></div>
      </div>
      <div class="treeStructure">
        <vue3-router-tree :items="routes">
          <template #item="{ item }">
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              class="iconify iconify--carbon"
              width="20px"
              height="20px"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
              style="transform: rotate(360deg)"
            >
              <path
                d="M11.17 6l3.42 3.41l.58.59H28v16H4V6h7.17m0-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2H16l-3.41-3.41A2 2 0 0 0 11.17 4z"
                fill="currentColor"
              />
            </svg>
            <span> {{ item.name }}</span>

            <span v-if="item.info" class="chip">{{ item.info }}</span>
          </template>
        </vue3-router-tree>
      </div>
      <div class="schemas">
        <button @click="$router.push('Schemas')" class="btn btn-secondary">
          <img
            id="schemas"
            :src="require(`@/assets/schemas.svg`)"
            alt="icon-schemas"
          />
          Schémas
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
  },
  components: {
    Vue3RouterTree,
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
      selectedWorkspace: "",
      workspaces: [],
      routes: [
        {
          path: "/",
          name: "Home",
          hasIcon: true,
        },
        {
          path: "/workspace",
          name: "Workspace",
          hasIcon: true,
        },
        {
          path: "/requetes",
          name: "Requetes",
          hasIcon: true,
          children: [
            {
              path: "/requete1",
              name: "Requete1",
            },
            {
              path: "/requete2",
              name: "Requete2",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.menu {
  background-color: #ffffff;
  justify-content: left;
  display: flex;
  width: 20%;
}

.workspace-page {
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.divider {
  margin: 1rem;
}

#logo {
  width: 70%;
  margin: 5%;
  margin-left: auto;
  margin-right: auto;
}

#settings,
#schemas {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.4rem;
}

.btn {
  width: auto;
  margin: 5%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}
/* 
select {

} */

#workspaceImg {
  width: 4rem;
  height: 4rem;
}

.workspaceLogo {
  height: auto;
  width: 10rem;
  margin: 5%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

.treeStructure {
  flex: 1;
}

.treeStructure .justify-between {
  justify-content: flex-start;
}

.treeStructure svg {
  margin-right: 0.5rem;
  height: 1rem;
  width: 1rem;
  min-height: 1rem;
  min-width: 1rem;
}

.settings {
  background-color: transparent;
  color: var(--p);
}
</style>
