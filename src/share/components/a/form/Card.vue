<template>
  <v-card>
    <v-toolbar :color="headerColor" flat>
      <v-icon>{{ icon }}</v-icon>
      <v-toolbar-title class="font-weight-light" v-html="$t(title)" />
      <v-spacer></v-spacer>
      <!-- <v-btn
        color="purple darken-3"
        fab
        small
        @click="isEditing = !isEditing"
      >
        <v-icon v-if="isEditing">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn> -->
    </v-toolbar>
    <!-- <v-card-title>
      <span class="headline" v-html="$t(title)" />
    </v-card-title> -->
    <v-card-text>
      <v-container>
        <slot name="container" />
      </v-container>
      <slot name="subscriptions" />
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    icon: {
      type: String,
      default: "mdi-pencil",
    },
    headerColor: {
      type: String,
      default: ""
    },
  },
};
</script>