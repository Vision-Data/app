<template>
  <div class="body">
    <div class="workspace-page">
      <img
        id="logo"
        :src="require(`@/assets/watermark-color.png`)"
        alt="logo-vision"
      />
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
      <div class="treeStructure">


          
      </div>
      <div class="schemas">
        <button class="btn btn-primary">
          <img
            id="schemas"
            :src="require(`@/assets/schemas.svg`)"
            alt="icon-schemas"
          />
          SCHEMAS
        </button>
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
</style>
