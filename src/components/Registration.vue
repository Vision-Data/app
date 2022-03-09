<template>
  <div class="body">
    <div class="registration-page">
      <img
        id="logo"
        :src="require(`@/assets/watermark-color.png`)"
        alt="logo-vision"
      />

      <h2 id="title">Inscription</h2>
      <div class="choice">
        <div class="standard">
          <div id="registration-inputs">
            <div class="mail">
              <label class="registration-info" for="email">Adresse Email</label>
              <input
                v-model="email"
                class="registration-info"
                type="email"
                name="email"
                placeholder="Adresse Email"
              />
            </div>

            <div id="pseudo">
              <label class="registration-info" for="pseudo">Pseudo</label>
              <input
                v-model="pseudo"
                class="registration-info"
                type="text"
                name="pseudo"
                placeholder="Nom ou Pseudo"
              />
            </div>

            <div id="password">
              <label class="registration-info" for="password"
                >Mot de passe</label
              >
              <input
                v-model="password"
                class="password-info"
                type="password"
                name="password"
                placeholder="Mot de passe"
              />
              <input
                v-model="passwordConf"
                class="password-info"
                type="password"
                name="password"
                placeholder="Confirmation du mot de passe"
              />
            </div>
          </div>
          <div class="registration">
            <button class="btn btn-primary registration-button" >
              INSCRIPTION
            </button>

            <router-link to="/login"
              ><span class="login"
                >Vous avez déjà un compte ? Connectez-vous !</span
              ></router-link
            >
          </div>
          <div
            v-if="message"
            class="alert"
            :class="successful ? 'alert-success' : 'alert-danger'"
          >
            {{ message }}
          </div>
        </div>
        <h2>OU</h2>
        <div class="third-part">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registration",
  
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

h2 {
  color: #242424;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
}

.registration-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.registration-page #title {
  margin-bottom: 2%;
}

#logo {
  width: 30%;
  margin: 3%;
  margin-left: auto;
  margin-right: auto;
}

.choice {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
}

.standard {
  width: 100%;
}

label.registration-info {
  width: 70%;
  text-align: left;
}

input.registration-info {
  width: 75%;
  margin: 2% 0%;
  padding: 2%;
  border-radius: 10px;
}

#password {
  margin-bottom: 5%;
}

.password-info {
  width: 75%;
  margin-bottom: 5px;
  padding: 2%;
  border-radius: 10px;
}

.registration-button {
  width: 75%;
}

.login {
  color: #fa810f;
}

.third-part,
.mail,
#pseudo,
#password,
.registration {
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  width: 75%;
  margin: 2%;
  padding: 2%;
  border-radius: 10px;
}

.third-part button .logo-registration {
  width: 7%;
  margin-right: 15px;
}

.third-part button .logo-login {
  width: 7%;
  margin-right: 15px;
}

@media (max-width: 950px) {
  .choice {
    flex-direction: column-reverse;
  }
}

@media (max-width: 800px) {
  .registration-page {
    width: 80%;
  }
  #logo {
    margin: 5%;

    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 550px) {
  .registration-page {
    width: 90%;
  }
  #logo {
    margin: 5%;

    margin-left: auto;
    margin-right: auto;
  }

  .third-part button {
    font-size: 16px;
  }
}
</style>
