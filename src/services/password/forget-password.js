import MainLayout from '@/components/layout/MainLayout.vue';
import { required, email } from 'vuelidate/lib/validators';
import axios from "axios";

export default {
    name: "ForgetPassword",

    components: {
        MainLayout
    },

    data() {
        return {
            email: '',
            mail_msg: '',
            submitted: false
        }
    },

    validations: {
        email: {
            required,
            email
        }
    },

    methods: {
        handleSubmit() {
            this.submitted = true
            if (this.$v.invalid) {
                return;
            }
            this.sendResetMail()
        },
        
        sendResetMail() {
            var request = {
                email: this.email
            }
            axios.post("/password/forget", request)
                .then((response) => {
                    this.email = ''
                    this.submitted = false
                    if (response.data.status == 1) {
                        this.$notification.success("စကားဝှက် ပြောင်းရန် အီးမေးလ် ပို့ထားပါသည်", {
                            timer: 3,
                            position: "bottomCenter"
                        });
                    } else {
                        this.$notification.error("အီးမေးလ် မရှိပါ", {
                            timer: 3,
                            position: "bottomCenter"
                        });
                    }
                })
                .catch((error) => {
                    console.log("Forget Password API Error",error);
                });
        }
    }
}