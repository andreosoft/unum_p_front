<template>
  <a-dialog-form :value="value" @input="$emit('input')">
    <v-card>
      <v-card-title>{{data.id ? `${data.name}` : $t('New Event')}}</v-card-title>
      <v-card-text>
        <a-loader v-if="loading" />
        <a-form-from-model
          :value="data"
          :model="model"
          :errors="errors"
          @input="$emit('update-data', $event)"
          @validate="validate($event)"
        >
        </a-form-from-model>
      </v-card-text>
      <v-card-actions>
        <a-btn-form-close @click="$emit('input')" />
        <a-btn-form-save @click="submit()">{{data.id ? 'Записать' : 'Создать'}}</a-btn-form-save>
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
    defaultData: Object
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    model() {
      return this.generateModel("form", "schedule");
    },
    api() {
      return this.$root.api.schedule;
    },
  },
  watch: {
    value() {
      this.data = {};
      this.fillForm();
      Object.assign(this.data, this.defaultData);
    },
    data: {
      handler: function (vNew, vOld) {
        if (this.data.patient)
          this.data.name = "Прием " + this.data.patient;
      },
      deep: true,
    },
  },
  methods: {
    afterSave(data, status) {
      this.$emit("input");
      this.$emit("reload");
    },
  }
};
</script>