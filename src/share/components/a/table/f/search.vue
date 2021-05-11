<template>
  <div class="f-table-col" :style="{ width: width + 'px' }">
    <a-input-table-search-string
      v-if="
        [
          'id',
          'string',
          'ref-table',
          'login',
          'number',
          'phones',
        ].includes(model.type)
      "
      :value="values[model.name]"
      @input="onInputElement"
    />
    <a-input-table-search-select
      v-else-if="['select'].includes(model.type)"
      :value="values[model.name]"
      :model="model"
      @input="onInputElement"
    />
    <a-input-table-search-ref-select
      v-else-if="model.type == 'ref' && model.input == 'select'"
      :value="values[model.name + '_id']"
      :model="model"
      @input="values[model.name + '_id'] = $event; $emit('input', values)"
    />
    <a-input-table-search-datetime
      v-else-if="
        [,
          'date',
          'datetime',
        ].includes(model.type)
      "
      :value="values[model.name]"
      @input="onInputElement"
    />
    <slot></slot>
  </div>
</template>

<script>
import lodash from "lodash";

export default {
  props: {
    model: Object,
    values: Object,
    width: [Number, String],
  },
  computed: {
    value() {
      return this.values[this.model.name];
    }
  },
  methods: {
    onInputElement: lodash.debounce(function (event) {
      this.values[this.model.name] = event;
      this.$emit("input", this.values);
    }, 500),
    getOptions(field) {
      if (field.options) {
        return field.options;
      } else if (field.data && field.data.select && field.data.select.storage) {
        return this.options[field.data.select.storage];
      }
    },
  },
};
</script>