<template>
  <Modal :isOpen="openSettings" :title="$t('workspace.settings.name')">
    <h4 class="text-lg text-secondary font-bold mb-4">
      {{ $t("workspace.settings.tabs.informations.name") }}
    </h4>
    <section class="flex">
      <div class="avatar">
        <div
          class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
        >
          <img
            :src="
              $store.state.user.avatar_url || require('@/assets/noPicture.png')
            "
          />
        </div>
      </div>
      <div class="ml-4 self-center">
        <p>
          <span class="badge mr-2">{{
            $t("workspace.settings.tabs.informations.labels.full_name")
          }}</span
          >{{ $store.state.user.full_name }}
        </p>
        <p>
          <span class="badge mr-2">{{
            $t("workspace.settings.tabs.informations.labels.email")
          }}</span
          >{{ $store.state.user.email }}
        </p>
      </div>
    </section>

    <template v-slot:actions>
      <Button class="btn-error btn-outline" @click="logout">{{
        $t("workspace.settings.logout")
      }}</Button>
    </template>
  </Modal>
</template>

<script>
import Modal from "../Commons/Modal.vue";
import Button from "../Commons/Form/Button.vue";

export default {
  name: "Settings",
  inject: ["notyf"],
  props: ["openSettings"],
  components: { Modal, Button },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
      this.notyf.success(this.$t("commons.logoutSuccess"));
    },
  },
};
</script>
