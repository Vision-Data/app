<template>
  <div class="body">
    <div class="login-page">
      <img
        id="logo"
        :src="require(`@/assets/watermark-color.png`)"
        alt="logo-vision"
      />
      <div class="third-part">
        <h2>Connexion</h2>
        <button>
          <img
            class="logo-login"
            :src="require(`@/assets/LogoGoogle.png`)"
            alt="logo-vision"
          />
          Connexion avec Google
        </button>
        <button>
          <img
            class="logo-login"
            :src="require(`@/assets/LogoGithub.png`)"
            alt="logo-vision"
          />Connexion avec Github
        </button>
      </div>
      <div class="email">
        <h2>OU</h2>
        <div class="mail">
          <label class="login-info" for="email">Adresse Email</label>
          <input
            v-model="email"
            class="login-info"
            type="email"
            name="email"
            placeholder="Adresse Email"
          />
        </div>
        <div class="password">
          <label class="login-info" for="password">Mot de passe</label>
          <input
            v-model="password"
            class="login-info"
            type="password"
            name="passwords"
            placeholder="Mot de passe"
          />
        </div>
      </div>
      <div class="login">
        <button class="btn btn-primary login-button" @click="login()">
          CONNEXION
        </button>
        <router-link to="/register">
          <span class="register">
            Vous n'avez pas de compte ? Inscrivez-vous !
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      const api = process.env.VUE_APP_HOST_API;
      axios
        .post(api + `login`, {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/");
        })
        .catch(function (error) {
          let error1 = error.response.data
          console.log(error1[0]);
        });
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  height: 100vh;
}

:focus-visible {
  outline: none;
}

.login-page {
  width: 40%;
}

.third-part,
.mail,
.password,
.login {
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h2 {
  color: #242424;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
}

#logo {
  width: 50%;
  margin: 5%;
  margin-left: auto;
  margin-right: auto;
}

.third-part button {
  background-color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #686868;
  font-weight: 600;
  font-size: 20px;
  width: 60%;
  margin: 2%;
  padding: 2%;
  border-radius: 10px;
}

.third-part button .logo-login {
  width: 7%;
  margin-right: 15px;
}
label.login-info {
  width: 55%;
  text-align: left;
}

input.login-info {
  width: 60%;
  margin: 2% 0% 6% 4%;
  padding: 2%;
  border-radius: 10px;
}

.login-button {
  width: 60%;
}

.register {
  color: #fa810f;
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
