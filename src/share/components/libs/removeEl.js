export default {
    data: function () {
        return {
            removeData: {
                textConfirm: "Вы уверены, что хотите удалить?",
                textResult: "Элемент удален"
            }
        }
    },
    methods: {
        async remove(api, id) {
            if (confirm(this.removeData.textConfirm)) {
                this.loading = true;
                const response = await this.$axios({
                    method: "delete",
                    url: api,
                    data: { ids: [id] },
                    params: {}
                })
                this.loading = false;
                this.afterRemove(response);
            }
        },
        afterRemove(data) { }
    }
}