<template>
  <div class="workspace-card mb-12 mx-auto">
    <div class="card bg-base-100 shadow-2xl hover:bg-base-300" @click="onClick">
      <div class="m-6">
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
      <h1 class="text-3xl workspaceName">
        {{ workspace.name }}
      </h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WorkspaceCard',
    props: ['workspace'],
    methods: {
      async onClick() {
        this.$store.dispatch('setSelectedWorkspace', this.workspace);
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
    display: flex;
    white-space: nowrap;
    align-items: center;
  }
  figure {
    width: 6rem;
    height: 6rem;
    background-color: #ffffff;
    padding: 7px;
    border-radius: 0.5rem;
  }
  .workspace-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 0.5rem;
  }
  .m-6 {
    width: 6rem;
    height: 6rem;
  }

  .hover\:bg-base-300:hover {
    --tw-bg-opacity: 0.5;
    background-color: hsla(var(--b3) / var(--tw-bg-opacity));
  }
</style>
