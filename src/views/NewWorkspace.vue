<template>
  <div class="new-workspace">
    <header>
      <dark-mode />
    </header>
    <div class="new-workspace-form">
      <img id="logo" :src="require(`@/assets/watermark-color.png`)" alt="logo-vision" />
      <h1>Créer un espace de travail</h1>
      <form class="w-full max-w-xs" @submit.prevent="create">
        <div class="form-control w-full max-w-xs name">
          <label class="label">
            <span class="label-text">{{ $t('newWorkspace.name') }}</span>
          </label>
          <input type="text" :placeholder="$t('newWorkspace.namePlaceholder')" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors && errors.name }" v-model="form.name" />
          <ErrorLabel :label="errors.name" v-if="errors && errors.name" />
        </div>

        <div class="form-control w-full max-w-xs color">
          <label class="label">
            <span class="label-text">{{ $t('newWorkspace.color') }}</span>
          </label>
          <div class="color-body">
            <input type="color" :class="{ 'input-error': errors && errors.color }" v-model="form.color" />
            <p>{{ form.color }}</p>
          </div>
          <ErrorLabel :label="errors.color" v-if="errors && errors.color" />
        </div>

        <div class="form-control w-full max-w-xs picture">
          <label class="label">
            <span class="label-text">{{ $t('newWorkspace.image') }}</span>
          </label>
          <input type="text" placeholder="https://..." class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors && errors.logo }" v-model="form.logo" />
          <ErrorLabel :label="errors.logo" v-if="errors && errors.logo" />
        </div>

        <div class="form-control w-full max-w-xs mt-4">
          <Button class="btn btn-primary" @click.prevent="create" :isLoading="isLoading">{{ $t('newWorkspace.createButton') }}</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import DarkMode from "../components/Commons/DarkMode.vue";
import WorkspaceService from "../services/VisionApi/Workspace.js";
import Button from "../components/Commons/Form/Button.vue";
import ErrorLabel from "../components/Commons/Form/ErrorLabel.vue";

export default {
  name: "NewWorkspace",
  data() {
    return {
      form: { color: "#000000", name: "", logo: null },
      errors: null,
      isLoading: false,
    };
  },
  components: {
    DarkMode,
    Button,
    ErrorLabel,
  },
  methods: {
    async create() {
      this.isLoading = true;
      this.errors = null;
      const { response, errors } = await WorkspaceService.create(
        this.$store.state.token,
        this.form
      );
      this.isLoading = false;

      this.errors = errors;
      if (!this.errors) {
        this.$router.push({
          name: "Workspaces",
          params: { id: response.data.id },
        });
      }
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
</style>