<template>
  <div class="menu">
    <div class="workspace-page">
      <div class="workspace-header">
        <img
          id="logo"
          :src="require(`@/assets/watermark-color.png`)"
          alt="logo-vision"
        />
        <Loading v-if="isLoading" />
        <button class="go-back btn btn-primary" @click="goBack()">
          {{ "Changer d'espace de travail" }}
        </button>
        <div class="param">
          <button class="btn btn-primary settings" @click="goToSettings">
            <img
              id="settings"
              :src="require(`@/assets/settings.svg`)"
              alt="icon-settings"
            />
            {{ 'Paramètres' }}
          </button>
        </div>
        <div class="divider"></div>
      </div>
      <div class="informations">
        <a href="https://vision-data.io/pages/index.html#lexique">
          <p>Lexique</p>
        </a>
        <a href="https://github.com/Vision-Data/app/blob/main/LICENSE">
          <p>Licence</p>
        </a>
        <a href="https://vision-data.io/pages/index.html#agreement">
          <p>Conditions d'utilisations</p>
        </a>
        <a href="https://vision-data.io/pages/index.html#policy">
          <p>Politique de confidentialité</p>
        </a>
      </div>
      <div class="tree-structure">
        <!-- <vue3-router-tree active-color="#FE9430" :items="requests">
          <template #item="{ item }">
            <div class="tree-structure-container">
              <a :href="item.path" class="menu-link">
                <div class="tree-structure-head">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    class="tree-structure-icon iconify iconify--carbon"
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
                  <span class="tree-structure-name"> {{ item.name }}</span>
                </div>
              </a>
            </div>
          </template>
        </vue3-router-tree> -->
      </div>
      <div class="schemas">
        <button
          class="btn btn-secondary"
          style="display: none"
          @click="$router.push('Schemas')"
        >
          <img
            id="schemas"
            :src="require(`@/assets/schemas.svg`)"
            alt="icon-schemas"
          />
          {{ 'Schémas' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from './Commons/Loading.vue';

  export default {
    name: 'Menu',
    components: {
      Loading,
    },
    emits: ['openSettings'],
    data() {
      return {
        requests: this.$store.state.treeStructure,
        isLoading: false,
      };
    },
    watch: {
      '$store.state.treeStructure'(newValue) {
        this.requests = newValue;
      },
    },
    methods: {
      goToSettings() {
        this.$emit('openSettings');
      },
      goBack() {
        this.$router.push('/workspaces');
      },
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
    width: 100%;
    max-width: 20rem;
  }

  .menu-link {
    transition: color 0.2s, bold 0.3s;
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

  .workspace-page .informations {
    display: flex;
    flex-direction: column;
    bottom: 20px;
    position: absolute;
  }

  .workspace-page .informations p {
    padding: 0;
    font-size: 13px;
  }

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

  [data-theme='dark'] #settings,
  [data-theme='dark'] #schemas {
    filter: invert(1);
  }

  .btn {
    width: auto;
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

  .workspace-header .go-back {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
</style>
