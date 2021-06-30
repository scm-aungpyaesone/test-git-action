import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router/router.js'
import store from "@/store"
import VueNotification from '@kugatsu/vuenotification'
import VModal from 'vue-js-modal'
import Swiper, { Navigation, Pagination } from 'swiper'
import CKEditor from '@ckeditor/ckeditor5-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSocialAuth from 'vue-social-auth'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Swiper.use([Navigation, Pagination]);

Vue.use(Vuelidate)
Vue.prototype.$store = store;
Vue.use(VueNotification, {
    success: {
        background: "green",
        color: "white"
    }
});
Vue.use(VModal, { dialog: true })
Vue.use(CKEditor);
Vue.use(VueAxios,axios);
Vue.use(VueSocialAuth, {
    providers: {
        facebook: {
            clientId: '897407017430934',
            // redirectUri: 'http://localhost:8080/' // Your client app URL,
            // redirectUri: 'http://kyaung.appstg.bib-mm.com/' // Your client app URL,
            redirectUri: 'https://kyaung.bib-apps.com/' // Your client app URL
        }
    }
});
Vue.use(VueAwesomeSwiper)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
