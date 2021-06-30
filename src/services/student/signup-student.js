import MainLayout from '@/components/layout/MainLayout.vue';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { ConvertNumService } from '@/assets/js/convertNumberService.js';
import { required, email, sameAs, minLength, maxLength, numeric } from 'vuelidate/lib/validators';
import NrcNameJson from '@/assets/json/nrc_list.json';
import NaingJson from '@/assets/json/naing.json';
import RegionJson from '@/assets/json/region.json';
import $ from "jquery";
import TwspNameJson from "@/assets/json/township.json";
import axios from "axios";
import { mapGetters } from "vuex";

const convertNumberService = new ConvertNumService();

export default {
    name: "signupStudent",

    components: {
        MainLayout,
        DatePicker
    },

    data() {
        return {
            signupForm: {
                profile: '',
                name: this.data ? this.data.name : '',
                school_name: '',
                nrc_valid: '',
                nrc_number: '',
                nrc_front: '',
                nrc_back: '',
                gender: '',
                date_of_birth: '',
                phone_number_1: '',
                phone_number_2: '',
                email_1: this.data ? this.data.email_1 : '',
                email_2: '',
                region: '',
                town: '',
                address: '',
                password: '',
                confirm_password: ''
            },
            profile: '',
            image_front: '',
            image_back: '',
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
            nrckey: '',
            selectedNrcName: '',
            selectedNrcNaing: '',
            districtList: [],
            naingList: [],
            nrcName: [],
            errorArr: [],
            submitted: false,
            social_media_id: this.data ? this.data.social_media_id : ''
        }
    },

    props: ['data'],

    validations: {
        signupForm: {
            name: {
                required,
                maxLength: maxLength(100)
            },
            school_name: {
                maxLength: maxLength(100)
            },
            nrc_valid: {
                minLength: minLength(6),
                maxLength: maxLength(6),
                numeric
            },
            gender: {
                required
            },
            date_of_birth: {
                required
            },
            phone_number_1: {
                required,
                maxLength: maxLength(20),
                numeric
            },
            phone_number_2: {
                maxLength: maxLength(20)
            },
            email_1: {
                required,
                email
            },
            email_2: {
                email
            },
            region: {
                required
            },
            address: {
                maxLength: maxLength(200)
            },
            password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(12)
            },
            confirm_password: {
                required,
                sameAsPassword: sameAs("password")
            }
        },
    },

    computed: {
        ...mapGetters(["personalId", "userName", "userEmail"]),
    },

    methods: {
        onProfileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return null;
            this.signupForm.profile = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                this.profile = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        },

        onNrcFrontChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return null;
            this.signupForm.nrc_front = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                this.image_front = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        },

        onNrcBackChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return null;
            this.signupForm.nrc_back = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                this.image_back = e.target.result;
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
            this.region = Value;
            this.selectedTwspName = "";
            this.twspName = this.changeTwspName(Value);
        },

        changeTwspName(value, twspName) {
            twspName = this.twspNameJson[value];
            return twspName;
        },

        onChangeTwspName(event) {
            var Value = event.target.value;
            this.signupForm.town = Value;
        },

        notAfterToday(date) {
            return date > new Date(new Date().setHours(0, 0, 0, 0));
        },

        submit() {
            this.submitted = true;
            this.signupForm.nrc_valid = convertNumberService.convertMm2Eng(this.signupForm.nrc_number);
            if (this.$v.signupForm.$invalid) {
                return;
            }
            this.signupForm.nrc_valid = '';
            this.signUp()
        },
        
        signUp() {
            var nrc = '';
            if (this.nrckey && this.signupForm.nrc_number) {
                nrc = convertNumberService.convertEng2Mm(this.nrckey)
                    .concat('/')
                    .concat(this.selectedNrcName)
                    .concat(this.selectedNrcNaing)
                    .concat(convertNumberService.convertEng2Mm(this.signupForm.nrc_number));
            }
            const data = new FormData();
            data.append('name', this.signupForm.name);
            data.append('school_name', this.signupForm.school_name);
            data.append('nrc_number', nrc);
            data.append('gender', this.signupForm.gender);
            data.append('date_of_birth', this.signupForm.date_of_birth);
            data.append('phone_number_1', this.signupForm.phone_number_1);
            data.append('phone_number_2', this.signupForm.phone_number_2);
            data.append('email_1', this.signupForm.email_1);
            data.append('email_2', this.signupForm.email_2);
            data.append('region', this.signupForm.region);
            data.append('town', this.signupForm.town);
            data.append('address', this.signupForm.address);
            data.append('password', this.signupForm.password);
            data.append('social_media_id', this.social_media_id);
            data.append('profile', this.profile);
            data.append('nrc_front', this.image_front);
            data.append('nrc_back', this.image_back);
            axios.post("/student/register", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    this.$notification.success("သင့်ရဲ့ အကောင့်နံပါတ် " + response.data.student_no, {
                        timer: 20,
                        position: 'topCenter'
                    });
                    this.$router.push({
                        name: "login"
                    });
                })
                .catch((error) => {
                    this.errorArr = error.response.data.errors;
                    console.log("signup error", error);
                });
        }
    },

    mounted() {
        if (typeof this.userName !== "undefined") {
            this.signupForm.name = this.userName;
        }

        if (typeof this.userEmail !== "undefined") {
            this.signupForm.email_1 = this.userEmail;
        }

        if (typeof this.personalId !== "undefined") {
            this.social_media_id = this.personalId;
        }
        
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
};