import MainLayout from "@/components/layout/MainLayout.vue";
import Pagination from "laravel-vue-pagination";
import moment from "moment";
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";
import { ConvertNumService } from '@/assets/js/convertNumberService.js';
import AdvancedLaravelVuePaginate from 'advanced-laravel-vue-paginate';
import 'advanced-laravel-vue-paginate/dist/advanced-laravel-vue-paginate.css';

const convertNumberService = new ConvertNumService();

export default {
    name: "courseRequestList",

    components: {
        MainLayout,
        Pagination,
        AdvancedLaravelVuePaginate
    },

    data() {
        return {
            pg_status: false,
            pg_sortby: false,
            keyword: "",
            sortBy: "",
            course_requests: {},
            lastPage: "",
            currentPage: ""
        };
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    filters: {
        shorttext(value, limit) {
            if (value) {
                return value.substring(0, limit);
            }
        },
        setMoment: function (date) {
            return moment(date).format("DD MMMM YYYY");
        }
    },

    methods: {
        getCourseRequest(page = 1) {
            axios.get("/course/getcourserequestlist?page=" + page)
                .then((response) => {
                    this.course_requests = response.data;
                    this.course_requests.total = convertNumberService.convertEng2Mm(this.course_requests.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.course_requests.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.course_requests.current_page);
                })
                .catch((error) => {
                    console.log("Course Request API Error", error);
                });
        },

        onChange(page = 1) {
            axios.get("/course/sortBy?page=" + page, {
                    params: {
                        course_request_title: this.keyword,
                        keyword: this.sortBy
                    }
                })
                .then((response) => {
                    this.pg_sortby = true;
                    this.course_requests = response.data;
                    this.course_requests.total = convertNumberService.convertEng2Mm(this.course_requests.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.course_requests.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.course_requests.current_page);
                })
                .catch((error) => {
                    console.log("Sort CourseRequest API Error", error);
                });
        },
        
        search(page = 1) {
            axios.get("/course/searchCourseRequest/result?page=" + page, {
                    params: {
                        keyword: this.keyword
                    }
                })
                .then((response) => {
                    this.pg_status = true;
                    this.course_requests = response.data;
                    this.course_requests.total = convertNumberService.convertEng2Mm(this.course_requests.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.course_requests.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.course_requests.current_page);
                })
                .catch((error) => {
                    console.log("CourseRequest Search API Error", error);
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
        this.getCourseRequest();
        this.notificationCount();
    }
};