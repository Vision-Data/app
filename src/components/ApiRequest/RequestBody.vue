<template>
  <div class="modal" :class="{ 'modal-open': needBodyToSend}">
    <div class="modal-box">
      <div class="form-control" v-if="needBodyToSend">
        <label class="label">
          <span class="label-text">Body (Données à envoyer)</span>
        </label>

        <prism-editor class="my-editor" v-model="code" :highlight="highlighter" line-numbers @change="emitBody"></prism-editor>
      </div>
      <div class="modal-action">
        <label for="my-modal-2" class="btn btn-primary" @click="close">Enregistrer</label>
      </div>
    </div>
  </div>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  name: "RequestBody",
  props: ["needBodyToSend"],
  components: { PrismEditor },
  data() {
    return {
      code: "{\n\tvalue:''\n}"
    };
  },
  methods: {
    close() {
        this.$emit('close', false)
    },
    highlighter(code) {
      return highlight(code, languages.js);
    },
    emitBody() {
      this.$emit("requestBodyContent", this.code);
    }
  }
};
</script>

<style scoped>
.modal {
  margin: 0;
  max-width: unset;

}
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;
  height: 300px;
  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  border-radius: .5rem;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
