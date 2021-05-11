<template>
  <div>
    <v-flex>
      <template v-for="(el, i) in data">
        <unum-select-card :el="el" :to="''" :key="i" />
      </template>
    </v-flex>
  </div>
</template>

<script>
import getIndex from "@/share/components/libs/getIndex";

export default {
  mixins: [getIndex],
  data() {
    return {
      api: this.$root.api.doctors,
      name: "doctors",
    };
  },
  created() {
    this.updateData();
  },
  computed: {},
  methods: {},
};
</script>