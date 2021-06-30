import MainLayout from "@/components/layout/MainLayout.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: "editCourse",

    components: {
        MainLayout
    },

    data() {
        return {
            updateCourseForm: {
                category_id: "",
                course_title: "",
                course_explanation: "",
                course_details: "",
                certificate: ""
            },
            courses: [],
            category: [],
            submitted: false,
            disabled: 0,
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
        updateCourseForm: {
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
            this.updateCourseForm.category_id = optionValue;
            this.updateCourseForm.category_name = optionText;
        },

        submit() {
            this.submitted = true;
            if (this.$v.updateCourseForm.$invalid) {
                return;
            }
            this.updateCourse();
        },
        
        updateCourse() {
            var request = {
                category_id: this.updateCourseForm.category_id,
                course_title: this.updateCourseForm.course_title,
                course_explanation: this.updateCourseForm.course_explanation,
                course_details: this.updateCourseForm.course_details,
                certificate: this.updateCourseForm.certificate
            };
            axios.post("/course/update/" + this.$route.params.id, request)
                .then(() => {
                    this.$router.push({
                        name: "manageCourse"
                    });
                    this.$notification.success("လုပ်ဆောင်မှု အောင်မြင်ပါသည်။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                })
                .catch((error) => {
                    console.log("Course Filter API Error", error);
                });
        },
        
        getCourseDetail() {
            axios.get("course/detail/" + this.$route.params.id)
                .then((response) => {
                    this.updateCourseForm = response.data;
                })
                .catch((error) => {
                    console.log("Course Detail API Error", error);
                });
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
    
    mounted() {
        this.getCategoryForCourse();
        this.getCourseDetail();
        this.notificationCount();
    }
};