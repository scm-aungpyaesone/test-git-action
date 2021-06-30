import MainLayout from '@/components/layout/MainLayout.vue';

export default {
    name: "agreementStudent",

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
                name: "signupStudent"
            });
        }
    },

    mounted() {

    },
    
    computed: {
        isDisabled: function () {
            return !this.seen;
        }
    }
};