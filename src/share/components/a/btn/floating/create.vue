<template>
  <v-fab-transition>
    <v-btn
      v-show="show"
      @click="$emit('click')"
      color="pink"
      dark
      fixed
      bottom
      right
      fab
    >
      <v-icon> <slot>mdi-plus</slot></v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
};
</script>