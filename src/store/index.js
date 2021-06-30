import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

export default new Vuex.Store({
    state: {
        user: null,
        count: 0
    },

    mutations: {
        setUserData(state, userData) {
            state.user = userData;
        },

        setNotificationCount(state, count) {
            state.count = count;
        }
    },

    actions: {
        login({ commit }, credentials) {
            return axios.post("/login", credentials).then(({ data }) => {
                commit("setUserData", data);
                commit("setNotificationCount", data.count);
            });
        },

        logoutTeacher({ commit }) { 
            return axios.post("/teacher/logout")
                .then(() => {
                    commit("setUserData", null);
                })
                .catch((error) => {
                    console.log("Log Out API Error", error.response);
                });      
        },
        
        logoutStudent({ commit }) { 
            return axios.post("/student/logout")
                .then(() => {
                    commit("setUserData", null);
                })
                .catch((error) => {
                    console.log("Log Out API Error", error.response);
                });      
       },
    },

    getters: {
        isLoggedIn: (state) => !!state.user,

        userType: (state) => {
            if (state.user && state.user.usertype) {
                return state.user.usertype;
            }
        },
    
        teacherId: (state) => {
            if (state.user && state.user.accountuser.teacher_id) {
                return state.user.accountuser.teacher_id;
            }
        },

        studentId: (state) => {
            if (state.user && state.user.accountuser.student_id) {
                return state.user.accountuser.student_id;
            }               
        },

        personalId: (state) => {
            if (state.user && state.user.accountuser.personal_id) {
                return state.user.accountuser.personal_id;
            }
        },
        
        userName: (state) => {
            if (state.user && state.user.accountuser.name) {
                return state.user.accountuser.name;
            }
            if (state.user && !state.user.accountuser.name) {
                return state.user.accountuser.school_name;
            }
        },

        userEmail: (state) => {
            if (state.user && state.user.accountuser.email) {
                return state.user.accountuser.email;
            }
        },

        userToken: (state) => {
            if (state.user && state.user.token) {
                return state.user.token;
            }
        },

        count: (state) => {
            if (state.count) {
                return state.count;
            }
        }
    },

    plugins: [createPersistedState()],
});
