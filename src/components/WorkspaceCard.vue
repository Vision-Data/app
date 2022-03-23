<template>
  <div>
    <div class="card w-48 bg-base-100 shadow-xl">
      <div class="m-8">
        <figure>
          <img :src="logo" alt="Logo" />
        </figure>
      </div>
    </div>
    <div class="flex justify-center mr-4  mt-8">
      <h1 class="text-3xl workspaceName">{{ name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkspaceCard",
  props: ["name", "logo"],
  data() {},
};
</script>

<style scoped>
.workspaceName {
  font-size: 1.5rem;
  color: #afafafaf;
  font-weight: bold;
  white-space: nowrap;
}
</style>
