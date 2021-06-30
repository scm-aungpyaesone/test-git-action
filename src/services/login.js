import MainLayout from "@/components/layout/MainLayout.vue";
import { required } from "vuelidate/lib/validators";
import store from "@/store";
import axios from "axios";

export default {
    name: "login",

    components: {
        MainLayout,
    },

    data() {
        return {
            submitted: false,
            showAlert: false,
            loginForm: {
                login_number: this.login_number,
                password: this.password,
            },
            isConnected: false,
            name: "",
            email: "",
            personalID: "",
            picture: "",
            FB: "",
            type_radio: "",
        };
    },

    validations: {
        loginForm: {
            login_number: {
                required
            },
            password: {
                required
            },
        },
    },

    methods: {
        submitLogin() {
            this.submitted = true;
            if (this.$v.loginForm.$invalid) {
                console.log(this.$v.loginForm);
                console.log("login error");
            } else {
                this.login();
            }
        },
        
        login() {
            this.$store
                .dispatch("login", {
                    login_number: this.loginForm.login_number,
                    password: this.loginForm.password,
                })
                .then(() => {
                    if (this.$store.state.user['token']) {
                        this.$router.push({
                            name: "home"
                        });
                    } else {
                        this.$notification.error("စကားဝှက် မှားယွင်းနေပါသည်", {
                            timer: 3,
                            position: 'bottomCenter'
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.$notification.error("အကောင့်မရှိပါ", {
                        timer: 3,
                        position: "bottomCenter",
                    });
                });
        },

        AuthProvider(provider) {
            this.$auth
                .authenticate(provider)
                .then((response) => {
                    this.facebookLogin(provider, response);
                })
                .catch((err) => {
                    console.log({
                        err: err
                    });
                });
        },

        facebookLogin(provider, response) {
            axios.post("/vuefacebooklogin/" + provider, response)
                .then((response) => {
                    if (response.data.token) {
                        store.commit("setUserData", response.data);
                        this.$router.push({
                            name: 'home'
                        });
                        location.reload();
                    } else {               
                        store.commit("setUserData", response.data);
                        this.showAlert = true;
                    }
                })
                .catch(() => {
                    this.$notification.error("Login Failed", {
                        timer: 3,
                        position: 'bottomCenter'
                    });
                });
        },

        submitAlert() {
            if (this.type_radio == 2) {
                this.$router.push({
                    name: "signupTeacher",
                });
            } else {
                this.$router.push({
                    name: "signupStudent",
                });
            }
        },
    }
};