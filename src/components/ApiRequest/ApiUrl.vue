<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text text-gray-500">
        {{ "URL de l'API" }}
        <ToolTipInformations
          direction="top"
          helperText="L'URL est le chemin d'accès des informations débutant généralement par https:"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </ToolTipInformations>
      </span>
    </label>

    <div class="relative">
      <label class="input-group">
        <SecurityLock :isHttps="isHttps" />
        <input
          v-model="searchInputComputed"
          @change="emitQuery"
          type="text"
          @keyup="checkHttps"
          placeholder="https://api.example.com/v1"
          class="w-full pr-16 input input-primary input-bordered rounded-r"
          :class="{ 'input-error': pasteError }"
          aria-label="Insérer le chemin l'API"
        />
        <ToolTipInformations
          direction="bottom"
          helperText="Coller le contenu"
          color="primary"
        >
          <Button
            class="btn-ghost absolute top-0 right-0 rounded-l-none"
            @click="pasteContent()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </Button>
        </ToolTipInformations>
      </label>

      <label class="label" v-if="pasteError">
        <span class="label-text-alt text-error">
          {{ "Vous devez autoriser l'accès à votre presse papier" }}
        </span>
      </label>
    </div>
  </div>
</template>

<script>
import SecurityLock from "./SecurityLock.vue";
import ToolTipInformations from "../Commons/ToolTipInformations.vue";
import Button from "../Commons/Form/Button.vue";

export default {
  name: "ApiUrl",
  components: { SecurityLock, ToolTipInformations, Button },
  props: ["content"],
  data() {
    return {
      searchInput: "",
      pasteError: false,
      isHttps: false,
    };
  },
  watch: {
    content() {
      this.searchInputComputed = this.content;
    },
  },
  computed: {
    searchInputComputed: {
      get() {
        return this.searchInput;
      },
      set(value) {
        this.searchInput = value;
      },
    },
  },
  methods: {
    async pasteContent() {
      this.pasteError = false;
      try {
        this.searchInput = await navigator.clipboard.readText();
        this.checkHttps();
        this.emitQuery();
      } catch (error) {
        this.pasteError = true;
      }
    },
    checkHttps() {
      this.isHttps = this.searchInput.slice(0, 5).includes("https");
    },
    emitQuery() {
      this.$emit("query", this.searchInput);
    },
  },
};
</script>

<style scoped>
.rounded-r {
  border-top-right-radius: 0.5rem !important;
  border-bottom-right-radius: 0.5rem !important;
}
</style>
