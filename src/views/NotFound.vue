<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div>
        <h1 class="text-8xl font-bold text-primary">404</h1>
        <h2 class="text-4xl">
          {{ $t('commons.unavailableTitle') }}
        </h2>
        <p class="py-6">
          {{ $t('commons.unavailableText') }}
        </p>
        <router-link to="/workspaces" class="btn btn-primary">
          {{ $t('commons.returnHome') }}
        </router-link>
      </div>
    </div>
  </div>
</template>
