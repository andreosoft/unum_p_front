<template>
  <a-dialog-form :value="value" @input="$emit('input', $event)">
    <template v-slot>
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="white"
        class="mb-0"
      ></v-progress-linear>
      <a-form-card :title="title" :headerColor="headerColor">
        <template v-slot:container>
          <a-form-from-model
            :value="data"
            :model="model"
            :errors="errors"
            @input="$emit('update-data', $event)"
            @validate="$emit('validate', $event)"
          ></a-form-from-model>
        </template>
        <template v-slot:subscriptions>
          <slot name="subscriptions" />
        </template>
        <template v-slot:actions>
          <slot name="actions" />
        </template>
      </a-form-card>
    </template>
  </a-dialog-form>
</template>

<script>
export default {
  props: {
    value: Boolean,
    title: String,
    data: Object,
    model: [Object, Array],
    errors: Object,
    headerColor: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },

  },
};
/* 
<v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal first name*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal middle name"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="[
                      'Skiing',
                      'Ice hockey',
                      'Soccer',
                      'Basketball',
                      'Hockey',
                      'Reading',
                      'Writing',
                      'Coding',
                      'Basejump',
                    ]"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
              */
</script>