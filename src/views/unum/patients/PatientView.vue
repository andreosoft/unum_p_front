<template>
  <v-container fluid>
    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      max-width="300"
      type="card"
    ></v-skeleton-loader>

    <v-row>
      <v-col cols="12" sm="7" order-sm="1" order="2">
        <h1>Анамез</h1>
        <div v-if="!isSomethingToShow">
          <div>
            <b>Информация отсутствует</b>
          </div>
        </div>
        <template v-else>
          <div v-for="(el, i) in listToDisplay" :key="i">
            <div>
              <b>{{ el.title }}</b>
            </div>
            <div>
              * {{ anamnesis[el.name] ? anamnesis[el.name] : "Не задано" }}
            </div>
          </div>

          <div v-if="filteredModeldAnamesis.length > 3">
            <a href="#" @click.prevent="shortDisplay = !shortDisplay">
              {{ shortDisplay ? $t("more") : $t("hide") }}
            </a>
          </div>
        </template>
      </v-col>

      <v-col cols="12" sm="5" order-sm="2" order="1" class="boleft">
        <h1>Важно</h1>
        <div v-if="!isSomethingImportantToShow">
          <div>
            <b>Информация отсутствует</b>
          </div>
        </div>
        <div v-else>
          <div v-for="(el, i) in modelImportant" :key="i + el.name">
            <template v-if="!!anamnesis[el.name]">
              <div>
                <b>{{ el.title }}</b>
              </div>
              <div>* {{ anamnesis[el.name] }}</div>
            </template>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      loading: false,
      shortDisplay: true,
      modelImportant: [
        { name: "important_alergic", title: "Аллергии", type: "string" },
        {
          name: "important_pills",
          title: "Принимаемые припараты",
          type: "string"
        },
        { name: "important_complains", title: "Жалобы", type: "string" }
      ]
    };
  },
  created() {
    setTimeout(() => console.log("filt: ", this.filteredModeldAnamesis), 2000);
  },
  computed: {
    modelAnamesis() {
      return this.$root.config.meta.data.anamnesis;
    },
    anamnesis() {
      let d;
      if (!this.data.anamnesis) return {};
      try {
        d = JSON.parse(this.data.anamnesis);
        console.log("d: ", d);
      } catch (error) {
        d = {};
      }
      return d;
    },
    filteredModeldAnamesis() {
      if (this.data.anamnesis !== null) {
        return this.modelAnamesis.filter(anum => {
          return this.anamnesis[anum.name] === ""
            ? false
            : this.anamnesis[anum.name] !== null;
        });
      } else return [];
    },
    listToDisplay() {
      if (!this.filteredModeldAnamesis.length) return [];
      return this.shortDisplay
        ? this.filteredModeldAnamesis.slice(0, 3)
        : this.filteredModeldAnamesis;
    },
    isSomethingToShow() {
      return this.listToDisplay.length;
    },
    isSomethingImportantToShow() {
      if (this.anamnesis === null) return 0;
      return !!Object.keys(this.anamnesis).filter(e => {
        return e.indexOf("important") !== -1;
      }).length;
    }
  }
};
</script>
<style scoped>
@media screen and (min-width: 600px) {
  .boleft {
    border-left: 2px solid rgba(131, 127, 127, 0.2);
  }
}
</style>
