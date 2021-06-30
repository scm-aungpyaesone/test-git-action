import MainLayout from '@/components/layout/MainLayout.vue';
import Pagination from 'laravel-vue-pagination';
import VueSlider from 'vue-slider-component';
import RegionJson from '@/assets/json/region.json';
import TwspNameJson from "@/assets/json/township.json";
import axios from "axios";
import 'vue-slider-component/theme/default.css';
import $ from "jquery";
import { mapGetters } from "vuex";
import store from "@/store";
import { ConvertNumService } from '@/assets/js/convertNumberService.js';
import AdvancedLaravelVuePaginate from 'advanced-laravel-vue-paginate';
import 'advanced-laravel-vue-paginate/dist/advanced-laravel-vue-paginate.css';

const convertNumberService = new ConvertNumService();

export default {
    name: 'courseList',

    components: {
        MainLayout,
        Pagination,
        VueSlider,
        AdvancedLaravelVuePaginate
    },

    data() {
        return {
            pg_status: false,
            category: [],
            regionArr: RegionJson,
            twspNameJson: TwspNameJson,
            selectedTwspName: "",
            twspName: [],
            keyword: "",
            sortBy: "",
            courses: {},
            teachers: {
                teacher_id: "",
                name: "",
            },
            filter: {
                category_id: "",
                teacher_id: [],
                course_name: "",
                orderBy: "",
                region: "",
                town: "",
            },
            lastPage: "",
            currentPage: ""
        };
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        getCourses(page = 1) {
            axios.get("course/list?page=" + page)
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
        
        getTeachersForFilter() {
            axios.get("teacher/teacherlist")
                .then((response) => {
                    this.teachers = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        onChangeCategory(event) {
            this.filter.category_id = event.target.value;
        },

        onRegionChange(event) {
            var Value = event.target.value;
            this.filter.region = Value;
            this.selectedTwspName = "";
            this.twspName = this.changeTwspName(Value);
        },

        changeTwspName(value, twspName) {
            twspName = this.twspNameJson[value];
            return twspName;
        },

        onChangeTwspName(event) {
            var Value = event.target.value;
            this.filter.town = Value;
        },
        
        applyCourseFilter(page = 1) {
            this.filter.orderBy = this.sortBy;
            axios.post("/course/course_filter?page=" + page, this.filter)
                .then((response) => {
                    this.pg_status = true;
                    this.courses = response.data;
                    this.courses.total = convertNumberService.convertEng2Mm(this.courses.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.courses.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.courses.current_page);
                })
                .catch((error) => {
                    console.log("Course Filter Error", error);
                });
        },

        onChange(page = 1) {
            this.filter.orderBy = this.sortBy;
            axios.post("/course/course_filter?page=" + page, this.filter)
                .then((response) => {
                    this.pg_status = true;
                    this.courses = response.data;
                    this.courses.total = convertNumberService.convertEng2Mm(this.courses.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.courses.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.courses.current_page);
                })
                .catch((error) => {
                    console.log("Course Filter Error", error);
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
        this.getCourses();        
        this.getCategoryForCourse();
        this.getTeachersForFilter();
        this.notificationCount();

        $(document).ready(function() {
            $("#myBtn").click(function(event) {
                event.preventDefault();
                $("html, body").animate({
                    scrollTop: 0
                }, 1500);
                return false;
            });
            $(window).on('load', function() {
                // Animate loader off screen
                $(".se-pre-con").fadeOut("slow");
            });
        });
    }
}