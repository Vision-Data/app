<template>
  <Modal :isOpen="needBodyToSend" :closeLabel="$t('requestBody.saveButton')" :title="$t('requestBody.bodyTitle')">
    <div class="form-control">
      <prism-editor class="my-editor" v-model="codeComputed" :highlight="highlighter" line-numbers @change="emitBody"></prism-editor>
    </div>
  </Modal>
</template>

<script>
import Modal from "../Commons/Modal.vue";
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

export default {
  name: "RequestBody",
  props: ["needBodyToSend", "content"],
  components: { PrismEditor, Modal },
  data() {
    return {
      code: "",
    };
  },
  watch: {
    content() {
      this.codeComputed = this.content;
    },
  },
  computed: {
    codeComputed: {
      get() {
        return this.code;
      },
      set(value) {
        if (value === "") value = "{\n\tvalue:''\n}";
        this.code = value;
      },
    }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js);
    },
    emitBody() {
      this.$emit("requestBodyContent", this.code);
    },
  },
};
</script>

<style scoped>
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
  border-radius: 0.5rem;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
