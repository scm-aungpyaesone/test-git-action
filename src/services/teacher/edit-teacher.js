import MainLayout from "@/components/layout/MainLayout.vue";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { ConvertNumService } from "@/assets/js/convertNumberService.js";
import { required, email, maxLength, minLength } from "vuelidate/lib/validators";
import NrcNameJson from "@/assets/json/nrc_list.json";
import NaingJson from "@/assets/json/naing.json";
import RegionJson from '@/assets/json/region.json';
import TwspNameJson from "@/assets/json/township.json";
import axios from "axios";
import { mapGetters } from "vuex";
import $ from "jquery";
import store from "@/store";

const convertNumberService = new ConvertNumService();

export default {
    name: "editTeacher",

    components: {
        MainLayout,
        DatePicker
    },

    data() {
        return {
            teacher: {
                name: "",
                school_name: "",
                // nrc_valid: '',
                nrc_number: "",
                education: "",
                experience: "",
                message: "",
                gender: "",
                date_of_birth: "",
                value: "",
                phone_number_1: "",
                phone_number_2: "",
                email_1: "",
                email_2: "",
                region: "",
                address: "",
                town: ""
            },
            profile: "",
            nrc_front: "",
            nrc_back: "",
            image_profile: "",
            image_front: "",
            image_back: "",
            nrcno: [{
                    value: "1",
                    name: "၁"
                },
                {
                    value: "2",
                    name: "၂"
                },
                {
                    value: "3",
                    name: "၃"
                },
                {
                    value: "4",
                    name: "၄"
                },
                {
                    value: "5",
                    name: "၅"
                },
                {
                    value: "6",
                    name: "၆"
                },
                {
                    value: "7",
                    name: "၇"
                },
                {
                    value: "8",
                    name: "၈"
                },
                {
                    value: "9",
                    name: "၉"
                },
                {
                    value: "10",
                    name: "၁၀"
                },
                {
                    value: "11",
                    name: "၁၁"
                },
                {
                    value: "12",
                    name: "၁၂"
                },
                {
                    value: "13",
                    name: "၁၃"
                },
                {
                    value: "14",
                    name: "၁၄"
                }
            ],
            nrcNameJson: NrcNameJson,
            naingJson: NaingJson,
            regionArr: RegionJson,
            twspNameJson: TwspNameJson,
            selectedTwspName: "",
            twspName: [],
            nrckey: "",
            selectedNrcName: "",
            selectedNrcNaing: "",
            districtList: [],
            naingList: [],
            nrcName: [],
            errorArr: [],
            submitted: false,
            one_field_required_error: false
        };
    },

    validations: {
        teacher: {
            name: {
                // required,
                maxLength: maxLength(100)
            },
            school_name: {
                maxLength: maxLength(100)
            },
            nrc_number: {
                minLength: minLength(6),
                maxLength: maxLength(6),
                // numeric
            },
            // gender: {
            //     required
            // },
            // date_of_birth: {
            //     required
            // },
            phone_number_1: {
                required,
                maxLength: maxLength(20)
            },
            phone_number_2: {
                maxLength: maxLength(20)
            },
            email_1: {
                // required,
                email
            },
            email_2: {
                email
            },
            region: {
                required,
                maxLength: maxLength(100)
            },
            address: {
                maxLength: maxLength(200)
            }
        }
    },

    computed: {
        ...mapGetters(["teacherId", "studentId", "userType"]),
    },

    methods: {
        setAltImg(event) {
            event.target.src = "data:image/png;base64,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"
        },

        onProfileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return null;
            let reader = new FileReader();
            reader.onload = (e) => {
                this.image_profile = e.target.result;
                this.profile = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        },

        onNrcFrontChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return null;
            let reader = new FileReader();
            reader.onload = (e) => {
                this.image_front = e.target.result;
                this.nrc_front = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        },

        onNrcBackChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return null;
            let reader = new FileReader();
            reader.onload = (e) => {
                this.image_back = e.target.result;
                this.nrc_back = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        },

        onChange(event) {
            var optionValue = event.target.value;
            var optionText = event.target.options[event.target.options.selectedIndex].text;
            if (optionValue) {
                this.nrckey = optionText;
            } else {
                this.nrckey = optionValue;
            }
            this.selectedNrcName = "";
            this.districtList = this.changeNrcName(optionValue);
        },

        changeNrcName(value, nrcName) {
            nrcName = this.nrcNameJson[value - 1];
            return nrcName;
        },

        onChangeNrcName() {
            this.naingList = this.naingJson;
        },

        onRegionChange(event) {
            var Value = event.target.value;
            this.teacher.region = Value;
            this.selectedTwspName = "";
            this.twspName = this.changeTwspName(Value);
        },

        changeTwspName(value, twspName) {
            twspName = this.twspNameJson[value];
            return twspName;
        },

        onChangeTwspName(event) {
            var Value = event.target.value;
            this.teacher.town = Value;
        },
        
        one_field_required_check() {
            var name = this.teacher.name;
            var school_name = this.teacher.school_name;
            if (name == "" && school_name == "") {
                this.one_field_required_error = true
            } else {
                this.one_field_required_error = false
            }
        },

        getDetailTeacher() {
            axios.get("/teacher/profile/" + this.teacherId)
                .then((response) => {
                    this.teacher = response.data;
                    this.twspName = this.changeTwspName(this.teacher.region);
                    if (response.data.nrc_number) {
                        var nrcfirst = response.data.nrc_number.split('/');
                        var nrcsecond = nrcfirst[1].split('(');
                        var nrcthird = nrcsecond[1].split(')');
                        this.nrckey = convertNumberService.convertMm2Eng(nrcfirst[0]);
                        this.selectedNrcName = nrcsecond[0];
                        this.districtList = this.changeNrcName(this.nrckey);
                        this.naingList = this.naingJson;
                        this.selectedNrcNaing = '(' + nrcthird[0] + ')';
                        this.teacher.nrc_number = nrcthird[1];
                    }
                    if (this.teacher.profile != null) {
                        this.image_profile = this.teacher.profile;
                    }
                    if (this.teacher.nrc_front != null) {
                        this.image_front = this.teacher.nrc_front;
                    }
                    if (this.teacher.nrc_back != null) {
                        this.image_back = this.teacher.nrc_back;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        cancel() {
            this.$router.push({
                name: "detailTeacher",
                params: this.teacherId
            });
        },

        handleSubmit() {
            this.submitted = true;
            // this.teacher.nrc_valid = convertNumberService.convertMm2Eng(this.teacher.nrc_number);
            if (this.$v.teacher.$invalid) {
                return;
            } else if (this.one_field_required_error == true) {
                return;
            } 
            this.updateTeacher();
            // this.teacher.nrc_valid = '';
        },
        
        notAfterToday(date) {
            return date > new Date(new Date().setHours(0, 0, 0, 0));
        },
        
        updateTeacher() {
            var nrc = '';
            if (this.nrckey &&
                this.selectedNrcName &&
                this.selectedNrcNaing &&
                this.teacher.nrc_number) {
                nrc = convertNumberService.convertEng2Mm(this.nrckey)
                    .concat('/')
                    .concat(this.selectedNrcName)
                    .concat(this.selectedNrcNaing)
                    .concat(convertNumberService.convertEng2Mm(this.teacher.nrc_number));
            }

            const data = new FormData();
            data.append('name', this.teacher.name);
            data.append('school_name', this.teacher.school_name);
            data.append('nrc_number', nrc);
            data.append('gender', this.teacher.gender);
            data.append('date_of_birth', this.teacher.date_of_birth);
            data.append('phone_number_1', this.teacher.phone_number_1);
            data.append('phone_number_2', this.teacher.phone_number_2);
            data.append('email_1', this.teacher.email_1);
            data.append('email_2', this.teacher.email_2);
            data.append('region', this.teacher.region);
            data.append('town', this.teacher.town);
            data.append('address', this.teacher.address);
            data.append('education', this.teacher.education);
            data.append('experience', this.teacher.experience);
            data.append('message', this.teacher.message);
            data.append('profile', this.profile);
            data.append('nrc_front', this.nrc_front);
            data.append('nrc_back', this.nrc_back);
            axios.post("teacher/updateProfile/" + this.teacherId, data)
                .then(() => {
                    this.$router.push({
                        name: "detailTeacher",
                        params: this.teacherId
                    });
                    this.$notification.success("လုပ်ဆောင်မှု အောင်မြင်ပါသည်။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
                })
                .catch(error => {
                    this.errorArr = error.response.data.errors;
                    this.$notification.error("လုပ်ဆောင်မှု မအောင်မြင်ပါ။", {
                        timer: 3,
                        position: "bottomCenter"
                    });
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
        $("#nrc_number").on("keypress keyup blur", function (event) {
            $(this).val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

        $("#phone_number_1").on("keypress keyup blur", function (event) {
            $(this).val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

        $("#phone_number_2").on("keypress keyup blur", function (event) {
            $(this).val($(this).val().replace(/[^\d].+/, ""));
            if ((event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });
    },

    created() {
        this.getDetailTeacher();
        this.notificationCount();   
    }
};