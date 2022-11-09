<template>
  <Button class="btn-lg" @click.prevent="logWithProvider('google')">
    <img :src="require(`@/assets/LogoGoogle.png`)" class="w-8 mr-4" />
    Connexion avec Google
  </Button>
  <Button class="btn-lg mt-4 mb-8" @click.prevent="logWithProvider('github')">
    <img :src="require(`@/assets/LogoGithub.png`)" class="w-8 mr-4" />
    Connexion avec Github
  </Button>
</template>

<script>
import Button from "../Commons/Form/Button.vue";

export default {
  name: "Providers",
  components: {
    Button,
  },
  methods: {
    logWithProvider(provider) {
      // Options for popup
      const width = 600;
      const height = 600;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      const url = `${process.env.VUE_APP_HOST_API}auth/${provider}`;

      // Open provider popup
      const popup = window.open(
        url,
        "",
        `toolbar=no, location=no, directories=no, status=no, menubar=no, 
        scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
        height=${height}, top=${top}, left=${left}`
      );

      this.$socket.on("login", (data) => {
        popup.close();
        this.$store.dispatch("setToken", data.token);
        this.$store.dispatch("setUser", data.user);
        this.$router.push("/workspaces");
      });

      this.$socket.on("errorLogin", () => {
        popup.close();
        this.$notyf.error("Une erreur est survenue. Veuillez réessayer.");
      });
    },
  },
};
</script>
