<template>
  <v-btn text color="primary" @click="$emit('click')">
    <slot> {{ $t("Ok") }} </slot>
  </v-btn>
</template>