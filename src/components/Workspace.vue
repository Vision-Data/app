<template>
  <div class="body">
    <div class="menu">
      <div class="workspace-page">
        <img
          id="logo"
          :src="require(`@/assets/watermark-color.png`)"
          alt="logo-vision"
        />
        <router-link class="workspaceLogo" to="/">
          <select class="select select-bordered w-full max-w-xs">
            <img
              id="workspaceImg"
              :src="require(`@/assets/settings.svg`)"
              alt="img-workspace"
            />
            <option disabled="disabled" selected="selected">Workspaces</option>
            <option>Workspace 1</option>
            <option>Workspace 2</option>
            <option>Workspace 3</option>
          </select>
        </router-link>
        <div class="param">
          <button class="btn btn-primary">
            <img
              id="settings"
              :src="require(`@/assets/settings.svg`)"
              alt="icon-settings"
            />
            Paramètres
          </button>
        </div>
        <div class="divider"></div>
        <div class="treeStructure"></div>
        <div class="schemas">
          <button class="btn btn-secondary">
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
  </div>
</template>

<script>
export default {
  name: "Workspace",
  methods: {},
};
</script>

<style>
.body {
  background-color: #f6f6f6;
  display: flex;
  width: 100%;
  height: 100vh;
}

.menu {
  background-color: #ffffff;
  justify-content: left;
  display: flex;
  width: 20%;
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
  width: 10rem;
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
  display: flex;
  height: 100%;
}
</style>
