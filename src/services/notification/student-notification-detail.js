import MainLayout from '@/components/layout/MainLayout.vue';
import moment from 'moment';
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: "studentNotificationDetail",

    components: {
        MainLayout
    },

    data() {
        return {
            notification: {
                notification_id: "",
                message: "",
                insert_time: "",
            }
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
        getNotificationDetail() {
            axios.get("/student/notification/detail/" + this.$route.params.id)
                .then((response) => {
                    this.notification = response.data;
                    store.commit("setNotificationCount", 0);
                })
                .catch((error) => {
                    console.log("Student Notification Detail Error", error);
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
        this.getNotificationDetail();
        this.notificationCount();
    }
};