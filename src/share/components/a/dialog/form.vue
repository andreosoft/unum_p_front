<template>
  <v-row justify="center">
    <v-dialog :value="value" @input="$emit('input', $event)" :max-width="maxWidth + 'px'">
      <slot />
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    value: Boolean,
    maxWidth: {
      type: Number,
      default: 600
    }
  },
};
</script>