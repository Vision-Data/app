<template>
  <div class="registration-page">
    <img
      id="logo"
      :src="require(`@/assets/watermark-color.png`)"
      alt="logo-vision"
    />
    <div id="email">
      <h2>Inscription</h2>
      <div class="mail">
        <label class="registration-info" for="email">Adresse Email</label>
        <input
          class="registration-info"
          type="email"
          name="email"
          placeholder="Adresse Email"
        />
      </div>

      <div id="pseudo">
        <label class="registration-info" for="pseudo">Pseudo</label>
        <input
          class="registration-info"
          type="text"
          name="pseudo"
          placeholder="Nom ou Pseudo"
        />
      </div>

      <div id="password">
        <label class="registration-info" for="password">Mot de passe</label>
        <input
          class="password-info"
          type="password"
          name="passwords"
          placeholder="Mot de passe"
        />
        <input
          class="password-info"
          type="password"
          name="passwords"
          placeholder="Confirmation du mot de passe"
        />
      </div>
    </div>
    <div class="registration">
      <button class="btn btn-primary registration-button">INSCRIPTION</button>
      <a href="#"
        ><span class="login"
          >Vous avez déjà un compte ? Connectez-vous !</span
        ></a
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
</template>

<script>
export default {
  name: "registration",
};
</script>

<style scoped>
:focus-visible {
  outline: none;
}

.registration-page {
  width: 30%;
  background-color: #f6f6f6;
  margin: 150px;
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

h2 {
  color: #242424;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
}

#logo {
  width: 35%;
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

.third-part button .logo-registration {
  width: 7%;
  margin-right: 15px;
}
label.registration-info {
  width: 55%;
  text-align: left;
}

input.registration-info {
  width: 60%;
  margin: 2% 0%;
  padding: 2%;
  border-radius: 10px;
}

#password {
  margin-bottom: 5%;
}

.password-info {
  width: 60%;
  margin-bottom: 5px;
  padding: 2%;
  border-radius: 10px;
}

.registration-button {
  width: 60%;
}

.login {
  color: #fa810f;
}
</style>
