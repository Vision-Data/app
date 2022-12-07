<template>
  <div class="new-workspace">
    <header>
      <Logout />
      <dark-mode />
    </header>
    <div class="new-workspace-form">
      <img
        id="logo"
        :src="require(`@/assets/watermark-color.png`)"
        alt="logo-vision"
      />
      <h1>{{ 'Créer un espace de travail' }}</h1>
      <form class="w-full max-w-xs" @submit.prevent="create">
        <div class="form-control w-full max-w-xs name">
          <label class="label">
            <span class="label-text">{{ "Nom de l'espace de travail" }}</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Nom"
            class="input input-bordered w-full max-w-xs"
            :class="{ 'input-error': errors && errors.name }"
          />
          <ErrorLabel v-if="errors && errors.name" :label="errors.name" />
        </div>

        <div class="form-control w-full max-w-xs color">
          <label class="label">
            <span class="label-text">{{ 'Couleur' }}</span>
          </label>
          <div class="color-body">
            <input
              v-model="form.color"
              type="color"
              :class="{ 'input-error': errors && errors.color }"
            />
            <p>{{ form.color }}</p>
          </div>
          <ErrorLabel v-if="errors && errors.color" :label="errors.color" />
        </div>

        <div class="form-control w-full max-w-xs picture">
          <label class="label">
            <span class="label-text">{{ "Image de l'espace de travail" }}</span>
          </label>
          <input
            v-model="form.logo"
            type="text"
            placeholder="https://..."
            class="input input-bordered w-full max-w-xs"
            :class="{ 'input-error': errors && errors.logo }"
          />
          <ErrorLabel v-if="errors && errors.logo" :label="errors.logo" />
        </div>

        <div class="buttons form-control w-full max-w-xs mt-4">
          <Button
            class="btn btn-primary"
            :is-loading="isLoading"
            @click.prevent="create"
            >{{ 'Créer' }}</Button
          >
          <Button class="btn btn-primary go-back" @click="goBack()">
            {{ 'Annuler' }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import DarkMode from '../components/Commons/DarkMode.vue';
  import Logout from '../components/Commons/Logout.vue';
  import WorkspaceService from '../services/VisionApi/Workspace.js';
  import Button from '../components/Commons/Form/Button.vue';
  import ErrorLabel from '../components/Commons/Form/ErrorLabel.vue';

  export default {
    name: 'NewWorkspace',
    components: {
      DarkMode,
      Button,
      ErrorLabel,
      Logout,
    },
    data() {
      return {
        form: { color: '#000000', name: '', logo: null },
        errors: null,
        isLoading: false,
      };
    },
    methods: {
      async create() {
        this.isLoading = true;
        const { response, errors } = await WorkspaceService.create(
          this.$store.state.token,
          this.form
        );
        this.isLoading = false;

        this.errors = errors;
        if (!this.errors) {
          this.$notyf.success('Bienvenue dans votre nouvel espace de travail');
          this.$router.push({
            name: 'Workspace',
            params: { workspaceId: response.data.id },
          });
        }
      },
      goBack() {
        this.$router.push('/workspaces');
      },
    },
  };
</script>

<style scoped>
  .new-workspace {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .color-body {
    display: flex;
    justify-content: space-between;
  }

  .color-body input {
    background: none;
  }

  :focus-visible {
    outline: none;
  }

  .form-control > div {
    margin-bottom: 15px;
  }

  .input {
    font-weight: bold;
  }

  h1 {
    color: var(-pc);
    font-weight: bold;
    text-align: center;
    font-size: 20px;
  }
  #logo {
    margin: 0 auto;
    width: 20rem;
    margin-bottom: 2rem;
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
    background-color: var(--pf);
    color: var(--color-white);
    width: 100%;
  }

  .error {
    background-color: #f16e6e;
    border: red solid 1px;
    border-radius: 5px;
    color: white;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .buttons > .btn {
    width: fit-content;
  }

  .buttons .go-back {
    background-color: transparent;
    color: #fa810f;
    border: 2px #fa810f solid;
  }

  .buttons .go-back:hover {
    background-color: #fa810f;
    color: #fff;
    border: 2px #fa810f solid;
  }
</style>
