<template>
  <v-card style="width: 100%" max-width="500" class="pa-4">
    <v-card-title class="title font-weight-regular justify-center">
      <span>{{ $t(model.title) }}</span>
    </v-card-title>

    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ $t(model.data[step].title) }}</span>
      <v-avatar
        color="primary lighten-2"
        class="subheading white--text"
        size="24"
        v-text="step + 1"
      ></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item v-for="(el, i) in model.data" :key="i" :value="i">
        <v-card-text>
          <a-form-from-model
            v-model="data"
            :model="el.data"
            :errors="errors"
            @validate="validate($event)"
          ></a-form-from-model>
        </v-card-text>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn v-if="step > 0" @click="step--"> Back </v-btn>
      <v-btn v-else @click="$router.push({ name: 'login' })">
        {{ $t("Back") }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="step < maxStep" color="primary" @click="next()">
        {{ $t("Next") }}
      </v-btn>
      <v-btn v-else color="primary" @click="submit()">
        {{ $t("Sign up") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import validate from "@/share/components/libs/validate";
import validators from "@/share/components/libs/validators";

const model = {
  title: "Sign up",
  data: [
    {
      title: "Init Information",
      data: [
        {
          name: "email",
          title: "Email",
          validator: ["req", "email"],
          type: "string",
        },
        {
          name: "pass",
          title: "Password",
          validator: ["req", "pass"],
          type: "password",
        },
        {
          name: "repass",
          title: "Repert password",
          validator: ["req", "pass", "repass"],
          type: "password",
        },
        ]
    },
    {
      title: "Personal Information",
      data: [
        {
          name: "firstname",
          title: "First Name",
          validator: ["req"],
          type: "string",
        },
        {
          name: "secondname",
          title: "Second Name",
          validator: ["req"],
          type: "string",
        },
        {
          name: "middlename",
          title: "middlename",
          type: "string",
        },
        // {
        //   name: "photo",
        //   title: "photo",
        //   type: "string",
        // },
        {
          name: "birthday",
          title: "birthday",
          type: "string",
        },
        {
          name: "country",
          title: "country",
          validator: ["req"],
          type: "string",
        },
        {
          name: "lang",
          title: "lang",
          validator: ["req"],
          type: "string",
        },
      ],
    },
    {
      title: "Medical Education",
      data: [
        {
          name: "medical_university",
          title: "Medical University",
          validator: ["req"],
          type: "string",
        },
        {
          name: "years_of_education",
          title: "Years of education",
          validator: ["req"],
          type: "string",
          subtitle: "Если вы студент, то не указывайте год окончания"
        },
      ]
    }
  ],
};
export default {
  mixins: [validate, validators],
  data() {
    return {
      data: {},
      errors: {},
      validators: {},
      model: model,
      step: 0,
    };
  },
  computed: {
    maxStep() {
      return this.model.data.length;
    }
  },
  created() {
    for (let gr of this.model.data) {
      for (let el of gr.data) {
        this.$set(this.data, el.name, null);
        this.$set(this.errors, el.name, null);
        if (el.validator) this.$set(this.validators, el.name, el.validator);
      }
    }
  },
  methods: {
    getData(group) {
      let r = {};
      for (let el of this.model.data[group].data) {
        r[el.name] = this.data[el.name];
      }
      return r;
    },
    async next() {
      if (await this.validateAll(this.getData(this.step))) {
        this.step++;
      }
    },
    async submit() {
      if (await this.validateAll(this.getData(this.step))) {
        
      }
    }
  },
};
</script>