<template>
  <div class="form-control">
    <input
      type="text"
      placeholder="https://api.example.com/v1"
      class="input input-bordered"
      v-model="request"
      @change="emitQuery"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      request: null,
    }
  },
  methods: {
    emitQuery() {
      this.$emit("query", this.request);
    },
  },
};
</script>
