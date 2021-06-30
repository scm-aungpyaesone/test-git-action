import MainLayout from "@/components/layout/MainLayout.vue";
import Pagination from 'laravel-vue-pagination';
import moment from 'moment';
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";
import { ConvertNumService } from '@/assets/js/convertNumberService.js';
import AdvancedLaravelVuePaginate from 'advanced-laravel-vue-paginate';
import 'advanced-laravel-vue-paginate/dist/advanced-laravel-vue-paginate.css';

const convertNumberService = new ConvertNumService();

export default {
    name: "manageStudent",

    components: {
        MainLayout,
        Pagination,
        AdvancedLaravelVuePaginate
    },

    data() {
        return {
            keyword: "",
            students: {},
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
            axios.get("/teacher/search/student/" + this.teacherId + "?page=" + page, {
                    params: {
                        keyword: this.keyword
                    }
                })
                .then((response) => {
                    this.pg_status = true;
                    this.students = response.data;
                    this.students.total = convertNumberService.convertEng2Mm(this.students.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.students.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.students.current_page);
                })
                .catch((error) => {
                    console.log("Student Search API Error", error);
                });
        },
        
        getClassStudentList(page = 1) {
            axios.get("/teacher/studentlist/" + this.teacherId + "?page=" + page)
                .then((response) => {
                    this.students = response.data;
                    this.students.total = convertNumberService.convertEng2Mm(this.students.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.students.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.students.current_page);
                })
                .catch((error) => {
                    console.log("Manage Student API Error", error);
                });
        },
        
        approveStudent(classStudentId, studentId) {
            axios.get("/teacher/changestatus/approve/" + classStudentId + "/" + this.teacherId + "/" + studentId)
                .then(() => {
                    location.reload();
                })
                .catch((error) => {
                    console.log("Approve Student API Error", error);
                });
        },

        customFormatter(date) {
            return moment(date).format('HH:mm');
        },

        cancelStudent(classStudentId, studentId) {
            axios.get("/teacher/changestatus/cancel/" + classStudentId + "/" + this.teacherId + "/" + studentId)
                .then(() => {
                    location.reload();
                })
                .catch((error) => {
                    console.log("Cancel Student API Error", error);
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
        this.getClassStudentList();
        this.notificationCount();
    }
};