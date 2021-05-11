<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="d-inline-block ma-2"
      max-width="234px"
      link
      :to="{ name: to, params: { id: el.id } }"
      :class="{ 'on-hover': hover }"
      :elevation="hover ? 12 : 2"
    >
      <v-card-text>
        <v-list-item-avatar size="200">
          <v-img :src="getImage(el)"></v-img>
        </v-list-item-avatar>
        <div>{{ el.name }}</div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import getImage from "@/components/unum/libs/image";
export default {
  mixins: [getImage],
  props: {
    el: Object,
    to: String
  }
};
</script>
