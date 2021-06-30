import MainLayout from "@/components/layout/MainLayout.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { required, maxLength } from "vuelidate/lib/validators";
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: "createCourse",

    components: {
        MainLayout
    },

    data() {
        return {
            courseRequestForm: {
                category_id: "",
                category_name: "",
                course_title: "",
                course_explanation: "",
                course_details: "",
                certificate: ""
            },
            category: [],
            submitted: false,
            editor: ClassicEditor,
            editorConfig: {
                toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "bulletedList",
                    "numberedList"
                ]
            }
        };
    },

    validations: {
        courseRequestForm: {
            category_name: {
                required
            },
            course_title: {
                required,
                maxLength: maxLength(100)
            },
            course_explanation: {
                required,
                maxLength: maxLength(1000)
            },
            course_details: {
                required,
                maxLength: maxLength(5000)
            },
            certificate: {
                required
            }
        }
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        onChange(event) {
            var optionValue = event.target.value;
            var optionText = event.target.options[event.target.options.selectedIndex].text;
            this.courseRequestForm.category_id = optionValue;
            this.courseRequestForm.category_name = optionText;
        },

        submit() {
            this.submitted = true;
            if (this.$v.courseRequestForm.$invalid) {
                return;
            }
            this.createCourse();
        },

        createCourse() {
            var request = {
                category_id: this.courseRequestForm.category_id,
                category_name: this.courseRequestForm.category_name,
                course_title: this.courseRequestForm.course_title,
                course_explanation: this.courseRequestForm.course_explanation,
                course_details: this.courseRequestForm.course_details,
                certificate: this.courseRequestForm.certificate,
                teacher_id: this.teacherId
            }
            axios.post("course/create", JSON.stringify(request), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    this.pg_status = true
                    this.teachers = response.data
                    this.$router.push({
                        name: "createClass"
                    });
                    this.$notification.success("လုပ်ဆောင်မှု အောင်မြင်ပါသည်။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                })
                .catch(() => {
                    this.$notification.error("လုပ်ဆောင်မှု မအောင်မြင်ပါ။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                })
        },

        getCategoryForCourse() {
            axios.get("course/categorylist")
                .then((response) => {
                    this.category = response.data;
                })
                .catch((error) => {
                    console.log(error);
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
        this.getCategoryForCourse();
        this.notificationCount();
    }
};