import MainLayout from "@/components/layout/MainLayout.vue";
import Pagination from 'laravel-vue-pagination';
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";
import { ConvertNumService } from '@/assets/js/convertNumberService.js';
import AdvancedLaravelVuePaginate from 'advanced-laravel-vue-paginate';
import 'advanced-laravel-vue-paginate/dist/advanced-laravel-vue-paginate.css';

const convertNumberService = new ConvertNumService();

export default {
    name: "enrollStudentList",

    components: {
        MainLayout,
        Pagination,
        AdvancedLaravelVuePaginate
    },

    data() {
        return {
            classvalue: {
                course_name: "",
            },
            keyword: "",
            classes: {},
            pag_status: false,
            lastPage: "",
            currentPage: ""
        };
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        notify(teacher_id) {
            axios.get("student/createNofication", {
                    params: {
                        teacher_id: teacher_id,
                        student_id: this.studentId
                    }
                })
                .then(() => {
                    this.$notification.success("သင်တန်းလျှောက်ထားမှုအောင်မြင်ပါသည်။ သက်ဆိုင်ရာ ဆရာ/ဆရာမမှ ပြန်လည်ဆက်သွယ်ပေးပါလိမ့်မည်။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                })
                .catch((error) => {
                    console.log("Create Notification API Error", error);
                });
        },
        
        search(page = 1) {
            axios.get("student/search/result?page=" + page, {
                    params: {
                        keyword: this.keyword,
                        student_id: this.studentId
                    }
                })
                .then((response) => {
                    this.classes = response.data;
                    this.classes.total = convertNumberService.convertEng2Mm(this.classes.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.classes.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.classes.current_page);
                })
                .catch((error) => {
                    console.log("Course Search API Error", error);
                });
        },
        
        getEnrollStudentList(page = 1) {
            axios.get("/student/enrollStudent?page=" + page, {
                    params: {
                        student_id: this.studentId
                    }
                })
                .then((response) => {
                    this.classes = response.data;
                    this.classes.total = convertNumberService.convertEng2Mm(this.classes.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.classes.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.classes.current_page);
                })
                .catch((error) => {
                    console.log("Enroll Student Request API Error", error);
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
        this.getEnrollStudentList();
        this.notificationCount();
    }
};