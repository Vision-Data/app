<template>
  <div class="form-control" v-if="needBodyToSend">
    <label class="label">
      <span class="label-text">Body (Données à envoyer)</span>
    </label>
    <textarea class="textarea h-24 textarea-bordered" placeholder="Body" />
  </div>
</template>

<script>
export default {
  name: "RequestBody",
  props: ["needBodyToSend"],
  components: {},
};
</script>

<style></style>
