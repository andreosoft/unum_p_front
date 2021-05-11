export default {
    data() {
        return {
            data: {},
            errors: {},
            validators: {}
        }
    },
    methods: {
        resetFrom() {
            this.data = {},
            this.errors = {},
            this.validators = {}
        },
        getDefaultValue(name) {
            if (this.value && this.value[name] !== undefined) return this.value[name]
            return null
        },
        fillForm() {
            this.fillFormFromModel(this.model);
        },
        fillFormFromModel(model) {
            for (let el of model) {
                if (!this.data[el.name]) {
                    this.$set(this.data, el.name, this.getDefaultValue(el.name));
                    this.$set(this.errors, el.name, null);
                    if (el.type == "ref") {
                        this.$set(this.data, el.name + "_id", this.getDefaultValue(el.name));
                        this.$set(this.errors, el.name + "_id", null);
                    }
                }
                if (el.validator) {
                    let name = el.name;
                    if (el.type == "ref") {
                        name = name + "_id";
                    }
                    this.$set(this.validators, name, el.validator);
                }
            }
        },
        arrayModelFromModel(model) {
            let ret = [];
            for (let el in model) {
                let m = model[el];
                m.name = el
                ret.push(m)
            }
            return ret;
        },
    }
}