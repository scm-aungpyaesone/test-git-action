<template>
  <MainLayout>
    <section class="manage-class py-5 profile-page-content">
      <div class="container pb-2 pb-md-4">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ကျောင်းသားအကောင့်ဆက်တင်
          <span>ဆရာအချက်အလက်</span>
        </h2>
        <div class="row">
          <div class="col-lg-3 col-md-4 aside">
            <ul class="profile-list">
              <li>
                <a :href="$router.resolve({name: 'detailStudent'}).href">ကျောင်းသားအချက်အလက်</a>
              </li>
              <li>
                <a class="active"
                  :href="$router.resolve({name: 'enrollStudentList'}).href">တန်းခွဲများ</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'courseRequest'}).href">သင်တန်း တောင်းဆိုရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'changePasswordStudent'}).href">စကားဝှက် ပြောင်းရန်</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-9 col-md-8">
            <div class="profile-page-main">
              <div class="view-profile p-4">
                <div class="user-icon d-flex justify-content-center align-items-center mb-3">
                  <template v-if="teacher.profile !=null">
                    <img :src="teacher.profile" alt="Teacher"
                      id="profile-pic-user" class="img-fluid" />
                  </template>
                  <template v-else>
                    <img v-if="teacher.gender == 0" src="@/assets/images/school.png"
                      id="profile-pic-user" class="img-fluid" />
                    <img v-if="teacher.gender == 1" src="@/assets/images/male_avartar.png"
                      id="profile-pic-user" class="img-fluid" />
                    <img v-if="teacher.gender == 2" src="@/assets/images/female_avartar.png"
                      id="profile-pic-user" class="img-fluid" />
                  </template>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">နာမည်</p>
                  <p>{{ teacher.name }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">Facebook Name/ID</p>
                  <p>{{ teacher.social_media_id }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">သင်တန်းကျောင်းအမည်</p>
                  <p>{{ teacher.school_name }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ပညာအရည်အချင်း</p>
                  <p>{{ teacher.education }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">အတွေ့အကြုံ</p>
                  <p>{{ teacher.experience }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ကျောင်းသူ/သား ထံသို့ အမှာစကား</p>
                  <p>{{ teacher.message }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ကျား/မ</p>
                  <p v-if="teacher.gender == 1">ကျား</p>
                  <p v-if="teacher.gender == 2">မ</p>
                  <p v-else></p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">မွေးနေ့</p>
                  <p>{{ teacher.date_of_birth }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ဖုန်းနံပါတ် ၁</p>
                  <p>{{ teacher.phone_number_1 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ဖုန်းနံပါတ် ၂</p>
                  <p>{{ teacher.phone_number_2 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">အီးမေးလ် ၁</p>
                  <p>{{ teacher.email_1 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">အီးမေးလ် ၂</p>
                  <p>{{ teacher.email_2 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">တိုင်းဒေသကြီး</p>
                  <p v-for="(value, index) in regionArr" :key="index" :value="value"><span v-if="index==teacher.region">{{value}}</span></p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">မြို့နယ်</p>
                  <p>{{ teacher.town }}</p>
                </div>
                <div class="d-flex flex-wrap">
                  <p class="mr-4">လိပ်စာ</p>
                  <p>{{ teacher.address }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/student/look-teacher-profile.js"></script>
