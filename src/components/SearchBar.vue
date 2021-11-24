<template>
  <div class="form-control">
    <input
      type="text"
      placeholder="https://api.example.com/v1"
      class="input input-bordered"
      v-model="request"
      @change="emitResearch"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  request: "",
  methods: {
    emitResearch() {
      this.$emit("research", this.request);
    },
  },
};
</script>
