<template>
  <div>
    <select v-model="$i18n.locale" class="select select-bordered max-w-xs">
      <option
        v-for="option in orderedItems(optionsList)"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectLang',
  currentValue: 'fr',
  data() {
    return {
      optionsList: [
        { value: 'en', text: 'English', selected: this.$i18n.locale === 'en' },
        { value: 'fr', text: 'Français', selected: this.$i18n.locale === 'fr' }
      ]
    };
  },
  methods: {
    sortItems(list) {
      return list.sort((a, b) => {
        if (a.selected) {
          return -1;
        }
        if (b.selected) {
          return 1;
        }
        return 0;
      });
    },

    orderedItems(list) {
      return this.sortItems(list);
    }
  }
};
</script>
