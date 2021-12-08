<template>
  <div class="select">
    <select
      v-model="choice"
      :required="true"
      class="select select-bordered w-full max-w-xs">
      <option v-for="value in choices" :key="value.key" :value="value.method">{{ value.text }}</option>

    </select>
    <button class="btn btn-primary" id="valid" @click="toogleButton()">
      {{ valid }}
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: ["query"],
  data() {
    return {
      valid: "Lancer",
      choices: [
        {method : "GET", text: "⇲ Recevoir (GET)"},
        {method : "POST", text: "➤ Envoyer (POST)"},
        {method : "DELETE", text: "🗑 Supprimer (DELETE) "},
        {method : "PUT", text: "⛭ Modifier (PUT)"}
      ],
      choice: "GET",
    };
  },
  methods: {
    toogleButton() {
      this.valid = this.valid == "Lancer" ? "■" : "Lancer";
      if (this.valid == "■") {
        this.callApi();
      }
    },
    callApi() {
      let mail = "test@test.fr";
      let password = "azerty-85";
      // Envoi de la requete API
      if (this.query === "") {
        window.alert("Le champ URL est vide");
      } else {
        if (this.choice == "GET") {
          fetch(this.query, {
            method: this.choice,
            headers: { "Content-Type": "application/json" }
          })
            .then((r) => r.json())
            .then((res) => {
              console.log(res.results);
            })
            .catch(function (error) {
              console.log(error);
            });
        }else if(this.choice == "POST" || this.choice == "DELETE" || this.choice == "PUT")
        fetch(this.query, {
          method: this.choice,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mail: mail,
            password: password,
          }),
        })
          .then((r) => r.json())
          .then((res) => {
            console.log(res);
          })
          .catch(function (error) {
            console.log(error);
          });
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
