<template>
  <v-container style="height: 100%" class="mx-1 px-0" fluid>
    <div class="mt-0 d-flex flex-row">
      <div class="boright pa-0 d-none d-md-flex">
        <patient-info :data="data" @backDrawer="$router.go(-1)" />
      </div>

      <div style="width: 100%" class="pt-0">
        <div class=" d-none d-md-flex">
          <div class=" justify-end ">
            <v-btn
              class="mx-2 mb-3"
              :color="mainView === 1 ? 'primary' : ''"
              @click="mainView = 1"
            >
              Общая<br />информация
            </v-btn>
            <v-btn
              class="mx-2 mb-3"
              @click="mainView = 2"
              :color="mainView === 2 ? 'primary' : ''"
            >
              История<br />посещений
            </v-btn>
            <v-btn
              class="mx-2 mb-3"
              :color="mainView === 3 ? 'primary' : ''"
              @click="mainView = 3"
            >
              Загруженные<br />файлы
            </v-btn>
          </div>
        </div>
        <!-- mobile menu -->
        <div class="d-md-none">
          <div class="d-flex justify-space-between ">
            <v-btn class="mx-2 mb-3" @click="drawer = !drawer">
              <v-icon>mdi-account</v-icon>
            </v-btn>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-2 mb-3" v-bind="attrs" v-on="on">
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item-group>
                  <v-list-item link @click="mainView = 1">
                    <v-list-item-title>
                      Общая информация
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="mainView = 2">
                    <v-list-item-title>
                      История посещений
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="mainView = 3">
                    <v-list-item-title>
                      Загруженные файлы
                    </v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </div>

          <div class="text-h6 font-weight-bold mb-3 ml-3">{{ data.name }}</div>
        </div>

        <div>
          <!-- <component :is="content" :data="data" @reload="update()" /> -->
          <patient-view
            v-if="this.mainView === 1"
            :data="data"
            @reload="update()"
          ></patient-view>
          <patient-history
            v-if="this.mainView === 2"
            :sorteredVisits="sorteredVisits"
            :visitsList="visitsData"
            @reload="update()"
          ></patient-history>
          <loaded-files v-if="this.mainView === 3"></loaded-files>
        </div>
      </div>
    </div>

    <!-- mobile draewer -->
    <v-navigation-drawer v-model="drawer" absolute temporary touchless>
      <patient-info :data="data" @closeDrawer="drawer = false" />
    </v-navigation-drawer>

    <anames-form
      v-model="showAnamesForm"
      :patientData="data"
      @reload="update()"
    />

    <visit-history-form
      v-model="showHistoryForm"
      :patientVisits="sorteredVisits"
      :patientId="data.id"
      @reload="update()"
    />

    <v-speed-dial
      v-model="fab"
      bottom
      fixed
      right
      direction="top"
      transition="slide-y-reverse-transition"
      class="mr-2 mb-2"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="pink" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <!-- <v-btn dark small color="green">
        Дополнить анамез
      </v-btn> -->
      <v-btn fab dark small color="red" @click="showAnamesForm = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click="showHistoryForm = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>

<script>
import PatientView from "./PatientView.vue";
import PatientHistory from "./PatientHistory.vue";
import LoadedFiles from "./LoadedFiles.vue";
import AnamesForm from "./AnamesForm.vue";
import getImage from "@/components/unum/libs/image";
import PatientInfo from "./patientInfo.vue";
import VisitHistoryForm from "./VisitHistoryForm.vue";

export default {
  mixins: [getImage],

  components: {
    PatientView,
    PatientHistory,
    LoadedFiles,
    AnamesForm,
    VisitHistoryForm,
    PatientInfo
  },
  data() {
    return {
      mainView: 1,
      drawer: false,
      fab: false,
      showAnamesForm: false,
      showHistoryForm: false,
      loading: false,
      api: this.$root.api.patients,
      visitsApi: this.$root.api.visits,
      data: {},
      visitsData: [],
      showPatienInfo: true
    };
  },
  computed: {
    patient_id() {
      return this.$route.params.id;
    },
    sorteredVisits() {
      let newVisitList = this.visitsData.map(ob => ({ ...ob }));
      let temp = newVisitList.filter(el => el.data.firstVisit === null);
      temp.map(el => {
        el.children = newVisitList.filter(e => e.data.firstVisit === el.id);
      });
      console.log("sorted: ", temp);
      return temp;
    }
  },
  watch: {
    patient_id() {
      this.update();
    }
  },
  created() {
    this.update();
  },
  methods: {
    update() {
      this.fetchData(this.patient_id, this.api);
    },
    parseVisit(vis) {
      let d;
      try {
        d = JSON.parse(vis);
      } catch (error) {
        d = {};
      }
      return d;
    },
    transformVisits() {
      if (this.visitsData.length > 0) {
        this.visitsData.map(el => {
          el.data = this.parseVisit(el.data);
        });
        this.visitsData.map(el => {
          el.name = `${this.dateFormat(el.data.date)} ${el.data.diagnos}`;
          return el;
        });
      }
    },
    async fetchData(id, api) {
      if (id) {
        this.loading = true;
        let response;
        let response1;

        try {
          response = await this.$axios.g(api + "/" + id);
          response1 = await this.$axios.g(this.visitsApi);
        } catch {}

        this.loading = false;
        if (response1 !== undefined) this.visitsData.push(response1);
        this.data = response.data.data;
        let tmp = response1.data.data.filter(
          el => el.patient_id === this.data.id && el.id !== 7
        );
        console.log("patvis: ", tmp);
        this.visitsData = tmp;
        this.transformVisits();
      }
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
.boright {
  border-right: 1px solid rgba(131, 127, 127, 0.2);
}
.bordered {
  border: 1px solid black;
}
</style>
