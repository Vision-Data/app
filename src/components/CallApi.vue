<template>
  <div class="select">
    <select
      v-model="choice"
      :required="true"
      class="select select-bordered w-full max-w-xs"
      @change="emitChoice"
    >
      <option v-for="value in choices" :key="value.key" :value="value.method">{{
        value.text
      }}</option>
    </select>
    <button class="btn btn-primary" id="valid" @click="toogleButton()">
      {{ valid }}
    </button>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "SearchBar",
  props: ["query"],
  data() {
    return {
      valid: "Lancer",
      choices: [
        { method: "GET", text: "⇲ Recevoir (GET)" },
        { method: "POST", text: "➤ Envoyer (POST)" },
        { method: "DELETE", text: "🗑 Supprimer (DELETE) " },
        { method: "PUT", text: "⛭ Modifier (PUT)" },
      ],
      choice: "GET",
    };
  },
  methods: {
    emitChoice() {
      let isSendable = this.choice == "POST" || this.choice == "PUT";
      this.$emit("detectChoice", isSendable);
    },
    toogleButton() {
      this.valid = this.valid == "Lancer" ? "■" : "Lancer";
      if (this.valid == "■") {
        this.callApi();
      }
    },
    callApi() {
      let body = { mail: "test@test.fr", password: "azerty-85" };
      // Envoi de la requete API
      if (this.query === "") {
        window.alert("Le champ URL est vide");
      } else {
        if (this.choice == "GET") {
          axios
            .get(this.query)
            .then(function(response) {
              console.log(response.data);
            })
            .catch(function(error) {
              console.log(error);
            });
        } else if (this.choice == "POST") {
          axios
            .post(this.query, body)
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
              console.log(body);
            });
        } else if (this.choice == "PUT") {
          axios
            .put(this.query, body)
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
              console.log(body);
            });
        } else if (this.choice == "DELETE") {
          axios
            .delete(this.query)
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
              console.log(body);
            });
        }
      }

      this.valid = "Lancer";
    },
  },
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
</style>
