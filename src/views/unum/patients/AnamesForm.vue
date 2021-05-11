<template>
  <a-dialog-form :value="value" @input="$emit('input')">
    <v-card>
      <v-card-title>Дополнить анамнез</v-card-title>
      <v-card-text>
        <a-loader v-if="loading" />
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header>Важное</v-expansion-panel-header>
            <v-expansion-panel-content>
              <a-form-from-model
                :value="data"
                :model="modelImportant"
                :errors="errors"
                @input="$emit('update-data', $event)"
                @validate="validate($event)"
              ></a-form-from-model>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>Анамнез жизни</v-expansion-panel-header>
            <v-expansion-panel-content>
              <a-form-from-model
                :value="data"
                :model="model.slice(0, 8)"
                :errors="errors"
                @input="$emit('update-data', $event)"
                @validate="validate($event)"
              ></a-form-from-model>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header
              >Аллергический анамнез</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <a-form-from-model
                :value="data"
                :model="model.slice(8, 11)"
                :errors="errors"
                @input="$emit('update-data', $event)"
                @validate="validate($event)"
              ></a-form-from-model>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header
              >Объективный анамнез</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <a-form-from-model
                :value="data"
                :model="model.slice(11, 13)"
                :errors="errors"
                @input="$emit('update-data', $event)"
                @validate="validate($event)"
              ></a-form-from-model>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>Обследования</v-expansion-panel-header>
            <v-expansion-panel-content>
              <a-form-from-model
                :value="data"
                :model="model.slice(13, 15)"
                :errors="errors"
                @input="$emit('update-data', $event)"
                @validate="validate($event)"
              ></a-form-from-model>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-actions>
        <a-btn-form-close @click="$emit('input')" />
        <a-btn-form-save @click="submit()">Создать</a-btn-form-save>
      </v-card-actions>
    </v-card>
  </a-dialog-form>
</template>

<script>
import fillForm from "@/share/components/libs/fillForm";
import genModelBase from "@/share/components/libs/genModelBase";
import submitForm from "@/share/components/libs/submitForm";

export default {
  mixins: [fillForm, genModelBase, submitForm],
  props: {
    value: Boolean,
    patientData: Object
  },
  data() {
    return {
      loading: false,
      api: this.$root.api.patients,
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
    this.fillForm();
  },
  watch: {
    value() {
      let d;
      try {
        d = JSON.parse(this.patientData.anamnesis);
      } catch (error) {
        d = {};
      }
      Object.assign(this.data, d);
    }
  },
  computed: {
    model() {
      return this.$root.config.meta.data.anamnesis;
    }
  },
  methods: {
    async submit() {
      if (await this.validateAll(this.data)) {
        let data = {
          id: this.patientData.id,
          anamnesis: JSON.stringify(this.data)
        };
        await this.post(data, this.api);
        return true;
      }
      return false;
    },
    afterSave(data, status) {
      this.$emit("input");
      this.$emit("reload");
    }
  }
};
</script>
