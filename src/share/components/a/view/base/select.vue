<template>
  <span v-html="getTextByValue(value, model)"></span>
</template>

<script>
import modelOptions from "@/share/components/libs/modelOptions";

export default {
  mixins: [modelOptions],
  props: {
    value: [String, Number],
    model: {
      type: Object,
      default: {},
    },
  },
};
</script>