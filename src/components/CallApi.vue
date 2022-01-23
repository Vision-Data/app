<template>
  <div class="select">
    <select v-model="choice" :required="true" class="select select-bordered w-full max-w-xs" aria-label="Sélectionnez la méthode d'envoi" @change="emitChoice">
      <option v-for="value in choices" :key="value.key" :value="value.method">{{
        value.text
      }}</option>
    </select>
    <button class="btn btn-primary" id="valid" v-if="!isLoading" @click="toggleButton()">
      {{ valid }}
    </button>
    <button class="btn btn-outline btn-primary loading" v-if="isLoading">
      En cours
    </button>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "SearchBar",
  props: ["query", "body"],
  data() {
    return {
      valid: "Lancer",
      isLoading: false,
      choices: [
        { method: "GET", text: "⇲ Recevoir (GET)" },
        { method: "POST", text: "➤ Envoyer (POST)" },
        { method: "DELETE", text: "🗑 Supprimer (DELETE) " },
        { method: "PUT", text: "⛭ Modifier (PUT)" }
      ],
      choice: "GET"
    };
  },
  methods: {
    emitChoice() {
      let isSendable = this.choice == "POST" || this.choice == "PUT";
      this.$emit("detectChoice", isSendable);
    },
    toggleButton() {
      this.valid = this.valid == "Lancer" ? "■" : "Lancer";
      if (this.valid == "■") {
        this.callApi();
      }
    },
    async makeRequest(choice, query, body) {
      let response;
      if (choice == "GET") {
        try {
          response = await axios.get(query);
        } catch (error) {
          if (error.response) {
            response = error.response;
          }
          // TODO gestion des erreurs (404, 500, etc)
        }
      } else if (choice == "POST") {
        try {
          response = await axios.post(query, body);
        } catch (error) {
          if (error.response) {
            response = error.response;
          }
        }
      } else if (choice == "PUT") {
        try {
          response = await axios.put(query, body);
        } catch (error) {
          if (error.response) {
            response = error.response;
          }
        }
      } else if (choice == "DELETE") {
        try {
          response = await axios.delete(query);
        } catch (error) {
          response = error.response;
        }
      }
      this.$store.dispatch("sendRequest", response);
    },
    callApi() {
      // Envoi de la requete API
      if (this.query === "") {
        window.alert("Le champ URL est vide");
      } else {
        this.valid = "Lancer";
        this.makeRequest(this.choice, this.query, this.body);
      }
    }
  }
};
</script>

<style scoped>
.searchbar {
  width: 100%;
}
#input_url {
  width: 40vw;
  height: 4em;
}
#valid {
  margin-left: 1rem;
}
.input-group > *,
.input-group > .input {
  border-radius: 0.5rem;
}
</style>
