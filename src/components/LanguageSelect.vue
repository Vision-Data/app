<template>
  <div>
    <select class="select select-bordered  max-w-xs" v-model="$i18n.locale">
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "selectLang",
};
</script>
