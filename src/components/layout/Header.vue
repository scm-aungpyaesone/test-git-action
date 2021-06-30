<template>
  <header class="main-header">
    <div class="top-nav bg-green profile-page">
      <div class="container">
        <ul class="top-nav-menu justify-content-end d-flex py-2 flex-wrap text-right">
          <li v-if="isLoggedIn && userType=='teacher'" class="mr-1 mg">
            <a class="btn text-white" :href="$router.resolve({name: 'teacherNotification'}).href">
              <div v-if="count > 0 && count <= 9" class="noti-alarm">
                <span class="noti-total">{{ count }}</span>
              </div>
              <div v-if="count > 9" class="noti-alarm">
                <span class="noti-total">9+</span>
              </div>
              <i class="far fa-bell"></i>အသိပေးချက်
            </a>
          </li>
          <li v-if="isLoggedIn && userType=='teacher' && userName" class="mr-1 profile-dropdown mg">
            <dropdown-menu v-model="show">
              <button class="btn text-white drp-btn">{{userName}}
                <i class="fas fa-chevron-down"></i>
              </button>
              <div slot="dropdown" class="profile-drp-menu ">
                <ul class="roboto profile-list text-left">
                  <li>
                    <a :href="$router.resolve({name: 'detailTeacher'}).href">ဆရာ အချက်အလက်</a>
                  </li>
                  <li>
                    <a :href="$router.resolve({name: 'createCourse'}).href">သင်တန်း အသစ်ထည့်ရန်</a>
                  </li>
                  <li>
                    <a :href="$router.resolve({name: 'manageCourse'}).href">သင်တန်း စီမံရန်</a>
                  </li>
                  <li>
                    <a :href="$router.resolve({name: 'createClass'}).href">တန်းခွဲ အသစ်ထည့်ရန်</a>
                  </li>
                  <li>
                    <a :href="$router.resolve({name: 'manageClass'}).href">တန်းခွဲ စီမံရန်</a>
                  </li>
                  <li>
                    <a :href="$router.resolve({name: 'manageStudent'}).href">ကျောင်းသား စီမံခန့်ခွဲရန်</a>
                  </li>
                  <li>
                    <a :href="$router.resolve({name: 'changeTeacherPassword'}).href">စကားဝှက်ပြောင်းရန်</a>
                  </li>
                </ul>
              </div>
            </dropdown-menu>
          </li>
          <li v-if="isLoggedIn && userType=='teacher'" class="mr-sm-1 mb-1 mb-md-0 mg">
            <a v-on:click="logoutTeacher()" class="btn text-white">အကောင့် ထွက်ရန်</a>
          </li>
          <li v-if="isLoggedIn && userType=='student'" class="mr-1 mg">
            <a class="btn text-white" :href="$router.resolve({name: 'studentNotification'}).href">
              <div v-if="count > 0 && count <= 9" class="noti-alarm">
                <span class="noti-total">{{ count }}</span>
              </div>
              <div v-if="count > 9" class="noti-alarm">
                <span class="noti-total">9+</span>
              </div>
              <i class="far fa-bell"></i>အသိပေးချက်
            </a>
          </li>
          <li v-if="isLoggedIn && userType=='student' && userName" class="mr-1 profile-dropdown mg">
            <dropdown-menu v-model="show">
              <button class="btn text-white drp-btn">
                {{userName}}
                <i class="fas fa-chevron-down"></i>
              </button>
              <div slot="dropdown" class="profile-drp-menu">
                <ul class="profile-list">
                  <li>
                    <a title="ကျောင်းသားအချက်အလက်" :href="$router.resolve({name: 'detailStudent'}).href">ကျောင်းသားအချက်အလက်</a>
                  </li>
                  <li>
                    <a title="တန်းခွဲများ" :href="$router.resolve({name: 'enrollStudentList'}).href">တန်းခွဲများ</a>
                  </li>
                  <li>
                    <a title="သင်တန်း တောင်းဆိုရန်" :href="$router.resolve({name: 'courseRequest'}).href">သင်တန်း တောင်းဆိုရန်</a>
                  </li>
                  <li>
                    <a title="စကားဝှက် ပြောင်းရန်" :href="$router.resolve({name: 'changePasswordStudent'}).href">စကားဝှက် ပြောင်းရန်</a>
                  </li>
                </ul>
              </div>
            </dropdown-menu>
          </li>
          <li v-if="isLoggedIn && userType=='student'" class="mr-sm-1 mb-1 mb-md-0 mg">
            <a v-on:click="logoutStudent()" class="btn text-white">အကောင့် ထွက်ရန်</a>
          </li>
          <li v-if="!isLoggedIn" class="mr-sm-1 mb-1 mb-md-0 mg">
            <router-link class="btn text-white" :to="{ name: 'login' }">အကောင့် ဝင်ရန်</router-link>
          </li>
          <li v-if="!isLoggedIn" class="mr-sm-1 mb-1 mb-md-0 mg">
            <router-link class="btn text-white" :to="{ name: 'agreementTeacher' }">ဆရာအကောင့် ပြုလုပ်ရန်</router-link>
          </li>
          <li v-if="!isLoggedIn" class="mr-sm-1 mb-1 mb-md-0 mg">
            <router-link class="btn text-white" :to="{ name: 'agreementStudent' }">ကျောင်းသားအကောင့် ပြုလုပ်ရန်</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="container">
      <nav class="navbar navbar-expand-lg px-0 py-1">
        <h1 class="m-0 logo">
          <a title="Home" :href="$router.resolve({ name: 'home' }).href">
            <img src="@/assets/images/logo.png" alt="Logo" class="img-fluid" />
          </a>
        </h1>
        <button class="navbar-toggler bg-green" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" @click.stop="toggleNavbar()">
          <span class="navbar-toggler-icon">
            <i class="fas fa-bars text-white"></i>
          </span>
        </button>
        <div class="collapse navbar-collapse ml-auto" id="navbarSupportedContent" v-bind:class="{ 'show': showNav }">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item text-center">
              <router-link exact class="nav-link mr-md-0 mr-0" :to="{ name: 'home' }">ပင်မစာမျက်နှာ</router-link>
            </li>
            <li class="nav-item text-center">
              <router-link exact class="nav-link mr-md-0 mr-0" :to="{ name: 'teacherList' }">ဆရာများ</router-link>
            </li>
            <li class="nav-item text-center">
              <router-link exact class="nav-link mr-md-0 mr-0" :to="{ name: 'courseList' }">သင်တန်းများ</router-link>
            </li>
            <li class="nav-item text-center">
              <router-link exact class="nav-link mr-md-0 mr-0" :to="{ name: 'classList' }">တန်းခွဲများ</router-link>
            </li>
            <li class="nav-item text-center">
              <router-link exact class="nav-link mr-md-0 mr-0" :to="{ name: 'courseRequestList' }">သင်တန်းသစ်တောင်းဆိုမှုများ</router-link>
            </li>
            <li class="nav-item text-center">
              <router-link exact class="nav-link mr-md-0 mr-0" :to="{ name: 'newsList' }">သတင်းများ</router-link>
            </li>
          </ul>          
        </div>
      </nav>    
    </div>
  </header>
</template>

<script src="../../services/layout/header.js"></script>

<style src="../../assets/css/components/layout/header.css"></style>