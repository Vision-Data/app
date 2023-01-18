<template>
  <div
    class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-8"
  >
    <ul class="flex flex-wrap -mb-px">
      <li
        v-for="title in tabTitles"
        :key="title"
        class="mr-8"
        role="button"
        tabIndex="0"
        @click="selectedTitle = title"
        @keypress.enter="selectedTitle = title"
      >
        <a
          href="#"
          class="inline-block py-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
          :class="{
            'text-primary': selectedTitle === title,
            'border-primary': selectedTitle === title,
          }"
          >{{ title }}</a
        >
      </li>
    </ul>
  </div>
  <slot />
</template>

<script>
  import { ref, provide } from 'vue';

  export default {
    name: 'Tabs',
    setup(props, { slots }) {
      const tabTitles = ref(slots.default().map((tab) => tab.props.title));
      const selectedTitle = ref(tabTitles.value[0]);

      provide('selectedTitle', selectedTitle);

      return {
        selectedTitle,
        tabTitles,
      };
    },
  };
</script>
