import Vue from 'vue'
import Vuetify from 'vuetify'
import ru from 'vuetify/src/locale/ru.ts'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const theme = {
    // primary: '#4CAF50',
    // secondary: '#9C27b0',
    // accent: '#9C27b0',
    // info: '#00CAE3',
}

export default new Vuetify({
    lang: {
        locales: { ru }
      },
    theme: {
        dark: false,
        themes: {
            dark: theme,
            light: theme,
        },
    },
})