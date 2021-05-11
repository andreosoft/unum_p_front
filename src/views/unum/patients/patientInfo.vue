<template>
  <v-card class="mx-auto " flat width="250">
    <v-card-title class="pt-0">
      <span large left> № {{ data.id }} </span>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="blue lighten-4"
        class="mr-0 px-0"
        @click="closeHandler"
      >
        <v-icon large>
          mdi-arrow-left-bold
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-title class="py-0">
      <v-avatar size="170" class="mx-auto bordered">
        <v-img :src="getImage(data)" contain :alt="data.name" />
      </v-avatar>
    </v-card-title>
    <v-card-actions>
      <v-btn
        small
        color="blue lighten-4"
        class="mr-0 px-0"
        href="tel: +380990000000"
      >
        <v-icon large right>
          mdi-phone
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-icon large right class="mr-1">
        mdi-forum
      </v-icon>
    </v-card-actions>

    <v-card-text class="py-0 pl-7">
      <div class="text-h6 font-weight-bold mb-3">{{ data.name }}</div>
      <p>{{ data.birthday || "01.01.1980" }}</p>
      <p>место проживания:</p>
      <p>{{ data.address || "-" }}</p>
      <p>Другая контактная информация:</p>
      <p>{{ data.contacts || "-" }}</p>
    </v-card-text>
    <v-spacer />
    <div></div>
  </v-card>
</template>

<script>
import getImage from "@/components/unum/libs/image";

export default {
  mixins: [getImage],
  props: {
    data: { type: Object, default: () => ({}) }
  },
  methods: {
    closeHandler() {
      this.$emit("backDrawer");
      this.$emit("closeDrawer", false);
    }
  }
};
</script>
