<template>
  <v-app>
    <app-bar />
    <app-drawer />
    <v-main style="padding-top: 60px;">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "LayoutMain",
  components: {
    AppBar: () => import("./main/AppBar"),
    AppDrawer: () => import("./main/AppDrawer"),
    DialogProfile: () => import("@/views/signup/profile"),
  },
};
</script>