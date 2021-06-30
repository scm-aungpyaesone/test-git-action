<template>
  <MainLayout :key="reloadKey">
    <section class="teacher-page-profile py-5 profile-page-content">
      <div class="container pb-2 pb-md-4">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ဆရာအကောင့်ဆက်တင်
          <span>ဆရာအချက်အလက်</span>
        </h2>
        <div class="row">
          <div class="col-lg-3 col-md-4 aside">
            <ul class="profile-list">
              <li>
                <a :href="$router.resolve({name: 'detailTeacher'}).href" class="active">ဆရာ အချက်အလက်</a>
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
          <div class="col-lg-9 col-md-8">
            <div class="profile-page-main">
              <div class="text-right mb-3 position-relative">
                <a class="text-green pyidaungsu-regular prepare" title="ပြင်ဆင်ရန်" :href="$router.resolve({name: 'editTeacher'}).href">
                  <i class="far fa-edit"></i>
                  <span>ပြင်ဆင်ရန်</span>
                </a>
              </div>
              <div class="view-profile p-4">
                <div class="user-icon d-flex justify-content-center align-items-center mb-3">
                  <template v-if="teacher.profile !=null">
                    <img :src="teacher.profile" alt="TeacherProfile" id="profile-pic-user" class="img-fluid" />
                  </template>
                  <template v-else>
                    <img v-if="teacher.gender == 0" src="@/assets/images/school.png" id="profile-pic-user" class="img-fluid" />
                    <img v-if="teacher.gender == 1" src="@/assets/images/male_avartar.png" id="profile-pic-user" class="img-fluid" />
                    <img v-if="teacher.gender == 2" src="@/assets/images/female_avartar.png" id="profile-pic-user" class="img-fluid" />
                  </template>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">Login ID</p>
                  <p class="roboto">{{ teacher.teacher_no }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">နာမည်</p>
                  <p class="roboto">{{ teacher.name }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">Facebook Name/ID</p>
                  <p class="roboto">{{ teacher.social_media_id }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">သင်တန်းကျောင်းအမည်</p>
                  <p class="roboto">{{ teacher.school_name }}</p>
                </div>

                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ပညာအရည်အချင်း</p>
                  <p class="roboto">{{ teacher.education }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">အတွေ့အကြုံ</p>
                  <p class="roboto">{{ teacher.experience }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ကျောင်းသူ/သား ထံသို့ အမှာစကား</p>
                  <p class="roboto">{{ teacher.message }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="roboto-medium mr-4">ကျား/မ</p>
                  <p class="roboto" v-if="teacher.gender == 1">ကျား</p>
                  <p class="roboto" v-if="teacher.gender == 2">မ</p>
                  <p class="roboto" v-else></p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">မွေးနေ့</p>
                  <p class="roboto">{{ teacher.date_of_birth }}</p>
                </div>
                <!-- <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">မှတ်ပုံတင် နံပါတ်</p>
                  <p class="roboto">{{ teacher.nrc_number }}</p>
                </div>
                <div v-if="teacher.nrc_front_name != null" class="d-flex mb-3 flex-wrap nrc-p">
                  <p class="mr-4">မှတ်ပုံတင် အရှေ့ဓါတ်ပုံ</p>
                  <div class="col-12 col-md-6 col-lg-4 pl-0">
                    <img :src="teacher.nrc_front" alt="Techer" class="img-fluid" />
                  </div>
                </div>
                <div v-if="teacher.nrc_back != null" class="d-flex mb-3 flex-wrap nrc-p">
                  <p class="mr-4">မှတ်ပုံတင် အနောက်ဓါတ်ပုံ</p>
                  <div class="col-12 col-md-6 col-lg-4 pl-0">
                    <img :src="teacher.nrc_back" alt="Techer" class="img-fluid" />
                  </div>
                </div> -->
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ဖုန်းနံပါတ် ၁</p>
                  <p class="roboto">{{ teacher.phone_number_1 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ဖုန်းနံပါတ် ၂</p>
                  <p class="roboto">{{ teacher.phone_number_2 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">အီးမေးလ် ၁</p>
                  <p class="roboto">{{ teacher.email_1 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">အီးမေးလ် ၂</p>
                  <p class="roboto">{{ teacher.email_2 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">တိုင်းဒေသကြီး</p>
                  <p class="roboto" v-for="(value, index) in regionArr" :key="index" :value="value"><span v-if="index==teacher.region">{{ value }}</span></p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">မြို့နယ်</p>
                  <p class="roboto">{{ teacher.town }}</p>
                </div>
                <div class="d-flex flex-wrap">
                  <p class="mr-4">လိပ်စာ</p>
                  <p class="roboto">{{ teacher.address }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/detail-teacher.js"></script>

<style src="../../assets/css/teacher/detail-teacher.css"></style>
