<template>
  <v-card class="ma-2" ref="content">
    <v-toolbar color="blue-grey" dark flat height="60">
      <v-toolbar-title>
        <slot name="title">
        </slot>
      </v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <slot name="actions"> </slot>
    </v-toolbar>
    <v-card-text :style="{ height: contentHeight + 'px' }">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      contentHeight: 0,
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize, true);
    this.onResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize, true);
  },
  methods: {
    onResize() {
      let height = window.innerHeight;
      this.contentHeight = height - 136;
    },
  },
};
</script>