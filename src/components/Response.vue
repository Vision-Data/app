<template>
  <div class="response">
    <div class="alert alert-success">
      <div class="flex-1">
        <label>
          <button class="badge bg-success border-transparent">Etat</button> 200
          : OK !</label
        >
      </div>
    </div>

    <div class="alert alert-info">
      <div class="flex-1">
        <label>
          <button class="badge bg-info border-transparent">ID</button> {{ id }}
        </label>
      </div>
    </div>

    <Data />
  </div>
</template>

<script>
import Data from "./Data.vue";
export default {
  name: "Response",
  components: {
    Data,
  },
  data() {
    return {
      id: 1,
    };
  },
};
</script>

