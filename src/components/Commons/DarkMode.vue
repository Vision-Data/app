<template>
  <button
    id="change-theme"
    @click="changeTheme()"
    class="bg-base-300"
    :aria-label="$t('commons.changeTheme')"
    :title="$t('commons.changeTheme')"
  >
    <div class="sun" v-if="!isDark">
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
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </div>
    <div class="moon" v-else>
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
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </div>
  </button>
</template>

<script>
export default {
  name: "dark-mode",
  data: () => ({
    isDark: false,
  }),
  created() {
    if (
      (window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches &&
        localStorage.getItem("dark") === "true") ||
      localStorage.getItem("dark") === "true"
    ) {
      this.isDark = true;
      this.toDark();
    } else {
      this.toLight();
      this.isDark = false;
    }
  },
  methods: {
    changeTheme() {
      this.isDark = !this.isDark;
      if (this.isDark) this.toDark();
      else this.toLight();
    },
    toDark() {
      document.querySelector("html").setAttribute("data-theme", "dark");
      localStorage.setItem("dark", true);
    },
    toLight() {
      document.querySelector("html").setAttribute("data-theme", "visionTheme");
      localStorage.setItem("dark", false);
    },
  },
};
</script>

<style scoped>
#change-theme {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  border-radius: 0.3rem;
  position: fixed;
  top: 1rem;
  right: 1rem;
  box-shadow: 0px 0px 0 2px hsl(var(--b1)), 0px 0px 0 0px gray;
  transition: box-shadow 0.2s ease-in;
}
#change-theme:focus {
  box-shadow: 0px 0px 0 2px hsl(var(--b1)), 0px 0px 0 4px gray;
}
</style>
