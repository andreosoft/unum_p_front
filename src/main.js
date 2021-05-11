import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/share/libs/vuetify'
import api from '@/config/api'
import router from '@/share/libs/router'
import store from '@/store/index'
import '@/share/libs/registerComponents'
import '@/share/libs/chartist'
import '@/share/libs/axios'
import '@/libs/translations'
import '@/share/libs/date'

Vue.config.productionTip = false

const app = new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
    el: '#app',
    data: {
        appName: "UNUM",
        leftMenuDrawer: true,
        dialogShow: false,
        api: api,
        lang: "ru"
    },
    computed: {
        config: function () {
            return this.$store.getters['config/get']
        },
        profile: function () {
            return this.$store.getters["auth/profile"];
        },
    },
    methods: {
        log: function (info, type = "", level = "") {
            console.log(info);
        },
        logout: function () {
            this.$store.commit('auth/authLogout')
            window.location.href = '/';
        },
    }

})