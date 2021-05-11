<template>
  <a-table-f-base
    :model="model"
    :data="data"
    :loading="loading"
    :sort="sort"
    :pager="pager"
    :filters="filters"
    :searchable="searchable"
    @click="$emit('click', $event)"
    @sort="onSort($event)"
    @change-filter="onInputFilter($event)"
    @scrollEnd="onScrollEnd($event)"
  >
    <template v-slot:top>
      <slot name="top" />
    </template>
    <template v-slot:item.actions="{ item }">
      <slot name="item.actions" v-bind:item="item" />
    </template>
    <template no-data>
      <slot name="no-data" />
    </template>
    <template v-slot:footer>
      <slot name="footer">
        <div class="f-table-footer">
          <div class="f-table-row">
            <div style="margin: 6px 6px;">
              Показано: {{ pager.count }}
            </div>
          </div>
        </div>
      </slot>
    </template>
  </a-table-f-base>
</template>

<script>
import getIndex from "@/share/components/libs/getIndex";
import lodash from "lodash";

export default {
  mixins: [getIndex],
  props: {
    api: String,
    model: [Object, Array],
    useQuery: {
      type: Boolean,
      default: false,
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    defaults: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      urlPrefix: "q",
    };
  },
  watch: {
    $route() {
      this.updateData();
    },
    api() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.date = [];
      if (this.defaults.filters) this.filters = this.defaults.filters;
      else this.filters = {};
      if (this.defaults.sort) this.sort = this.defaults.sort;
      else this.sort = { key: "id", order: "ASC" };
      this.pager.page = 0;
      this.updateData();
    },
    updateData() {
      if (this.useQuery && this.$route.query[this.urlPrefix]) {
        let params = JSON.parse(this.$route.query[this.urlPrefix]);
        if (params.sort) {
          this.sort = params.sort;
        }
        if (params.filters) {
          this.filters = params.filters;
        }
      }
      this.fetchData();
    },
    onSort: function (el) {
      this.pager.page = 0;
      if (this.sort.key == el) {
        if (this.sort.order == "ASC") {
          this.sort.order = "DESC";
        } else {
          this.sort.order = "ASC";
        }
      } else {
        this.sort.key = el;
        this.sort.order = "ASC";
      }
      if (this.useQuery) {
        this.updateUrlParams();
      } else {
        this.updateData();
      }
    },
    updateUrlParams: function () {
      var params = {
        sort: this.sort,
        filters: this.filters,
      };
      this.$router.push({
        query: { [this.urlPrefix]: JSON.stringify(params) },
      });
    },
    onInputFilter: lodash.debounce(function () {
      this.onChangeFilter();
    }, 500),
    onChangeFilter: function () {
      this.pager.page = 0;
      if (this.useQuery) {
        this.updateUrlParams();
      } else {
        this.updateData();
      }
    },
    onScrollEnd(e) {
      let pages = parseInt(this.pager.count / this.pager.limit);
      if (!this.loading && this.maxPage() > this.pager.page) {
        this.pager.page++;
        this.fetchData(true);
      }
    },
    maxPage: function () {
      return Math.ceil(this.pager.count / this.pager.limit);
    },
  },
};
</script>