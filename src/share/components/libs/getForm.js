import fillForm from "./fillForm"

export default {
    mixins: [fillForm],
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        updateData(id) {
            this.resetFrom();
            this.fillForm();
            this.fetchData(id);
        },
        async fetchData(id) {
            if (id) {
                this.loading = true;
                let response = await this.$axios.g(this.api, {
                    params: { id: id },
                });
                this.loading = false;
                this.data = response.data.data;
                this.afterFetchData(response)
            }
        },
        afterFetchData(response) {}
    }
}