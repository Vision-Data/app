<template>
  <div class="mb-12 mx-auto">
    <div
      class="card w-36 bg-base-100 shadow-2xl hover:bg-base-300"
      @click="onClick"
    >
      <div class="m-8">
        <figure>
          <img :src="workspace.logo" alt="Logo" />
        </figure>
      </div>
    </div>
    <div class="w-36 flex justify-center mt-8">
      <h1 class="text-3xl workspaceName">{{ workspace.name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkspaceCard",
  props: ["workspace"],
  methods: {
    async onClick() {
      this.$router.push("/workspaces?name=" + this.workspace.name);
    },
  },
};
</script>

<style scoped>
.card:hover {
  cursor: pointer;
}
.workspaceName {
  font-size: 1.5rem;
  color: #afafafaf;
  font-weight: bold;
  white-space: nowrap;
}
</style>
