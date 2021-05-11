<template>
  <div class="pa-2">
    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      max-width="300"
      type="card"
    ></v-skeleton-loader>

    <!-- visits -->
    <v-card flat>
      <v-card-text>
        <div v-if="sorteredVisits.length == 0">
          <b>Информация отсутствует</b>
        </div>
        <div v-else>
          <v-expansion-panels accordion hover>
            <v-expansion-panel
              v-for="(item, i) in sorteredVisits"
              :key="i"
              :readonly="!item.children.length"
            >
              <v-expansion-panel-header
                :hide-actions="!item.children.length"
                class="pt-0 pb-0"
              >
                <span @click.stop="curentVisit = item.id" class="pt-3 pb-3">{{
                  item.name
                }}</span>
                <v-spacer></v-spacer>
                <span></span>
              </v-expansion-panel-header>
              <v-expansion-panel-content v-if="item.children">
                <v-list>
                  <v-list-item
                    v-for="(el, ind) in item.children"
                    :key="el.id"
                    style="cursor: pointer"
                  >
                    <span @click.stop="curentVisit = item.children[ind].id">{{
                      el.name
                    }}</span>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-card-text>
    </v-card>

    <!-- Visit details -->
    <v-dialog v-model="showVisitInformation" fullscreen>
      <v-card v-if="sorteredVisits.length > 0">
        <v-card-title class="headline">
          {{ visitToShow.name }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div>
            <b>Диагноз:</b>
          </div>
          <div>
            {{ visitToShow.data.diagnos }}
          </div>
          <div>
            <b>Описание посещения:</b>
          </div>
          <div>
            {{ visitToShow.data.description }}
          </div>
          <div>
            <b>Основные рекомендации пациенту:</b>
          </div>
          <div>
            {{ visitToShow.data.recomendations }}
          </div>
          <div>
            <b>Загруженные файлы:</b>
          </div>
          <div>
            {{ visitToShow.data.files || "Нет загруженных файлов" }}
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="showVisitInformation = false"
          >
            {{ $t("Close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    sorteredVisits: Array,
    visitsList: Array
  },
  data() {
    return {
      loading: false,
      api: this.$root.api.visits,
      curentVisit: null,
      showHistoryForm: false,
      showVisitInformation: false,
      visitToShow: this.visitsList[0]
    };
  },
  components: {},
  created() {
    //console.log("list: ", this.sorteredVisits);
  },
  watch: {
    curentVisit() {
      if (this.curentVisit !== null) {
        this.showVisitInformation = true;
        this.visitToShow = this.visitsList.filter(
          el => el.id === this.curentVisit
        )[0];
        console.log("visitToShow: ", this.visitToShow);
      }
    },
    showVisitInformation(val) {
      if (val === false) this.curentVisit = null;
    }
  },
  methods: {
    update() {
      this.$emit("reload");
    },
    dateFormat(date) {
      return new Date(date)
        .toLocaleDateString()
        .split("/")
        .join(".");
    }
  }
};
</script>
<style scoped>
.v-expansion-panel-header {
}
</style>
