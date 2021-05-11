<template>
  <v-app-bar :color="'lighten-2'" id="app-bar" fixed app flat height="60">
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="$root.leftMenuDrawer = !$root.leftMenuDrawer"
    >
      <v-icon v-if="$root.leftMenuDrawer"> mdi-view-quilt </v-icon>
      <v-icon v-else> mdi-dots-vertical </v-icon>
    </v-btn>

    <v-toolbar-title
      class="font-weight-light"
      v-text="
        appBarTitle
          ? appBarTitle
          : $route.name
          ? $t($route.name)
          : $root.appName
      "
    />

    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    appBarTitle() {
      return this.$store.getters["config/getAppBarTitle"];
    }
  },
  created() {
    console.log("app: ", this.appBarTitle);
  }
};
</script>
