<template>
  <v-btn color="blue darken-1" text @click="$emit('click')">
    <slot>
      {{ $t("Close") }}
    </slot>
  </v-btn>
</template>
