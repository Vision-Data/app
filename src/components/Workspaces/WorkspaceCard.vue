<template>
  <div class="mb-12 mx-auto">
    <div class="card bg-base-100 shadow-2xl hover:bg-base-300" @click="onClick">
      <div class="m-8">
        <figure>
          <img
            :src="workspace.logo || require('@/assets/noPicture.png')"
            alt=""
            class="workspace-logo"
          />
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
      this.$router.push(`/workspaces/${this.workspace.id}`);
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
figure {
  width: 6rem;
  height: 6rem;
}
.workspace-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #afafafaf;
  border-radius: 0.5rem;
}
</style>
