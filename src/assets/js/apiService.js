import Vue from "vue";
import axios from "axios";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// axios.defaults.baseURL = "http://localhost/school_api/api";
// axios.defaults.baseURL = "http://kyaung.appstg.bib-mm.com/backend/api";
// axios.defaults.baseURL = "https://kyaung.bib-apps.com/backend/api";

export class APIService {
    constructor() {}
    facebookLogin(provider, request) {
        return new Promise((resolve, reject) => {
            axios
                .post("/vuefacebooklogin/" + provider, request)
                .then((response) => {
                    this.setLocalStorage(response.data);
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log("Login API Error", error);
                    reject(error);
                });
        });
    }
}