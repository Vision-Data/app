<template>
  <Modal :is-open="openSettings" title="Paramètres">
    <Tabs>
      <Tab title="Informations du compte">
        <section class="flex">
          <div class="avatar">
            <div
              class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
            >
              <img
                :src="
                  $store.state.user?.avatar_url ||
                  require('@/assets/noPicture.png')
                "
                alt="No picture"
              />
            </div>
          </div>
          <div class="ml-4 self-center">
            <p>
              <span class="badge mr-2">{{ 'Nom complet' }}</span
              >{{ $store.state.user?.full_name }}
            </p>
            <p>
              <span class="badge mr-2">{{ 'Email' }}</span
              >{{ $store.state.user?.email }}
            </p>
          </div>
        </section>
      </Tab>
      <Tab title="Espace de travail">
        <p>{{ $store.state.selectedWorkspace?.name || '' }}</p>
        <button class="mt-2 btn btn-error" @click.prevent="destroy">
          Supprimer l'espace de travail
        </button>
      </Tab>
    </Tabs>
  </Modal>
</template>

<script>
  import Modal from '../Commons/Modal.vue';
  import Tabs from '../Commons/Tabs/Tabs.vue';
  import Tab from '../Commons/Tabs/Tab.vue';
  import WorkspaceService from '../../services/VisionApi/Workspace.js';

  export default {
    name: 'Settings',
    components: { Modal, Tabs, Tab },
    props: ['openSettings'],
    methods: {
      async destroy() {
        this.isLoading = true;
        const { errors } = await WorkspaceService.destroy(
          this.$store.state.token,
          this.$store.state.selectedWorkspace.id
        );
        this.isLoading = false;
        this.errors = errors;
        if (!this.errors) {
          this.$notyf.success('Votre espace de travail a bien été supprimé');
          this.$router.push('/workspaces');
        }
      },
    },
  };
</script>
