<template>
  <span v-if="isHttps">
    <ToolTipInformations
      direction="bottom"
      helper-text="URL Sécurisée"
      color="primary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="#fe932f"
      >
        <path
          fill-rule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clip-rule="evenodd"
        />
      </svg>
    </ToolTipInformations>
  </span>

  <span v-else>
    <ToolTipInformations
      direction="bottom"
      helper-text="URL non sécurisée"
      color="primary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
        />
      </svg>
    </ToolTipInformations>
  </span>
</template>

<script>
  import ToolTipInformations from '../Commons/ToolTipInformations.vue';
  export default {
    name: 'SecurityLock',
    components: { ToolTipInformations },
    props: ['isHttps'],
  };
</script>

<style></style>
