<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">
        URL de l'API

        <ToolTipInformations
          direction="top"
          helperText="L'URL est le chemin d'accès des informations débutant généralement par https://"
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
        <SecurityLock :isHttps="false" />
        <input
          type="text"
          placeholder="https://api.example.com/v1"
          class="w-full pr-16 input input-primary input-bordered"
        />
        <ToolTipInformations
          direction="bottom"
          helperText="Coller"
          color="primary"
        >
          <button class="absolute top-0 right-0 rounded-l-none btn btn-ghost">
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
          </button>
        </ToolTipInformations>
      </label>
    </div>
  </div>
</template>

<script>
import SecurityLock from "./SecurityLock.vue";
import ToolTipInformations from "./ToolTipInformations.vue";
export default {
  name: "SearchBar",
  request: "",
  components: { SecurityLock, ToolTipInformations }
};
</script>

<style></style>
