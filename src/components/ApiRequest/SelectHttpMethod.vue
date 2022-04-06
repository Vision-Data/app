<template>
  <div class="select">
    <select
      v-model="choice"
      :required="true"
      class="select select-bordered w-200"
      aria-label="Sélectionnez la méthode d'envoi"
      @change="emitChoice"
    >
      <option v-for="value in choices" :key="value.key" :value="value.method">{{
        value.text
      }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectHttpMethod",
  props: ["query", "body"],
  data() {
    return {
      choices: [
        {
          method: "GET",
          text: `${this.$t("searchbarTooltip.methodGetSelectText")}`,
        },
        {
          method: "POST",
          text: `➤ ${this.$t("searchbarTooltip.methodPostSelectText")}`,
        },
        {
          method: "DELETE",
          text: `🗑 ${this.$t("searchbarTooltip.methodDeleteSelectText")}`,
        },
        {
          method: "PUT",
          text: `✏ ${this.$t("searchbarTooltip.methodPutSelectText")}`,
        },
      ],
      choice: "GET",
    };
  },
  methods: {
    emitChoice() {
      this.$emit("detectChoice", this.choice);
    },
  },
};
</script>
