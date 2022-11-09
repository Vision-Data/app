<template>
  <div class="selectMethod">
    <select
      v-model="choiceTextComputed"
      :required="true"
      class="select select-bordered w-200"
      aria-label="Sélectionnez la méthode d'envoi"
      @change="emitChoice"
    >
      <option v-for="value in choices" :key="value.key" :value="value.method">
        {{ value.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectHttpMethod",
  props: {
    choice: {
      type: String,
      default: "GET",
    },
  },
  data() {
    return {
      choices: [
        {
          method: "GET",
          text: `Recevoir (GET)`,
        },
        {
          method: "POST",
          text: `➤ Envoyer (POST)`,
        },
        {
          method: "DELETE",
          text: `🗑 Supprimer (DELETE)`,
        },
        {
          method: "PUT",
          text: `✏ Modifier (PUT)`,
        },
      ],
      choiceText: "GET",
    };
  },
  watch: {
    choice() {
      this.choiceTextComputed = this.choice;
    },
  },
  computed: {
    choiceTextComputed: {
      get() {
        return this.choiceText;
      },
      set(value) {
        if (value === "") value = "GET";
        this.choiceText = value;
      },
    },
  },
  methods: {
    emitChoice() {
      this.$emit("detectChoice", this.choiceText);
    },
  },
};
</script>
