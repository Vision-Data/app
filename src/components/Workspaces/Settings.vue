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
        {{ $store.state.selectedWorkspace?.name || '' }}
      </Tab>
    </Tabs>

    <template #actions>
      <Button class="btn-error btn-outline" @click="logout">
        {{ 'Déconnexion' }}
      </Button>
    </template>
  </Modal>
</template>

<script>
import Modal from '../Commons/Modal.vue';
import Button from '../Commons/Form/Button.vue';
import Tabs from '../Commons/Tabs/Tabs.vue';
import Tab from '../Commons/Tabs/Tab.vue';

import AuthenticationService from '../../services/VisionApi/Authentication.js';

export default {
  name: 'Settings',
  components: { Modal, Button, Tabs, Tab },
  props: ['openSettings'],
  methods: {
    async logout() {
      await AuthenticationService.logout(this.$store.state.token);
      this.$store.dispatch('logout');
      this.$router.push('/login');
      this.$notyf.success('Vous avez été déconnecté avec succès.');
    }
  }
};
</script>
