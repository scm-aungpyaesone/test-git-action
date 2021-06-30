import MainLayout from "@/components/layout/MainLayout.vue";
import StarRating from "vue-star-rating";
import Pagination from "laravel-vue-pagination";
import axios from "axios";
import store from "@/store";
import { mapGetters } from "vuex";
import { ConvertNumService } from '@/assets/js/convertNumberService.js';
import AdvancedLaravelVuePaginate from 'advanced-laravel-vue-paginate';
import 'advanced-laravel-vue-paginate/dist/advanced-laravel-vue-paginate.css';

const convertNumberService = new ConvertNumService();

export default {
    name: "detailListTeacher",

    components: {
        MainLayout,
        StarRating,
        Pagination,
        AdvancedLaravelVuePaginate
    },

    data() {
        return {
            teacher: {},
            courses: {},
            lastPage: "",
            currentPage: ""
        };
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        getDetailListTeacher() {
            axios.get("/teacher/detail/" + this.$route.params.id)
                .then((response) => {
                    this.teacher = response.data;
                })
                .catch((error) => {
                    console.log("Teacher Detail API Error", error);
                });
        },
        
        getCourseByTeacherId(page = 1) {
            axios.get("course/courselist/" + this.$route.params.id + "?page=" + page)
                .then((response) => {
                    this.courses = response.data;
                    this.courses.total = convertNumberService.convertEng2Mm(this.courses.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.courses.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.courses.current_page);
                })
                .catch((error) => {
                    console.log("Course List API error", error);
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
        this.getDetailListTeacher();
        this.getCourseByTeacherId();
        this.notificationCount();
    }
};