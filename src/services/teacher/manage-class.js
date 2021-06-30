import MainLayout from "@/components/layout/MainLayout.vue";
import Pagination from "laravel-vue-pagination";
import moment from 'moment';
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";
import { ConvertNumService } from '@/assets/js/convertNumberService.js';
import AdvancedLaravelVuePaginate from 'advanced-laravel-vue-paginate';
import 'advanced-laravel-vue-paginate/dist/advanced-laravel-vue-paginate.css';

const convertNumberService = new ConvertNumService();

export default {
    name: "manageClass",

    components: {
        MainLayout,
        Pagination,
        AdvancedLaravelVuePaginate
    },

    data() {
        return {
            keyword: "",
            classes: {},
            pg_status: false,
            lastPage: "",
            currentPage: ""
        };
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        search(page = 1) {
            axios.get("teacher/search/manageClass?page=" + page, {
                    params: {
                        keyword: this.keyword,
                        teacher_id: this.teacherId
                    }
                })
                .then((response) => {
                    this.pg_status = true
                    this.classes = response.data;
                    this.classes.total = convertNumberService.convertEng2Mm(this.classes.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.classes.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.classes.current_page);
                })
                .catch((error) => {
                    console.log("Course Search Manage Class API Error", error);
                });
        },
        
        getClassByTeacherId(page = 1) {
            axios.get("class/classlist/" + this.teacherId + "?page=" + page)
                .then((response) => {
                    this.classes = response.data;
                    this.classes.total = convertNumberService.convertEng2Mm(this.classes.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.classes.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.classes.current_page);
                })
                .catch((error) => {
                    console.log("Class List API error", error);
                });
        },

        customDuration(startdate, enddate) {
            return moment(enddate).diff(moment(startdate), 'months');
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
        this.getClassByTeacherId();
        this.notificationCount();
    }
};