export default {
    data() {
        return {
            loading: false,
            data: [],
            sort: {
                key: "id",
                order: "ASC",
            },
            pager: {
                page: 0,
                count: 0,
                limit: 25,
            },
            filters: {},
        };
    },
    methods: {
        updateData() {
            this.fetchData();
        },
        async fetchData(append = false) {
            this.loading = true;
            let response = await this.$axios.g(this.api, {
                params: { sort: this.sort, filters: this.filters, pager: this.pager },
            });
            this.loading = false;
            this.pager = response.data.pager;
            if (append) {
                this.data = this.data.concat(response.data.data);
            } else {
                this.data = response.data.data;
            }
            
            this.afterFetchData(response)
        },
        afterFetchData(response) {

        }
    },
};