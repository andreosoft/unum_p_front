<template>
  <a-form-full-screen>
    <template v-slot:title>
      <v-icon>{{ getConfigView(viewName).icon }}</v-icon>
      {{ $t(getConfigView(viewName).title) }}
    </template>
    <template v-slot:actions>
      <v-btn
        color="primary"
        dark
        class="my-2"
        @click.prevent="
          editedId = 0;
          showForm = true;
        "
      >
        {{ $t("New Item") }}
      </v-btn>
    </template>
    <template v-slot:default>
      <a-table-f-api
        ref="table"
        :api="getUrl"
        :model="model"
        @click="onClickRow($event)"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click.prevent="
              editedId = item.id;
              showForm = true;
            "
          >
            mdi-pencil
          </v-icon>
          <v-icon small @click="remove(getUrl, item.id)"> mdi-delete </v-icon>
        </template>
      </a-table-f-api>
      <basic-form
        :show="showForm"
        :api="getUrl"
        :model="modelForm"
        :value="{ id: editedId }"
        @close-form="showForm = false"
        @update-data="reloadData()"
      />
    </template>
  </a-form-full-screen>
</template>

<script>
import removeEl from "@/share/components/libs/removeEl";
import genModel from "@/share/components/libs/genModel";

export default {
  mixins: [genModel, removeEl],
  components: {
    BasicForm: () => import("./form"),
  },
  data() {
    return {
      contentHeight: 0,
      showForm: false,
      editedId: 0,
    };
  },
  computed: {
    model() {
      this.modelIndex.push({ name: "actions", title: "Actions" });
      return this.modelIndex;
    },
  },
  watch: {
    showForm(val) {
      if (!val) this.editedId = 0;
    },
  },

  methods: {
    onResize() {
      let height = window.innerHeight;
      // let top = this.$refs.content.getBoundingClientRect().top;
      this.contentHeight = height - 106;
    },
    onClickRow(e) {
      // console.log(e);
    },
    reloadData() {
      this.$refs.table.updateData();
    },
    afterRemove(data) {
      this.reloadData();
    },
  },
};
/*           <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Calories"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="Carbs (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          */
</script>