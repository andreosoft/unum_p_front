<template>
  <a-dialog-form-from-model
    v-model="$root.dialogShow"
    :data="data"
    :model="model"
    :errors="errors"
    @update-data="data = $event"
    @validate="validate($event)"
  />
</template>

<script>
import validate from "@/share/components/libs/validate";
import validators from "@/share/components/libs/validators";
import fillForm from "@/share/components/libs/fillForm";

const model = {
  title: "Profile",
  data: [
    {
      name: "login",
      title: "Login",
      validator: ["req"],
      type: "string",
    },
  ],
};
export default {
  mixins: [validate, validators, fillForm],
  data() {
    return {
      model: model,
    };
  },
};
</script>