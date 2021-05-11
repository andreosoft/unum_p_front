<template>
  <v-navigation-drawer
    v-model="$root.leftMenuDrawer"
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    dark
    app
    width="260"
    v-bind="$attrs"
  >
    <!-- <dialog-profile :show="$root.dialogShow" /> -->
    <v-list>
      <v-list-item
        two-line
        class="px-2"
        link
        @click.prevent="$root.dialogShow = true"
      >
        <v-list-item-avatar>
          <v-img :src="getImage()"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ $root.profile.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $root.profile.login }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <a-list-main-menu :value="main_menu" :role="$root.profile.role" />

    <template v-slot:append>
      <v-list-item link @click="$root.logout">
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("Log out") }}</v-list-item-title>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      main_menu: [
        {
          route: {
            name: "index"
          },
          icon: "mdi-chart-bar",
          title: "Home",
          name: "home",
          auth: 1
        },
        {
          route: {
            name: "schedule"
          },
          icon: "mdi-calendar-month",
          title: "Schedule",
          name: "schedule",
          auth: 1
        },
        // {
        //   route: {
        //     name: "orders",
        //   },
        //   icon: "mdi-briefcase-account",
        //   title: "Orders",
        //   name: "Orders",
        //   auth: 1,
        // },
        {
          route: {
            name: "patients"
          },
          icon: "mdi-account-multiple",
          title: "Patients",
          name: "patients",
          auth: 1
        },
        {
          route: {
            name: "doctors"
          },
          icon: "mdi-doctor",
          title: "Doctors",
          name: "doctors",
          auth: 1
        },
        {
          icon: "mdi-cog-clockwise",
          title: "Config",
          name: "Config",
          auth: 1,
          sublist: [
            {
              route: {
                name: "basic_index",
                params: {
                  view: "config_doctors",
                  api: "basic"
                }
              },
              title: "Doctors",
              name: "Doctors",
              auth: 1
            },
            {
              route: {
                name: "basic_index",
                params: {
                  view: "config_patients",
                  api: "basic"
                }
              },
              title: "Patients",
              name: "Patients",
              auth: 1
            },
            {
              route: {
                name: "basic_index",
                params: {
                  view: "config_users",
                  api: "users"
                }
              },
              title: "Users",
              name: "Users",
              auth: 1
            },
            {
              route: {
                name: "basic_index",
                params: {
                  view: "config_doctors_patients",
                  api: "basic"
                }
              },
              title: "Doctors Patients",
              name: "Doctors Patients",
              auth: 1
            }
          ]
        }
      ]
    };
  },
  methods: {
    getImage() {
      let im = this.$store.getters["auth/profile"].image;
      let path;

      if (im) {
        path = this.$root.api.image_download + "/" + im + "?width=50&height=50";
      } else {
        path = "/img/man.png";
      }
      return path;
    }
  }
};
</script>
