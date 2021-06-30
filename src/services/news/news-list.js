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
    name: "newsList",

    components: {
        MainLayout,
        Pagination,
        AdvancedLaravelVuePaginate
    },

    data() {
        return {
            pg_status:false,
            pg_sortby: false,
            keyword: "",
            sortBy: "",
            news: {},
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
        getNews(page = 1) {
            axios.get("/news/newslist?page=" + page)
                .then((response) => {
                    this.news = response.data;                    
                    this.news.total = convertNumberService.convertEng2Mm(this.news.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.news.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.news.current_page);
                })
                .catch((error) => {
                    console.log("New List API Error", error);
                });
        },

        onChange(page = 1) {
            axios.get("/news/sortBy?page=" + page, {
                    params: {
                        news_name: this.keyword,
                        orderBy: this.sortBy
                    }
                })
                .then((response) => {
                    this.pg_sortby = true,
                    this.news = response.data;                    
                    this.news.total = convertNumberService.convertEng2Mm(this.news.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.news.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.news.current_page);
                })
                .catch((error) => {
                    console.log("Sort New API Error", error);
                });
        },
        
        search(page = 1) {
            axios.get("/news/search/result?page=" + page, {
                    params: {
                        keyword: this.keyword
                    }
                })
                .then((response) => {
                    this.pg_status = true;
                    this.news = response.data;                    
                    this.news.total = convertNumberService.convertEng2Mm(this.news.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.news.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.news.current_page);
                })
                .catch((error) => {
                    console.log("New Search API Error", error);
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
        this.getNews();
        this.notificationCount();
    }
};