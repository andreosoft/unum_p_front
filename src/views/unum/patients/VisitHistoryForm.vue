<template>
  <a-dialog-form :value="value" @input="$emit('input')">
    <v-card>
      <v-form ref="form" v-model="valid">
        <v-card-title>{{ $t("visits") }}</v-card-title>
        <v-card-text>
          <a-loader v-if="loading" />
          <v-radio-group v-model="visitNumber" row>
            <v-radio label="Первичное" value="first"></v-radio>
            <v-radio label="Вторичное" value="second"></v-radio>
          </v-radio-group>

          <v-select
            v-if="isSecondVisit"
            :items="visits"
            v-model="firstVisit"
            label="Выберите первое посещение"
          ></v-select>

          <v-text-field
            v-model="diagnos"
            label="Диагноз"
            :rules="rules"
          ></v-text-field>

          <v-textarea
            outlined
            placeholder="Описание посещения"
            label="Описание"
            rows="3"
            v-model="description"
            :rules="rules"
          ></v-textarea>

          <v-textarea
            outlined
            placeholder="Основные рекомендации пациенту"
            label="Рекомендации"
            rows="3"
            v-model="recomendations"
            :rules="rules"
          ></v-textarea>

          <v-file-input
            small-chips
            multiple
            prepend-icon="mdi-camera"
            show-size
            counter
            v-model="fileToUpload"
            label="Прикркпить файлы"
          ></v-file-input>
        </v-card-text>
        <v-card-actions>
          <a-btn-form-close @click="$emit('input')" />
          <a-btn-form-save :disabled="!valid" @click="submit()">
            Создать
          </a-btn-form-save>
        </v-card-actions>
      </v-form>
    </v-card>
  </a-dialog-form>
</template>

<script>
import fillForm from "@/share/components/libs/fillForm";
import genModelBase from "@/share/components/libs/genModelBase";

export default {
  mixins: [fillForm, genModelBase],
  props: {
    value: Boolean,
    patientVisits: Array,
    patientId: Number
  },
  data() {
    return {
      loading: false,
      valid: false,
      api: this.$root.api.visits,
      rules: [val => !!val || "Required."],
      visitNumber: "first",
      firstVisit: "",
      diagnos: "",
      description: "",
      recomendations: "",
      fileToUpload: null
    };
  },
  created() {},
  computed: {
    isSecondVisit() {
      return this.visitNumber === "second";
    },
    visits() {
      return this.patientVisits.map(el => el.name);
    },
    firstVisitId() {
      return this.patientVisits.find(el => el.name === this.firstVisit).id;
    }
  },
  methods: {
    async submit() {
      const jsonData = JSON.stringify({
        date: Date.now(),
        visitType: this.visitNumber === "second" ? 1 : 0,
        firstVisit: this.visitNumber === "second" ? this.firstVisitId : null,
        diagnos: this.diagnos,
        description: this.description,
        recomendations: this.recomendations
      });
      let formData = new FormData();
      let submitData = {
        doctor_id: this.$store.state.auth.profile.doctor_id,
        patient_id: this.patientId,
        files: null,
        data: jsonData
      };
      if (this.fileToUpload !== null) {
        for (let i = 0; i < this.fileToUpload.length; i++) {
          formData.append("files[" + i + "]", this.fileToUpload[i]);
        }
        //submitData.files = formData;
        this.$axios
          .p(this.$root.api.file_upload, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(file => {
            submitData.files = file;
            console.log("upload: ", file);
          })
          .catch(e => console.log("uperr: ", e));
      }

      //formData.append("data", submitData);
      //console.log("sub: ", submitData);

      console.log("prov otpr: ", submitData);
      this.$axios
        .p(this.api, submitData)
        .then(res => {
          console.log("upres: ", res);
        })
        .catch(e => {
          console.log("upreserr: ", e);
        });

      //   // file
      // await this.post(submitData, this.api);
      this.$root.$emit("show-info", {
        text: "Данные записаны"
      });
      this.afterSave();
    },
    afterSave() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.$emit("input");
      this.$emit("reload");
    }
  }
};
</script>
