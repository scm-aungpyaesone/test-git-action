import MainLayout from '@/components/layout/MainLayout.vue';

export default {
    name: "agreementTeacher",

    components: {
        MainLayout
    },

    data() {
        return {
            seen: false
        }
    },

    methods: {
        submit() {
            this.$router.push({
                name: "signupTeacher"
            });
        },
    },

    mounted() {
        
    },

    computed: {
        isDisabled: function () {
            return !this.seen;
        }
    }
};