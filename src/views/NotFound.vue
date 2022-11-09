<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div>
        <h1 class="text-8xl font-bold text-primary">404</h1>
        <h2 class="text-4xl">{{ "Ressources Indisponible" }}</h2>
        <p class="py-6">
          {{ "La page que vous recherchez n'existe pas ou plus." }}
        </p>
        <router-link to="/workspaces" class="btn btn-primary">{{
          "Retour à l'accueil"
        }}</router-link>
      </div>
    </div>
  </div>
</template>
