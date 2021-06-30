import MainLayout from "@/components/layout/MainLayout.vue";
import { required, maxLength, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: 'changeTeacherPassword',

    components: {
        MainLayout
    },

    data() {
        return {
            teacher: {
                current_password: '',
                new_password: '',
                confirm_new_password: ''
            },
            submitted: false
        };
    },

    validations: {
        teacher: {
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
        ...mapGetters(["teacherId", "userType"]),
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
                current_password: this.teacher.current_password,
                new_password: this.teacher.new_password,
                confirm_new_password: this.teacher.confirm_new_password
            };
            axios.post("teacher/changepassword/" + this.teacherId, request)
                .then((response) => {
                    this.teachers = response.data;
                    this.teacher.current_password = '';
                    this.teacher.new_password = '';
                    this.teacher.confirm_new_password = '';
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
                    this.$notification.error("လုပ်ဆောင်မှု မအောင်မြင်ပါ။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                    console.log("Change Teacher Password API Error", error.response.data);
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

    created() {
        this.notificationCount();
    }
}