import StarRating from "vue-star-rating";
import { mapGetters } from "vuex";

export default {
    components: {
        StarRating
    },

    props: {
        tabObj: {
            type: Object
        }
    },

    data: function () {
        return {
            class_rating: 0,
        };
    },

    computed: {
        ...mapGetters(["userType", "studentId"]),
    },

    methods: {
        setRating: function (rating) {
            this.$emit('setRating', rating)
        },

        confirmEnroll() {
            this.$modal.show('dialog', {
                title: 'အတည်ပြုခြင်း!',
                text: 'ဤအတန်းကိုတက်မှာ သေချာပြီလား?',
                buttons: [{
                        title: 'တက်မည်',
                        default: true,
                        handler: () => {
                            this.$emit('enrollClass')
                        }
                    },
                    {
                        title: 'မတက်ပါ'
                    }
                ]
            });
        },
    },
    
    created() {
        this.isStudent = this.userType == "student" ? true : false;
        this.isLogin = this.studentId ? true : false;
    }
};