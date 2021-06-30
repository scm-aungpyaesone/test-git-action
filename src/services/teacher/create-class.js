import MainLayout from '@/components/layout/MainLayout.vue';
import { required, numeric } from 'vuelidate/lib/validators';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import moment from 'moment';
import axios from "axios";
import $ from "jquery";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: "manageClass",

    components: {
        MainLayout,
        DatePicker,
    },

    data() {
        return {
            createClassForm: {
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
                class_type: '',
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
            timePickerOptions: {
                start: "00:00",
                step: "00:15",
                end: "23:45"
            }
        }
    },

    validations: {
        createClassForm: {
            course_title: {
                required
            },
            fee: {
                numeric,
                required
            },
            start_time: {
                required
            },
            end_time: {
                required
            },
            start_date: {
                required
            },
            end_date: {
                required
            },
            class_type: {
                required
            },
        }
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        checkWeekend() {
            this.createClassForm.monday = false;
            this.createClassForm.tuesday = false;
            this.createClassForm.wednesday = false;
            this.createClassForm.thursday = false;
            this.createClassForm.friday = false;
            this.createClassForm.monday1 = false;
            this.createClassForm.tuesday1 = false;
            this.createClassForm.wednesday1 = false;
            this.createClassForm.thursday1 = false;
            this.createClassForm.friday1 = false;
            this.createClassForm.saturday1 = false;
            this.createClassForm.sunday1 = false;
            if (this.createClassForm.saturday == false && this.createClassForm.sunday == false) {
                this.weekend_validation = true;
            } else {
                this.weekend_validation = false;
                this.weekdayweekend_validation = false;
            }
        },

        checkWeekday() {
            this.createClassForm.saturday = false;
            this.createClassForm.sunday = false;
            this.createClassForm.monday1 = false;
            this.createClassForm.tuesday1 = false;
            this.createClassForm.wednesday1 = false;
            this.createClassForm.thursday1 = false;
            this.createClassForm.friday1 = false;
            this.createClassForm.saturday1 = false;
            this.createClassForm.sunday1 = false;
            if (this.createClassForm.monday == false && this.createClassForm.tuesday == false && this.createClassForm.wednesday == false &&
                this.createClassForm.thursday == false && this.createClassForm.friday == false) {
                this.weekday_validation = true;
            } else {
                this.weekday_validation = false;
                this.weekdayweekend_validation = false;
            }
        },

        checkWeekdayWeekend() {
            this.createClassForm.monday = false;
            this.createClassForm.tuesday = false;
            this.createClassForm.wednesday = false;
            this.createClassForm.thursday = false;
            this.createClassForm.friday = false;
            this.createClassForm.saturday = false;
            this.createClassForm.sunday = false;
            if (this.createClassForm.monday1 == false && this.createClassForm.tuesday1 == false && this.createClassForm.wednesday1 == false &&
                this.createClassForm.thursday1 == false && this.createClassForm.friday1 == false && this.createClassForm.saturday1 == false &&
                this.createClassForm.sunday1 == false) {
                this.weekdayweekend_validation = true;
            } else {
                this.weekday_validation = false;
                this.weekday_validation = false;
            }
        },

        time_check() {
            var start_time = moment(this.createClassForm.start_time, "HH:mm").format("HH:mm");
            var end_time = moment(this.createClassForm.end_time, "HH:mm").format("HH:mm");

            if (end_time < start_time) {
                this.time_invalid_error = true;
            } else {
                this.time_invalid_error = false;
            }

            if (end_time == start_time) {
                this.time_equal_error = true;
            } else {
                this.time_equal_error = false;
            }
        },

        date_check() {
            var start_date = this.createClassForm.start_date;
            var end_date = this.createClassForm.end_date;
            
            if (end_date != '' && end_date < start_date) {
                this.date_invalid_error = true;
            } else {
                this.date_invalid_error = false;
            }
        },
        
        onChange(event) {
            var optionValue = event.target.value;
            var optionText = event.target.options[event.target.options.selectedIndex].text;
            this.createClassForm.course_id = optionValue;
            this.createClassForm.course_title = optionText;
        },

        notBeforeToday(date) {
            return date < new Date(new Date().setHours(0, 0, 0, 0));
        },

        submit() {
            if (this.createClassForm.class_type == 1 && this.createClassForm.saturday == false && this.createClassForm.sunday == false) {
                this.weekend_validation = true;
            } else {
                this.weekend_validation = false;
            }

            if (this.createClassForm.class_type == 2 && this.createClassForm.monday == false && this.createClassForm.tuesday == false &&
                this.createClassForm.wednesday == false && this.createClassForm.thursday == false && this.createClassForm.friday == false) {
                this.weekday_validation = true;
            } else {
                this.weekday_validation = false;
            }

            if (this.createClassForm.class_type == 3 && this.createClassForm.monday1 == false && this.createClassForm.tuesday1 == false &&
                this.createClassForm.wednesday1 == false && this.createClassForm.thursday1 == false && this.createClassForm.friday1 == false &&
                this.createClassForm.saturday1 == false && this.createClassForm.sunday1 == false) {
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
                    if (this.$v.createClassForm.$invalid) {
                        return;
                    }
                    this.createClass();
                } else {
                    this.submitted = false;
                }
            } else {
                this.submitted = false;
                this.submit_permission = true;
            }
        },
        
        createClass() {
            if (this.createClassForm.class_type == 3) {
                this.monday = this.createClassForm.monday1;
                this.tuesday = this.createClassForm.tuesday1;
                this.wednesday = this.createClassForm.wednesday1;
                this.thursday = this.createClassForm.thursday1;
                this.friday = this.createClassForm.friday1;
                this.saturday = this.createClassForm.saturday1;
                this.sunday = this.createClassForm.sunday1;
            } else {
                this.monday = this.createClassForm.monday;
                this.tuesday = this.createClassForm.tuesday;
                this.wednesday = this.createClassForm.wednesday;
                this.thursday = this.createClassForm.thursday;
                this.friday = this.createClassForm.friday;
                this.saturday = this.createClassForm.saturday;
                this.sunday = this.createClassForm.sunday;
            }
            var request = {
                course_id: this.createClassForm.course_id,
                course_title: this.createClassForm.course_title,
                fee: this.createClassForm.fee,
                start_time: this.createClassForm.start_time,
                end_time: this.createClassForm.end_time,
                start_date: this.createClassForm.start_date,
                end_date: this.createClassForm.end_date,
                monday: this.monday,
                tuesday: this.tuesday,
                wednesday: this.wednesday,
                thursday: this.thursday,
                friday: this.friday,
                saturday: this.saturday,
                sunday: this.sunday,
                class_type: this.createClassForm.class_type,
            };
            axios.post("class/create", JSON.stringify(request), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(() => {
                    this.$router.push({
                        name: "manageClass"
                    });
                    this.$notification.success("လုပ်ဆောင်မှု အောင်မြင်ပါသည်။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                })
                .catch(() => {
                    this.$notification.error("လုပ်ဆောင်မှု မအောင်မြင်ပါ။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                })
        },
        
        getCoursesForClass() {
            axios.get("course/class/" + this.teacherId)
                .then((response) => {
                    this.courses = response.data;
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