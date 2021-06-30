import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import AboutUs from '@/components/AboutUs.vue'
import PrivacyPolicy from '@/components/PrivacyPolicy.vue'
import TermsOfService from '@/components/TermsOfService.vue'
import AgreementTeacher from '@/components/teacher/AgreementTeacher.vue'
import SignupTeacher from '@/components/teacher/SignupTeacher.vue'
import DetailTeacher from '@/components/teacher/DetailTeacher.vue'
import EditTeacher from '@/components/teacher/EditTeacher.vue'
import CourseList from '@/components/teacher/CourseList.vue'
import DetailCourse from '@/components/teacher/DetailCourse.vue'
import CreateCourse from '@/components/teacher/CreateCourse.vue'
import CreateClass from '@/components/teacher/CreateClass.vue'
import ManageClass from '@/components/teacher/ManageClass.vue'
import EditClass from '@/components/teacher/EditClass.vue'
import ClassList from '@/components/teacher/ClassList.vue'
import DetailClass from '@/components/teacher/DetailClass.vue'
import TeacherList from '@/components/teacher/TeacherList.vue'
import DetailListTeacher from '@/components/teacher/DetailListTeacher.vue'
import ChangePassword from '@/components/teacher/ChangePassword.vue'
import ManageStudent from '@/components/teacher/ManageStudent.vue'
import ManageCourse from '@/components/teacher/ManageCourse.vue'
import EditCourse from '@/components/teacher/EditCourse.vue'
import LookStudentProfile from '@/components/teacher/LookStudentProfile.vue'
import LookTeacherProfile from '@/components/student/LookTeacherProfile.vue'
import AgreementStudent from '@/components/student/AgreementStudent.vue'
import SignupStudent from '@/components/student/SignupStudent.vue'
import DetailStudent from '@/components/student/DetailStudent.vue'
import EditStudent from '@/components/student/EditStudent.vue'
import ChangePasswordStudent from '@/components/student/ChangePasswordStudent.vue'
import NewsList from '@/components/news/NewsList.vue'
import NewsDetail from '@/components/news/NewsDetail.vue'
import TeacherNotification from '@/components/notification/TeacherNotification.vue'
import TeacherNotificationDetail from '@/components/notification/TeacherNotificationDetail.vue'
import StudentNotification from '@/components/notification/StudentNotification.vue'
import StudentNotificationDetail from '@/components/notification/StudentNotificationDetail.vue'
import ForgetPassword from '@/components/password/ForgetPassword.vue'
import ResetPassword from '@/components/password/ResetPassword.vue'
import CourseRequest from '@/components/student/CourseRequest.vue'
import EnrollStudentList from '@/components/student/EnrollStudentClass.vue'
import CourseRequestList from '@/components/student/CourseRequestList.vue'
import CourseRequestDetail from '@/components/student/CourseRequestDetail.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/about-us',
        name: 'aboutUs',
        component: AboutUs
    },
    {
        path: '/privacy-policy',
        name: 'privacyPolicy',
        component: PrivacyPolicy
    },
    {
        path: '/terms-of-service',
        name: 'termsOfService',
        component: TermsOfService
    },
    {
        path: '/editCourse/:id',
        name: 'editCourse',
        component: EditCourse
    },
    {
        path: '/enrollStudentList',
        name: 'enrollStudentList',
        component: EnrollStudentList
    },
    {
        path: '/manageCourse',
        name: 'manageCourse',
        component: ManageCourse
    },
    {
        path: '/courseRequest',
        name: 'courseRequest',
        component: CourseRequest
    },
    {
        path: '/courseRequestList',
        name: 'courseRequestList',
        component: CourseRequestList
    },
    {
        path: '/courseRequestDetail/:id',
        name: 'courseRequestDetail',
        component: CourseRequestDetail
    },
    {
        path: '/logout',
        name: 'logout',
        component: Home
    },
    {
        path: '/lookTeacherProfile/:id',
        name: 'lookTeacherProfile',
        component: LookTeacherProfile
    },
    {
        path: '/lookStudentProfile/:id',
        name: 'lookStudentProfile',
        component: LookStudentProfile
    },
    {
        path: '/password/forget',
        name: 'forgetPassword',
        component: ForgetPassword
    },
    {
        path: '/password/reset',
        name: 'resetPassword',
        component: ResetPassword,
        query: {
            token: 'token'
        }
    },
    {
        path: '/agreementteacher',
        name: 'agreementTeacher',
        component: AgreementTeacher
    },
    {
        path: '/signupteacher',
        name: 'signupTeacher',
        component: SignupTeacher
    },
    {
        path: '/teacher/detail',
        name: 'detailTeacher',
        component: DetailTeacher,
        meta: {
            permission: 'teacher'
        }
    },
    {
        path: '/teacher/edit',
        name: 'editTeacher',
        component: EditTeacher,
        meta: {
            permission: 'teacher'
        }
    },
    {
        path: '/teacher/list/detail/:id',
        name: 'detailListTeacher',
        component: DetailListTeacher,
    },
    {
        path: '/course/list',
        name: 'courseList',
        component: CourseList,
    },
    {
        path: '/course/detail/:id',
        name: 'detailCourse',
        component: DetailCourse,
    },
    {
        path: '/createcourse',
        name: 'createCourse',
        component: CreateCourse,
        meta: {
            permission: 'teacher'
        }
    },
    {
        path: '/createclass',
        name: 'createClass',
        component: CreateClass,
        meta: {
            permission: 'teacher'
        }
    },
    {
        path: '/manageclass',
        name: 'manageClass',
        component: ManageClass,
        meta: {
            permission: 'teacher'
        }
    },
    {
        path: '/manageclass/edit/:id',
        name: 'editClass',
        component: EditClass,
        meta: {
            permission: 'teacher'
        }
    },
    {
        path: '/class/list',
        name: 'classList',
        component: ClassList,
    },
    {
        path: '/class/detail/:id',
        name: 'detailClass',
        component: DetailClass
    },
    {
        path: '/teacher/changepassword',
        name: 'changeTeacherPassword',
        component: ChangePassword
    },
    {
        path: '/teacher/managestudent',
        name: 'manageStudent',
        component: ManageStudent
    },
    {
        path: '/teacher/list',
        name: 'teacherList',
        component: TeacherList,
    },
    {
        path: '/agreementStudent',
        name: 'agreementStudent',
        component: AgreementStudent
    },
    {
        path: '/signupStudent',
        name: 'signupStudent',
        component: SignupStudent
    },
    {
        path: '/student/detail',
        name: 'detailStudent',
        component: DetailStudent,
        meta: {
            permission: 'student'
        }
    },
    {
        path: '/student/edit',
        name: 'editStudent',
        component: EditStudent,
        meta: {
            permission: 'student'
        }
    },
    {
        path: '/student/changepassword',
        name: 'changePasswordStudent',
        component: ChangePasswordStudent,
        meta: {
            permission: 'student'
        }
    },
    {
        path: '/newslist',
        name: 'newsList',
        component: NewsList,
    },
    {
        path: '/news/detail/:id',
        name: 'newsDetail',
        component: NewsDetail,
    },
    {
        path: '/teacher/notification',
        name: 'teacherNotification',
        component: TeacherNotification,
        meta: {
            permission: 'teacher'
        }
    },
    {
        path: '/teacher/notification/detail/:id',
        name: 'teacherNotificationDetail',
        component: TeacherNotificationDetail,
        meta: {
            permission: 'teacher'
        }
    },
    {
        path: '/student/notification',
        name: 'studentNotification',
        component: StudentNotification,
        meta: {
            permission: 'student'
        }
    },
    {
        path: '/student/notification/detail/:id',
        name: 'studentNotificationDetail',
        component: StudentNotificationDetail,
        meta: {
            permission: 'student'
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    const userType = store.getters.userType;
    if (to.path === "/teacher/detail" && to.query.token) {
        next();
    } else {
        switch (to.meta.permission) {
            case 'teacher':
                if (userType == 'teacher') {
                    next();
                } else {
                    next({
                        name: 'login'
                    });
                }
                break;

            case 'student':
                if (userType == 'student') {
                    next();
                } else {
                    next({
                        name: 'login'
                    });
                }
                break;

            default:
                next();
        }
    }
});

export default router;