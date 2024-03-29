<template>
  <div :key="index" :class="{ response: fullwidth }">
    <div
      class="alert"
      :class="{
        'alert-success':
          responseData && responseData.status?.toString().startsWith('2'),
        'alert-error':
          responseData && !responseData.status?.toString().startsWith('2'),
      }"
    >
      <div class="flex-1">
        <span
          class="badge border-transparent"
          :class="{
            'bg-success':
              responseData && responseData.status?.toString().startsWith('2'),
            'bg-error':
              responseData && !responseData.status?.toString().startsWith('2'),
          }"
        >
          État</span
        >
        {{ responseData?.status }} : {{ responseData?.statusText }}
      </div>
    </div>
    <div class="alert bg-base-200">
      <div class="result-container">
        <b> {{ 'Résultats' }}</b>
        <template v-for="(component, index) in components" :key="index">
          <component
            :is="components[index].component"
            :name="components[index].name"
            :data="components[index].data"
            :color="components[index].color"
          >
          </component>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import ValueComponent from '../DataTypes/Value.vue';
  import ObjectComponent from '../DataTypes/Object.vue';
  import ArrayComponent from '../DataTypes/Array.vue';
  import Recursive from '../../services/recursive.js';
  import { markRaw } from 'vue';
  export default {
    name: 'Response',
    components: {
      ValueComponent,
      ObjectComponent,
      ArrayComponent,
    },
    props: ['fullwidth'],
    emits: ['launch-modal'],
    data() {
      return {
        index: 0,
        responseData: this.$store.state.response,
        components: [],
        comps: {
          ValueComponent: markRaw(ValueComponent),
          ObjectComponent: markRaw(ObjectComponent),
          ArrayComponent: markRaw(ArrayComponent),
        },
      };
    },

    created() {
      this.unwatch = this.$store.watch(
        (state) => state.response,
        (newValue) => {
          this.responseData = newValue;
          this.index = this.index + 1;
          this.parseData();
        }
      );
    },
    beforeUnmount() {
      this.unwatch();
    },
    methods: {
      launchModal() {
        this.$emit('launch-modal', true);
      },
      parseData() {
        if (this.responseData?.data) {
          this.components = Recursive.recursive(
            this.responseData?.data,
            this.comps
          );
        }
      },
    },
  };
</script>

<style>
  .selected {
    --tw-bg-opacity: 0.4 !important;
  }
  .alert.selected {
    color: rgb(78, 78, 78);
  }
  .value:not(.selected):not(.selected-value) {
    color: rgb(78, 78, 78) !important;
  }
  .response *::selection {
    background-color: #414141 !important;
    color: rgb(255, 255, 255) !important;
  }
  .response {
    width: 50%;
  }
  .result-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .result-container .object > .flex-1 > .value-line > .alert {
    margin: 2px;
    padding: 10px !important;
  }
  .selection-data {
    position: absolute;
    top: 0;
    right: 0;
  }
  .selection-data-x {
    position: absolute;
    top: 0;
    right: 2rem;
  }
  .selection-data-y {
    position: absolute;
    top: 0;
    right: 0;
  }
  .alert {
    margin: 10px;
  }
  .alert label {
    max-width: 24rem;
    overflow-wrap: break-word;
  }
  .alert .flex-1 {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    align-items: flex-start;
  }
  .badge {
    margin-right: 0.8rem;
  }
  .data-result {
    font-weight: bold;
    flex: 1;
  }
  [data-theme='dark'] .value:not(.selected):not(.selected-value),
  [data-theme='dark'] .badge,
  [data-theme='dark'] .data-result,
  [data-theme='dark'] .alert.selected {
    color: white;
  }
</style>
