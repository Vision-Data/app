<template>
  <div class="select">
    <select
      v-model="choice"
      :required="true"
      class="select select-bordered w-full max-w-xs"
      aria-label="Sélectionnez la méthode d'envoi"
      @change="emitChoice"
    >
      <option v-for="value in choices" :key="value.key" :value="value.method">{{
        value.text
      }}</option>
    </select>
    <button
      class="btn btn-primary"
      id="valid"
      v-if="!isLoading"
      @click="toggleButton()"
    >
      {{ valid }}
    </button>
    <button class="btn btn-outline btn-primary loading" v-if="isLoading">
      Loading...
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
      valid: this.$t("searchbarTooltip.runButton"),
      isLoading: false,
      choices: [
        {
          method: "GET",
          text: `${this.$t("searchbarTooltip.methodGetSelectText")}`,
        },
        {
          method: "POST",
          text: `➤ ${this.$t("searchbarTooltip.methodPostSelectText")}`,
        },
        {
          method: "DELETE",
          text: `🗑 ${this.$t("searchbarTooltip.methodDeleteSelectText")}`,
        },
        {
          method: "PUT",
          text: `✏ ${this.$t("searchbarTooltip.methodPutSelectText")}`,
        },
      ],
      choice: "GET",
    };
  },
  methods: {
    emitChoice() {
      let isSendable = this.choice == "POST" || this.choice == "PUT";
      this.$emit("detectChoice", isSendable);
    },
    toggleButton() {
      this.valid =
        this.valid == this.$t("searchbarTooltip.runButton")
          ? "■"
          : this.$t("searchbarTooltip.runButton");
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
        window.alert(this.$t("searchbarTooltip.emptyInputText"));
      } else {
        this.valid = this.$t("searchbarTooltip.runButton");
        this.makeRequest(this.choice, this.query, this.body);
      }
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
#valid {
  margin-left: 1rem;
}
.input-group > *,
.input-group > .input {
  border-radius: 0.5rem;
}
</style>
