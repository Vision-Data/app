<template>
  <div>
    <div
      class="card w-48 bg-base-100 shadow-2xl hover:bg-base-300"
      @click="onClick"
    >
      <div class="m-8">
        <figure>
          <img :src="logo" alt="Logo" />
        </figure>
      </div>
    </div>
    <div class="w-48 flex justify-center mt-8">
      <h1 class="text-3xl workspaceName">{{ name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkspaceCard",
  props: ["name", "logo"],
  methods: {
    onClick() {
      this.$router.push("/workspaces?name=" + this.name);
    },
  },
  data() {},
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
