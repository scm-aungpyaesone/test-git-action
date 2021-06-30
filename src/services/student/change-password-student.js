import MainLayout from "@/components/layout/MainLayout.vue";
import { required, maxLength, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: 'changePasswordStudent',

    components: {
        MainLayout
    },

    data() {
        return {
            student: {
                current_password: '',
                new_password: '',
                confirm_new_password: ''
            },
            submitted: false,
        };
    },

    validations: {
        student: {
            current_password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(12)
            },
            new_password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(12)
            },
            confirm_new_password: {
                required,
                sameAsPassword: sameAs("new_password")
            }
        }
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        handleSubmit() {
            this.submitted = true;
            if (this.$v.$invalid) {
                return;
            }
            this.changePassword();
        },
        
        changePassword() {
            var request = {
                current_password: this.student.current_password,
                new_password: this.student.new_password,
                confirm_new_password: this.student.confirm_new_password
            };
            axios.post("/student/changePassword/" + this.studentId, request)
                .then((response) => {
                    this.student.current_password = '';
                    this.student.new_password = '';
                    this.student.confirm_new_password = '';
                    this.submitted = false;
                    if (response.data.status == 1) {
                        this.$notification.success("လုပ်ဆောင်မှု အောင်မြင်ပါသည်။", {
                            timer: 3,
                            position: "bottomCenter"
                        });
                    } else {
                        this.$notification.error("လက်ရှိစကားဝှက် မှားယွင်းနေပါသည်။", {
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

        },

        notificationCount() {
            var id = null;
            var type = this.userType;
            if (this.teacherId) {
                id = this.teacherId;
            }
            if (this.studentId) {
                id = this.studentId;
            }
            axios.get("teacher/notificationCount", {
                params: {
                    id: id,
                    type: type
                }
            })
                .then(response => {
                    store.commit("setNotificationCount", response.data);
                })
                .catch(error => {
                    console.log(error, "error");
                });
        },
    },

    mounted() {
        this.notificationCount();
    }
}