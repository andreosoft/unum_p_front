<template>
  <div>
    <div class="mb-1">
      <div class="d-flex pa-4">
        <div></div>
        <v-spacer></v-spacer>
        <div>
          <v-btn class="ma-1" @click="showUserForm = true">Новый пациент</v-btn>
          <!-- <v-btn class="ma-1" @click="">Добавить по коду</v-btn> -->
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-sm-space-between justify-space-around">
      <unum-select-card
        v-for="(el, i) in data"
        :el="el"
        :to="'patients_view'"
        :key="i"
        style="flex-basis: 25%"
      />
    </div>
    <!-- <v-flex>
      <template v-for="(el, i) in data">
        <unum-select-card :el="el" :to="'patients_view'" :key="i" />
      </template>
    </v-flex> -->
    <user-form v-model="showUserForm" @reload="updateData()" />
  </div>
</template>

<script>
import getIndex from "@/share/components/libs/getIndex";

export default {
  components: {
    UserForm: () => import("./UserForm")
  },
  mixins: [getIndex],
  data() {
    return {
      api: this.$root.api.patients,
      name: "patients",
      // showButtomCreate: true,
      showUserForm: false
    };
  },
  created() {
    this.updateData();
  },
  computed: {},
  methods: {}
};
</script>
