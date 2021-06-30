import MainLayout from "@/components/layout/MainLayout.vue";
import StarRating from "vue-star-rating";
import Pagination from "laravel-vue-pagination";
import VueSlider from "vue-slider-component";
import DatePicker from "vue2-datepicker";
import RegionJson from '@/assets/json/region.json';
import TwspNameJson from "@/assets/json/township.json";
import "vue-slider-component/theme/default.css";
import axios from "axios";
import $ from "jquery";
import { mapGetters } from "vuex";
import store from "@/store";
import { ConvertNumService } from '@/assets/js/convertNumberService.js';
import AdvancedLaravelVuePaginate from 'advanced-laravel-vue-paginate';
import 'advanced-laravel-vue-paginate/dist/advanced-laravel-vue-paginate.css';

const convertNumberService = new ConvertNumService();

export default {
    name: "classList",

    components: {
        MainLayout,
        StarRating,
        Pagination,
        DatePicker,
        VueSlider,
        AdvancedLaravelVuePaginate
    },

    data() {
        return {
            std_id: null,
            keyword: "",
            classes: {},
            pg_status: false,
            attendStudent: [],
            category: [],            
            regionArr: RegionJson,
            twspNameJson: TwspNameJson,
            selectedTwspName: "",
            twspName: [],
            // currentRefinement: {
            //     min: 0,
            //     max: 500000,
            // },
            // range: {
            //     min: 0,
            //     max: 500000
            // },
            filter: {
                min: "",
                max: "",
                class_type: [],
                class_name: "",
                orderBy: "",
                start_time: "",
                end_time: "",
                region: "",
                town: "",
            },
            timePickerOptions: {
                start: "00:00",
                step: "00:15",
                end: "23:45"
            },
            lastPage: "",
            currentPage: ""
        };
    },

    created() {
        this.isStudent = this.userType == "student" ? true : false;
    },

    computed: {
        ...mapGetters(["userType", "teacherId", "studentId"]),
    },

    methods: {
        login() {
            this.$router.push({
                name: "login"
            });
        },

        enrollClass(classId) {
            var request = {
                class_id: classId,
                student_id: this.studentId,
                rate: this.classes.rate
            };
            axios.post("/student/enroll", request)
                .then((response) => {
                    this.classes = response.data;
                    this.classes.total = convertNumberService.convertEng2Mm(this.classes.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.classes.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.classes.current_page);
                    this.$notification.success("သင်တန်းလျှောက်ထားမှုအောင်မြင်ပါသည်။ သက်ဆိုင်ရာ ဆရာ/ဆရာမ မှ ပြန်လည်ဆက်သွယ်ပေးပါလိမ့်မည်။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                    this.$modal.hide("dialog");
                })
                .catch((error) => {
                    this.class_error = error.errors;
                    this.$notification.error(this.class_error, {
                        timer: 3,
                        position: "bottomCenter"
                    });
                    this.$modal.hide("dialog");
                });
        },

        confirmLogin(classId) {
            this.$modal.show("dialog", {
                title: "သင်သည် ကျောင်းသားတစ်ယောက် ဖြစ်ပါသလား?",
                text: "အတန်းအပ်ရန်အတွက် ကျောင်းသားအဖြစ် စာရင်းသွင်းရမည် သို့မဟုတ် မိမိအကောင့်သို့ ၀င်ရောက်ရမည်။",
                buttons: [{
                        title: "အကောင့်ဝင်ရန်",
                        handler: () => {
                            this.login(classId);
                        }
                    },
                    {
                        title: "ပယ်ဖျက်ရန်"
                    }
                ]
            });
        },

        confirmEnroll(classId) {
            this.$modal.show("dialog", {
                title: "အတည်ပြုခြင်း!",
                text: "ဤအတန်းကိုတက်မှာ သေချာပြီလား?",
                buttons: [{
                        title: "တက်မည်",
                        default: true,
                        handler: () => {
                            this.enrollClass(classId);
                        }
                    },
                    {
                        title: "မတက်ပါ"
                    }
                ]
            });
        },
        
        getAllClasses(page = 1) {
            if (this.isStudent) {
                this.std_id = this.studentId
            }
            axios.get("class/index/" + this.std_id + "?page=" + page)
                .then((response) => {
                    this.classes = response.data;
                    this.classes.total = convertNumberService.convertEng2Mm(this.classes.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.classes.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.classes.current_page);
                })
                .catch((error) => {
                    console.log("Class All List API error", error);
                });
        },

        // toValue(value, range) {
        //     return [
        //         value.min !== null ? value.min : range.min,
        //         value.max !== null ? value.max : range.max
        //     ];
        // },

        // refine(currentRange) {
            // this.filter.min = currentRange.min
            // this.filter.max = currentRange.max
            // this.currentRefinement.min = currentRange.min
            // this.currentRefinement.max = currentRange.max
        // },

        classFilter(page = 1) {
            axios.post("class/classListFilter/" + this.studentId + "?page=" + page, this.filter)
                .then((response) => {
                    this.pg_status = true
                    this.classes = response.data;
                    this.classes.total = convertNumberService.convertEng2Mm(this.classes.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.classes.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.classes.current_page);
                    // this.currentRefinement.min = this.filter.min ? this.filter.min : 0;
                    // this.currentRefinement.max = this.filter.max ? this.filter.max : 500000;
                })
                .catch((error) => {
                    console.log("Class Filter Error", error);
                });
        },

        onChangeCategory(event) {
            this.filter.category_id = event.target.value;
        },

        onRegionChange(event) {
            var Value = event.target.value;
            this.filter.region = Value;
            this.selectedTwspName = "";
            this.twspName = this.changeTwspName(Value);
        },

        changeTwspName(value, twspName) {
            twspName = this.twspNameJson[value];
            return twspName;
        },

        onChangeTwspName(event) {
            var Value = event.target.value;
            this.filter.town = Value;
        },
        
        onChange(page = 1) {
            this.filter.orderBy = event.target.value
            axios.post("class/classListFilter/" + this.studentId + "?page=" + page, this.filter)
                .then((response) => {
                    this.pg_status = true;
                    this.classes = response.data;
                    this.classes.total = convertNumberService.convertEng2Mm(this.classes.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.classes.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.classes.current_page);
                    // this.currentRefinement.min = this.filter.min ? this.filter.min : 0;
                    // this.currentRefinement.max = this.filter.max ? this.filter.max : 500000;
                })
                .catch((error) => {
                    console.log("Class Filter Error", error);
                });
        },
        
        search() {
            axios.get("class/search/result", {
                    params: {
                        keyword: this.keyword
                    }
                })
                .then((response) => {
                    this.classes = response.data;
                    this.classes.total = convertNumberService.convertEng2Mm(this.classes.total);
                    this.lastPage = convertNumberService.convertEng2Mm(this.classes.last_page);
                    this.currentPage = convertNumberService.convertEng2Mm(this.classes.current_page);
                })
                .catch((error) => {
                    console.log("Class Search API Error", error);
                });
        },

        getCategoryForCourse() {
            axios.get("course/categorylist")
                .then((response) => {
                    this.category = response.data;
                })
                .catch((error) => {
                    console.log(error);
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
        this.getAllClasses();        
        this.getCategoryForCourse();
        this.notificationCount();

        $("#min").on("keypress keyup blur", function (event) {
            $(this).val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

        $("#max").on("keypress keyup blur", function (event) {
            $(this).val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

        $(document).ready(function() {
            $("#myBtn").click(function(event) {
                event.preventDefault();
                $("html, body").animate({
                    scrollTop: 0
                }, 1500);
                return false;
            });
            $(window).on('load', function() {
                // Animate loader off screen
                $(".se-pre-con").fadeOut("slow");
            });
        });
    }
};