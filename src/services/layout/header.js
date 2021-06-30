import DropdownMenu from "@innologica/vue-dropdown-menu";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
    name: "Header",

    components: {
        DropdownMenu
    },

    data() {
        return {
            showNav: false,
            show: false,
        };
    },

    computed: {
        ...mapGetters({
            isLoggedIn: "isLoggedIn", userToken: "userToken", userName: "userName", userType: "userType", teacherId: "teacherId", studentId: "studentId", count: "count"
        }),
    },

    methods: {
        toggleNavbar() {
            this.showNav = !this.showNav;
        },
        
        logoutTeacher() {
            store.dispatch("logoutTeacher").then(() => {
                this.$router.push({
                    name: "home"
                });
                location.reload();
            });
        },

        logoutStudent() {
            store.dispatch("logoutStudent").then(() => {
                this.$router.push({
                    name: "home"
                });
                location.reload();
            });
        }
    }
};