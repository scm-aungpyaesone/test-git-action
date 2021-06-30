import MainLayout from "@/components/layout/MainLayout.vue";
import moment from 'moment';
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: "newsDetail",

    components: {
        MainLayout
    },

    data() {
        return {
            news: {
                news_id: "",
                news_title: "",
                news_details: "",
                publish_date: ""
            },
            newsList: {}
        };
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        getAllNews() {
            axios.get("/news/allnews")
                .then((response) => {
                    this.newsList = response.data;
                })
                .catch((error) => {
                    console.log("New List API Error", error);
                });
        },
        
        getNewsDetail() {
            axios.get("/news/detail/" + this.$route.params.id)
                .then((response) => {
                    this.news = response.data;
                })
                .catch((error) => {
                    console.log("New Detail API Error", error);
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
        this.getAllNews();
        this.getNewsDetail();
        this.notificationCount();
    }
};