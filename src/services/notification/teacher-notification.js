import MainLayout from '@/components/layout/MainLayout.vue';
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
    name: "teacherNotification",

    components: {
        MainLayout,
        Pagination,
        AdvancedLaravelVuePaginate
    },

    data() {
        return {
            keyword: "",
            notifications: {
                notification_id: "",
                message: "",
                insert_time: "",
            },
            noti: {},
            lastPage: "",
            currentPage: ""
        };
    },

    computed: {
        ...mapGetters(["teacherId"]),
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
        getNotificationList(page = 1) {
            var teacher_id = {
                params: {
                    teacher_id: this.teacherId
                }
            };
            axios.get("/teacher/notificationList?page=" + page, teacher_id)
                .then((response) => {
                    this.noti = response.data;
                    this.noti.total = convertNumberService.convertEng2Mm(this.noti.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.noti.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.noti.current_page);
                    store.commit("setNotificationCount", 0);
                })
                .catch((error) => {
                    console.log("Teacher Notification Request Error", error);
                });
        }
    },

    mounted() {
        this.getNotificationList();
    }
};