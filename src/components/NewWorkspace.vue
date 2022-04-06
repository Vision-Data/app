<template>
  <div class="body">
    <img
      id="logo"
      :src="require(`@/assets/watermark-color.png`)"
      alt="logo-vision"
    />
    <h1>Créer un espace de travail</h1>
    <div class="form-control">
      <div class="picture">
        <label class="label" for="img">Lien de l'image</label>
        <input
          class="input"
          type="text"
          name="img"
          id=""
          v-model="img"
          placeholder="https://google.com/image.jpg"
        />
      </div>
      <div class="color">
        <label class="label" for="color">Couleur</label>
        <div class="value">
          <p>
            <strong>{{ colorChoice }}</strong>
          </p>
          <input type="color" name="color" id="" v-model="colorChoice" />
        </div>
      </div>
      <div class="name">
        <label class="label" for="name">Nom de l'espace de travail</label>
        <input
          class="input"
          type="text"
          name="name"
          id=""
          v-model="name"
          placeholder="Nom"
        />
      </div>
      <input class="input create" type="button" value="CRÉER" @click="create()" />
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "NewWorkspace",
  data() {
    return {
      colorChoice: "#778822",
      name: "",
      img: null,
    };
  },
  methods: {
    create() {
      const api = process.env.VUE_APP_HOST_API;
      axios
        .post(api + `workspaces`, 
        {headers: { Authorization: "Bearer NQ.Ci4NVEWZz27UsPm1wJk0zdYMDBnpi6mSSFCA7r4j829nno5RDoc9L3veX7j5"}},
        {
          name: this.name,
          logo: this.img,
          color: this.colorChoice,

        })
        .then((response) => {
          console.log(response);
          this.$router.push("/");
        })
        .catch((error) => {
          let errors = error.response.data.errors;
          this.passwordError = null;
          this.passwordError = errors[0].message;
        });
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
:focus-visible {
  outline: none;
}

.body .form-control {
  display: flex;
  flex-direction: column;
  width: 25%;
}

.form-control > div {
  margin-bottom: 15px;
}

.input {
  font-weight: bold;
}

h1 {
  color: #242424;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
}
#logo {
  width: 20%;
  margin: 2%;
  margin-left: auto;
  margin-right: auto;
}

.color {
  display: flex;
  justify-content: space-between;
}

.color .value {
  display: flex;
}

.name, .picture {
  display: flex;
  flex-direction: column;
}

.create {
  border-radius: 10px;
  padding: 1px;
  background-color: #fa810f;
  color: white;
  width: 100%;
}

@media (max-width: 1250px) {
  .login-page {
    width: 50%;
  }
}
@media (max-width: 800px) {
  .login-page {
    width: 80%;
  }
  #logo {
    margin: 5%;
    margin-left: auto;
    margin-right: auto;
  }
}
@media (max-width: 500px) {
  .login-page {
    width: 90%;
  }
  #logo {
    margin: 5%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>