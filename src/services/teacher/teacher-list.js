import MainLayout from "@/components/layout/MainLayout.vue";
import StarRating from "vue-star-rating";
import Pagination from "laravel-vue-pagination";
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";
import { ConvertNumService } from '@/assets/js/convertNumberService.js';
import AdvancedLaravelVuePaginate from 'advanced-laravel-vue-paginate';
import 'advanced-laravel-vue-paginate/dist/advanced-laravel-vue-paginate.css';

const convertNumberService = new ConvertNumService();

export default {
    name: "teacherList",

    components: {
        MainLayout,
        StarRating,
        Pagination,
        AdvancedLaravelVuePaginate
    },

    data() {
        return {
            pg_status: false,
            filter: {
                teacher_name: "",
                orderBy: ""
            },
            teachers: {
                teacher_id: "",
                name: "",
                education: "",
                rating: ""
            },
            lastPage: "",
            currentPage: ""
        };
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        onChange(page = 1) {
            this.filter.orderBy = event.target.value
            axios.post("teacher/teacherFilter?page=" + page, this.filter)
                .then((response) => {
                    this.pg_status = true;
                    this.teachers = response.data;
                    this.teachers.total = convertNumberService.convertEng2Mm(this.teachers.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.teachers.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.teachers.current_page);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        
        getTeachers(page = 1) {
            axios.get("teacher/lists?page=" + page)
                .then((response) => {
                    this.teachers = response.data;
                    this.teachers.total = convertNumberService.convertEng2Mm(this.teachers.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.teachers.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.teachers.current_page);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        
        teacherFilter(page = 1) {
            axios.post("teacher/teacherFilter?page=" + page, this.filter)
                .then((response) => {
                    this.pg_status = true;
                    this.teachers = response.data;                    
                    this.teachers.total = convertNumberService.convertEng2Mm(this.teachers.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.teachers.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.teachers.current_page);
                })
                .catch(error => {
                    console.log(error)
                })
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
        this.getTeachers();
        this.notificationCount();
    }
};