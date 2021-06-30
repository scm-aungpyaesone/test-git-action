import MainLayout from "@/components/layout/MainLayout.vue";
import { required, minLength, sameAs, maxLength } from 'vuelidate/lib/validators';
import axios from "axios";

export default {
    name: 'resetPassword',

    components: {
        MainLayout
    },

    data() {
        return {
            password: this.password,
            repeat_password: this.repeat_password,
            token: this.$route.query.token,
            submitted: false,
        }
    },

    validations: {
        password: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(12)
        },
        repeat_password: {
            required,
            sameAsPassword: sameAs("password")
        }
    },
    
    methods: {
        handleSubmit() {
            this.submitted = true
            if (this.$v.$invalid) {
                return;
            }
            this.resetPassword();
        },

        resetPassword() {
            var request = {
                password: this.password,
                token: this.token
            }
            axios.post("/password/reset", request)
                .then((response) => {
                    if (response.data.status == 1) {
                        this.$notification.success("စကားဝှက် ပြောင်းလဲခြင်း အောင်မြင်ပါသည်။", {
                            timer: 3,
                            position: "bottomCenter"
                        });
                        this.$router.push({
                            name: 'login'
                        })
                    } else {
                        this.$notification.error("စကားဝှက် ချိန်းရန် သတ်မှတ်ထားသောအချိန် ပြည့်သွားပါသည်။ ထပ်မံပြုလုပ်ပါ။", {
                            timer: 3,
                            position: "bottomCenter"
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.$notification.error("လုပ်ဆောင်မှု မအောင်မြင်ပါ။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                });
        }
    }
}