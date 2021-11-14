<template>
  <div class="form-control">
    <input
      type="text"
      placeholder="https://api.example.com/v1"
      class="input input-bordered"
      v-model="request"
    />
  </div>
</template>

<script>
export default { name: "SearchBar", request: "" };
</script>
