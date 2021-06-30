import MainLayout from "@/components/layout/MainLayout.vue";
import RegionJson from "@/assets/json/region.json";
import axios from "axios";
import store from "@/store";
import { mapGetters } from "vuex";

const storageURL = process.env.VUE_STORAGE_PATH;

export default {
    name: "detailTeacher",

    components: {
        MainLayout
    },

    data() {
        return {
            teacher: {},
            reloadKey: 0,
            regionArr: RegionJson
        };
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        getDetailTeacher() {
            axios.get("/teacher/profile/" + this.teacherId)
                .then((response) => {
                    this.teacher = response.data;
                })
                .catch((error) => {
                    console.log("Teacher Detail API Error", error);
                });
        },

        getNrcFront(teacher_id) {
            return storageURL + "/teacher" + "/" + teacher_id + "/nrcfront.png";
        },
        
        checkTeacherToken(token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            axios.get("/teacher/tokencheck")
                .then((response) => {
                    response.data.token = token;
                    store.commit("setUserData", response.data);
                    this.teacher = response.data.teacher;
                    this.reloadKey += 1;
                    this.$router.push({ name: "detailTeacher" });
                    location.reload();
                })
                .catch((error) => {
                    console.log("Teacher Detail API Error", error);
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
        this.notificationCount();

        if (this.$route.query.token) {
            this.checkTeacherToken(this.$route.query.token);
        } else {
            this.getDetailTeacher();
        }
    }
};