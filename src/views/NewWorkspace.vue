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
      <input
        class="input create"
        type="button"
        value="CRÉER"
        @click="create()"
      />
      <div v-if="ErrorMessage != null" class="error">
            <span>{{ ErrorMessage }}</span>
          </div>
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
      ErrorMessage: null
    };
  },
  methods: {
    create() {
      const api = process.env.VUE_APP_HOST_API;
      axios
        .post(
          api + `workspaces`,
          {
            name: this.name,
            logo: this.img,
            color: this.colorChoice,
          },
          {
            headers: {
              Authorization:
                "Bearer MTI.ROkXjpHuqKW8a4_G3LUPRRGnV76RwXGvqoRbuGifNHeJyEShKJU227CvOEb9",
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.$router.push("/");
        })
        .catch((error) => {
          let errors = error.response.data.errors;
          this.ErrorMessage = null;
          this.ErrorMessage = errors[0].message;
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

.name,
.picture {
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


.error {
  background-color: #f16e6e;
  border: red solid 1px;
  border-radius: 5px;
  color: white;
  padding: 1%;
  margin: 1%;
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