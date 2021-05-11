<template>
  <v-card style="width: 100%" max-width="500" class="pa-4">
    <v-form>
      <v-card-title class="title font-weight-regular justify-center">
        <span>{{ $t(title) }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <a-form-from-model
            v-model="data"
            :model="model.data"
            :errors="errors"
            @validate="validate($event)"
          ></a-form-from-model>
        </v-container>
      </v-card-text>
      <v-alert
        v-if="this.$store.getters['auth/status'] == 'error'"
        color="red darken-1"
        dark
      >
        {{ $t(this.$store.getters["auth/error"]) }}
      </v-alert>
      <v-card-actions>
        <v-btn type="submit" @click.prevent="submit()">
          {{ $t("Login") }}
        </v-btn>
        <v-btn :to="{ name: 'registration' }">
          {{ $t("Registration") }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import validate from "@/share/components/libs/validate";
import validators from "@/share/components/libs/validators";
import fillForm from "@/share/components/libs/fillForm";

const model = {
  data: [
    {
      name: "login",
      title: "Login",
      validator: ["req"],
      type: "string",
    },
    {
      name: "password",
      title: "Password",
      type: "password",
    },
  ],
};

export default {
  mixins: [validate, validators],
  data() {
    return {
      data: {},
      errors: {},
      validators: {},
      title: "Login",
      model: model,
    };
  },
  created() {
    document.title = this.title;
    for (let el of this.model.data) {
        this.$set(this.data, el.name, null);
        this.$set(this.errors, el.name, null);
        if (el.validator) this.$set(this.validators, el.name, el.validator);
      }
  },
  methods: {
    submit: async function () {
      if (await this.validateAll(this.data)) {
        this.login();
      }
    },
    login: function () {
      this.$store
        .dispatch("auth/login", {
          login: this.data.login,
          password: this.data.password,
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch((e) => {
          this.error = e;
        });
    },
  },
};
</script>

