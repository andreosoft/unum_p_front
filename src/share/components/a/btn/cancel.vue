<template>
  <v-btn text color="primary" @click="$emit('click')">
    <slot> {{ $t("cancel") }} </slot>
  </v-btn>
</template>