import MainLayout from "@/components/layout/MainLayout.vue";
import moment from 'moment';
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: "courseRequestDetail",

    components: {
        MainLayout
    },

    data() {
        return {
            // course_request_detail: {
            //     course_request_id: "",
            //     course_request_title: "",
            //     course_request_details: "",
            // },
            courseRequestList: {},
            course_requests:{
                course_request_id: "",
                course_request_title: "",
                course_request_details: "",
            }
        };
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        getAllCourseRequest() {
            axios.get("/course/getallcourserequestlist")
                .then((response) => {
                    this.courseRequestList = response.data;
                })
                .catch((error) => {
                    console.log("Course Request API Error", error);
                });
        },
        
        getCourseRequestDetail() {
            axios.get("/course/courseRequestDetail/" + this.$route.params.id)
                .then((response) => {
                    this.course_requests = response.data;
                })
                .catch((error) => {
                    console.log("CourseRequest Detail API Error", error);
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

    filters: {
        setMoment: function (date) {
            return moment(date).format("DD MMMM YYYY");
        }
    },

    mounted() {
        this.getAllCourseRequest();
        this.getCourseRequestDetail();
        this.notificationCount();
    }
};