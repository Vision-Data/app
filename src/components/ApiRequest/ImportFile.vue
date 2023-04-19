<template>
  <label
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    for="file_input"
  >
    <input
      id="file_input"
      type="file"
      class="file-input w-full max-w-xs"
      @change="onChange"
    />
  </label>
</template>

<script>
  export default {
    name: 'ImportFile',
    emits: ['loadFile'],
    methods: {
      onChange(e) {
        if (e.target.files.length > 0) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = async (e) => {
            const text = e.target.result;
            try {
              const textToJson = JSON.parse(text);
              this.$store.dispatch('sendRequest', {
                data: textToJson,
                status: 200,
              });

              this.$emit('loadFile', textToJson);
            } catch (e) {
              this.$notyf.error(
                'Une erreur est survenue lors du chargement du fichier. Seul les fichiers JSON sont acceptés.'
              );

              await this.$store.dispatch('sendRequest', {
                data: null,
                status: 400,
              });
            }
          };
        }
      },
    },
  };
</script>
