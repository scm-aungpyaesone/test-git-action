import MainLayout from '@/components/layout/MainLayout.vue';
import 'swiper/swiper-bundle.min.css';
import StarRating from "vue-star-rating";
import moment from 'moment';
import axios from "axios";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: 'home',

    components: {
        MainLayout,
        StarRating
    },

    data() {
        return {
            coursesOption: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 25
                    },
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    }
                }
            },
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    600: {
                        slidesPerView: 2,
                        spaceBetween: 25
                    },
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    }
                }
            },
            courses: {},
            classes: {},
            course_requests: {},
            news: {},
            teachers: {
                teacher_id: "",
                name: "",
            },
            courseListSize: ""
        };
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

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        getCoursesList() {
            axios.get("course/getcourselist", {
                params: {
                    teacher_id: this.teacherId,
                    student_id: this.studentId
                }
            })
                .then((response) => {
                    this.courses = response.data;
                })
                .catch((error) => {
                    console.log("Course List API error", error);
                });
        },
        
        getClassList() {
            axios.get("class/all_list")
                .then((response) => {
                    this.classes = response.data;
                })
                .catch((error) => {
                    console.log("Class List API error", error);
                });
        },

        getCourseRequest() {
            axios.get("/course/getcourserequestlist")
                .then((response) => {
                    this.course_requests = response.data;
                })
                .catch((error) => {
                    console.log("Course Request API Error", error);
                });
        },
        
        getNews() {
            axios.get("/news/newslist")
                .then((response) => {
                    this.news = response.data;
                })
                .catch((error) => {
                    console.log("New List API error", error);
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
        this.getCoursesList();
        this.getClassList();
        this.getCourseRequest();
        this.getNews();
        this.notificationCount();
    }
}