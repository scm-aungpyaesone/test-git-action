import MainLayout from '@/components/layout/MainLayout.vue';
import { required, integer, sameAs } from 'vuelidate/lib/validators';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import moment from 'moment';
import axios from "axios";
import $ from "jquery";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: "editClass",

    components: {
        MainLayout,
        DatePicker,
    },    

    data() {
        return {
            updateClassForm: {
                course_id: '',
                course_title: '',
                fee: '',
                start_time: '',
                end_time: '',
                start_date: '',
                end_date: '',
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
                monday1: false,
                tuesday1: false,
                wednesday1: false,
                thursday1: false,
                friday1: false,
                saturday1: false,
                sunday1: false,
                class_type: 0,
                // checkedDay: [],
            },
            courses: [],
            submitted: false,
            time_invalid_error: false,
            time_equal_error: false,
            date_invalid_error: false,
            submit_permission: false,
            weekend_validation: false,
            weekday_validation: false,
            weekdayweekend_validation: false,
            disabled: 0,
            timePickerOptions: {
                start: "00:00",
                step: "00:15",
                end: "23:45"
            }
        }
    },

    validations: {
        updateClassForm: {
            fee: {
                integer,
                required
            },
            start_time: {
                required
            },
            end_time: {
                required,
                notEqualTime: sameAs("start_time")
            },
            start_date: {
                required
            },
            end_date: {
                required
            },
        }
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        checkWeekend() {
            this.updateClassForm.monday = false;
            this.updateClassForm.tuesday = false;
            this.updateClassForm.wednesday = false;
            this.updateClassForm.thursday = false;
            this.updateClassForm.friday = false;
            this.updateClassForm.monday1 = false;
            this.updateClassForm.tuesday1 = false;
            this.updateClassForm.wednesday1 = false;
            this.updateClassForm.thursday1 = false;
            this.updateClassForm.friday1 = false;
            this.updateClassForm.saturday1 = false;
            this.updateClassForm.sunday1 = false;
            if (this.updateClassForm.saturday == false && this.updateClassForm.sunday == false) {
                this.weekend_validation = true;
            } else {
                this.weekend_validation = false;
                this.weekdayweekend_validation = false;
            }
        },

        checkWeekday() {
            this.updateClassForm.saturday = false;
            this.updateClassForm.sunday = false;
            this.updateClassForm.monday1 = false;
            this.updateClassForm.tuesday1 = false;
            this.updateClassForm.wednesday1 = false;
            this.updateClassForm.thursday1 = false;
            this.updateClassForm.friday1 = false;
            this.updateClassForm.saturday1 = false;
            this.updateClassForm.sunday1 = false;
            if (this.updateClassForm.monday == false && this.updateClassForm.tuesday == false && this.updateClassForm.wednesday == false &&
                this.updateClassForm.thursday == false && this.updateClassForm.friday == false) {
                this.weekday_validation = true;
            } else {
                this.weekday_validation = false;
                this.weekdayweekend_validation = false;
            }
        },

        checkWeekdayWeekend() {
            this.updateClassForm.monday = false;
            this.updateClassForm.tuesday = false;
            this.updateClassForm.wednesday = false;
            this.updateClassForm.thursday = false;
            this.updateClassForm.friday = false;
            this.updateClassForm.saturday = false;
            this.updateClassForm.sunday = false;
            if (this.updateClassForm.monday1 == false && this.updateClassForm.tuesday1 == false && this.updateClassForm.wednesday1 == false &&
                this.updateClassForm.thursday1 == false && this.updateClassForm.friday1 == false && this.updateClassForm.saturday1 == false &&
                this.updateClassForm.sunday1 == false) {
                this.weekdayweekend_validation = true;
            } else {
                this.weekday_validation = false;
                this.weekday_validation = false;
            }
        },

        time_check() {
            var start_time = moment(this.updateClassForm.start_time, "h:mm A").format("HH:mm")
            var end_time = moment(this.updateClassForm.end_time, "h:mm A").format("HH:mm")

            if (end_time < start_time) {
                this.time_invalid_error = true
            } else {
                this.time_invalid_error = false
            }

            if (end_time == start_time) {
                this.time_equal_error = true
            } else {
                this.time_equal_error = false
            }
        },

        date_check() {
            var start_date = this.updateClassForm.start_date;
            var end_date = this.updateClassForm.end_date;

            if (end_date < start_date) {
                this.date_invalid_error = true
            } else {
                this.date_invalid_error = false
            }
        },

        onChange(event) {
            var optionValue = event.target.value;
            var optionText = event.target.options[event.target.options.selectedIndex].text;
            this.updateClassForm.course_id = optionValue;
            this.updateClassForm.course_title = optionText;
        },

        notBeforeToday(date) {
            return date < new Date(new Date().setHours(0, 0, 0, 0));
        },

        customFormatter(date) {
            return moment(date).format('HH:mm');
        },

        submit() {
            if (this.updateClassForm.class_type == 1 && this.updateClassForm.saturday == false && this.updateClassForm.sunday == false) {
                this.weekend_validation = true;
            } else {
                this.weekend_validation = false;
            }

            if (this.updateClassForm.class_type == 2 && this.updateClassForm.monday == false && this.updateClassForm.tuesday == false &&
                this.updateClassForm.wednesday == false && this.updateClassForm.thursday == false && this.updateClassForm.friday == false) {
                this.weekday_validation = true;
            } else {
                this.weekday_validation = false;
            }

            if (this.updateClassForm.class_type == 3 && this.updateClassForm.monday1 == false && this.updateClassForm.tuesday1 == false &&
                this.updateClassForm.wednesday1 == false && this.updateClassForm.thursday1 == false && this.updateClassForm.friday1 == false &&
                this.updateClassForm.saturday1 == false && this.updateClassForm.sunday1 == false) {
                this.weekdayweekend_validation = true;
            } else {
                this.weekdayweekend_validation = false;
            }

            if (this.time_invalid_error == false && this.time_equal_error == false && this.date_invalid_error == false) {
                if (this.weekend_validation == false && this.weekday_validation == false && this.weekdayweekend_validation == false) {
                    this.submitted = true;
                    this.submit_permission = false;
                    this.weekend_validation = false;
                    this.weekday_validation = false;
                    this.weekdayweekend_validation = false;
                    this.updateClass();
                } else {
                    this.submitted = false;
                }                
            } else {
                this.submit_permission = true;
            }
        },
        
        updateClass() {
            if (this.updateClassForm.class_type == 3) {
                this.monday = this.updateClassForm.monday1;
                this.tuesday = this.updateClassForm.tuesday1;
                this.wednesday = this.updateClassForm.wednesday1;
                this.thursday = this.updateClassForm.thursday1;
                this.friday = this.updateClassForm.friday1;
                this.saturday = this.updateClassForm.saturday1;
                this.sunday = this.updateClassForm.sunday1;
            } else {
                this.monday = this.updateClassForm.monday;
                this.tuesday = this.updateClassForm.tuesday;
                this.wednesday = this.updateClassForm.wednesday;
                this.thursday = this.updateClassForm.thursday;
                this.friday = this.updateClassForm.friday;
                this.saturday = this.updateClassForm.saturday;
                this.sunday = this.updateClassForm.sunday;
            }
            var request = {
                fee: this.updateClassForm.fee,
                start_time: this.updateClassForm.start_time,
                end_time: this.updateClassForm.end_time,
                start_date: this.updateClassForm.start_date,
                end_date: this.updateClassForm.end_date,
                monday: this.monday,
                tuesday: this.tuesday,
                wednesday: this.wednesday,
                thursday: this.thursday,
                friday: this.friday,
                saturday: this.saturday,
                sunday: this.sunday,
                class_type: this.updateClassForm.class_type,
            };
            axios.post("/class/update/" + this.$route.params.id, request)
                .then(() => {
                    this.$router.push({
                        name: "manageClass"
                    });
                    this.$notification.success("လုပ်ဆောင်မှု အောင်မြင်ပါသည်။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                })
                .catch((error) => {
                    console.log("signup error", error);
                });
        },
        
        getDetailClass(studentId) {
            axios.get("/class/detail/" + this.$route.params.id + "/" + studentId)
                .then((response) => {
                    this.updateClassForm = response.data.class;
                    if (response.data.class.class_type == 3) {
                        this.updateClassForm.monday1 = response.data.class.monday;
                        this.updateClassForm.tuesday1 = response.data.class.tuesday;
                        this.updateClassForm.wednesday1 = response.data.class.wednesday;
                        this.updateClassForm.thursday1 = response.data.class.thursday;
                        this.updateClassForm.friday1 = response.data.class.friday;
                        this.updateClassForm.saturday1 = response.data.class.saturday;
                        this.updateClassForm.sunday1 = response.data.class.sunday;
                        this.updateClassForm.monday = 0;
                        this.updateClassForm.tuesday = 0;
                        this.updateClassForm.wednesday = 0;
                        this.updateClassForm.thursday = 0;
                        this.updateClassForm.friday = 0;
                        this.updateClassForm.saturday = 0;
                        this.updateClassForm.sunday = 0;
                    }
                    this.updateClassForm.start_time = this.customFormatter(response.data.class.start_date + ' ' + response.data.class.start_time);
                    this.updateClassForm.end_time = this.customFormatter(response.data.class.end_date + ' ' + response.data.class.end_time);
                })
                .catch((error) => {
                    console.log("Class Detail API Error", error);
                });
        },
        
        getCoursesForClass() {
            axios.get("course/class/" + this.teacherId)
                .then((response) => {
                    this.courses = response.data;
                })
                .catch((error) => {
                    console.log("Class for Course List API error", error);
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
        this.getDetailClass();
        this.getCoursesForClass();
        this.notificationCount();

        $("#fee").on("keypress keyup blur", function (event) {
            $(this).val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });
    }
};