import MainLayout from "@/components/layout/MainLayout.vue";
import { required, maxLength } from "vuelidate/lib/validators";
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: "courseRequest",

    components: {
        MainLayout
    },

    data() {
        return {
            courseRequestForm: {
                course_request_title: "",
                course_request_details: "",
                student_id: ""
            },
            submitted: false
        };
    },

    validations: {
        courseRequestForm: {
            course_request_title: {
                required,
                maxLength: maxLength(100)
            },
            course_request_details: {
                required,
                maxLength: maxLength(1000)
            }
        }
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        submit() {
            this.submitted = true;
            if (this.$v.courseRequestForm.$invalid) {
                return;
            }
            this.courseRequest();
        },
        
        courseRequest() {
            var request = {
                course_request_title: this.courseRequestForm.course_request_title,
                course_request_details: this.courseRequestForm.course_request_details,
                student_id: this.studentId
            };
            axios.post("student/create/course_request", request)
                .then(() => {
                    this.$router.push({
                        name: "courseRequestList"
                    });
                    this.$notification.success("လုပ်ဆောင်မှု အောင်မြင်ပါသည်။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                    this.courseRequestForm.course_request_title = ''
                    this.courseRequestForm.course_request_details = ''
                    this.submitted = false
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
};