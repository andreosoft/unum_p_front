<template>
  <v-btn
    color="blue darken-1"
    text
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot>
      {{ $t("Save") }}
    </slot>
  </v-btn>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
