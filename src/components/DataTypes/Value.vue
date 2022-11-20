<template>
  <section class="value-line">
    <div
      class="alert value"
      :data-identifier="identifier"
      :class="[
        `alert-${color}`,
        { selected: selected },
        { 'value-over': over },
      ]"
      @mouseover="over = true"
      @mouseout="over = false"
    >
      <div class="flex-1">
        <b
          v-if="name !== ''"
          class="badge border-transparent value-name"
          :class="`bg-${color}`"
          >{{ name }}</b
        >

        <span
          class="data-result"
          :class="{ italic: dataValue === '(vide)' || dataValue === '' }"
          >{{ dataValue === '' ? '(vide)' : dataValue }}</span
        >
        <button
          v-show="over"
          id="selectX"
          class="btn btn-xs selection-data-x"
          @click="selectDataX()"
        >
          X
        </button>
        <button
          v-show="over"
          id="selectY"
          class="btn btn-xs selection-data-y"
          @click="selectDataY()"
        >
          Y
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Value',
    props: ['name', 'data', 'color', 'isParentSelected'],
    data: () => ({
      dataValue: '',
      over: false,
      select: false,
      identifier: null,
    }),
    computed: {
      selected() {
        return this.isParentSelected || this.select ? true : false;
      },
    },
    async created() {
      this.dataValue = this.data;
      this.identifier = await this.$store.dispatch('giveIdentifier');
    },
    methods: {
      async selectDataX() {
        this.select = !this.select;
        await this.$store.dispatch('verifyExistanceX', {
          id: this.identifier,
          key: this.name,
          value: this.data,
        });
      },
      async selectDataY() {
        this.select = !this.select;
        await this.$store.dispatch('verifyExistanceY', {
          id: this.identifier,
          key: this.name,
          value: this.data,
        });
      },
    },
  };
</script>

<style scoped>
  .array-content > .value-line > .value > .flex-1 > .value-name {
    display: none;
  }

  .response
    *:not(.result-container):not(.array-content)
    > .value-line
    > .alert.value {
    background: none;
    padding: 0;
  }

  .selected {
    box-shadow: inset 0 0 0 2px rgb(88, 88, 88);
    border-radius: 1rem;
  }

  .result-container > section > .alert-info.selected,
  .result-container > section > .alert-info .alert.selected {
    box-shadow: inset 0 0 0 2px hsl(var(--in));
    background-color: hsla(var(--in) / 0.2);
  }

  .result-container > section > .alert-error.selected,
  .result-container > section > .alert-error .alert.selected {
    box-shadow: inset 0 0 0 2px hsl(var(--er));
    background-color: hsla(var(--er) / 0.2);
  }
  .result-container > section > .alert-warning.selected,
  .result-container > section > .alert-warning .alert.selected {
    box-shadow: inset 0 0 0 2px hsl(var(--wa));
    background-color: hsla(var(--wa) / 0.2);
  }

  .value-over {
    filter: brightness(80%);
  }
  .value-line {
    border-radius: 0.5rem;
  }
  .value {
    position: relative;
  }
  .value .flex-1 {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .value b {
    text-transform: uppercase;
  }
</style>
