<template>
  <MainLayout>
    <section class="manage-class py-5 profile-page-content">
      <div class="container pb-2 pb-md-4">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ဆရာအကောင့်ဆက်တင်
          <span>ကျောင်းသားအချက်အလက်</span>
        </h2>
        <div class="row">
          <div class="col-lg-3 col-md-4 aside">
            <ul class="profile-list pyidaungsu-regular">
              <li><a :href="$router.resolve({name: 'detailTeacher'}).href">ဆရာအ‌ကြောင်း အသေးစိတ်</a></li>                 
              <li><a :href="$router.resolve({name: 'createCourse'}).href">သင်ခန်းစာ အသစ်ထည့်ရန်</a></li>
              <li><a :href="$router.resolve({name: 'manageCourse'}).href">သင်ခန်းစာ စီမံရန်</a> </li>                  
              <li><a :href="$router.resolve({name: 'createClass'}).href">တန်းခွဲ အသစ်ထည့်ရန်</a> </li>                                  
              <li><a :href="$router.resolve({name: 'manageClass'}).href">တန်းခွဲ စီမံရန်</a> </li>             
              <li><a :href="$router.resolve({name: 'manageStudent'}).href" class="active">ကျောင်းသား စီမံခန့်ခွဲရန်</a></li> 
              <li><a :href="$router.resolve({name: 'changeTeacherPassword'}).href">စကားဝှက်ပြောင်းရန်</a></li> 
            </ul>
          </div>
          <div class="col-lg-9 col-md-8">
            <div class="profile-page-main">
              <div class="view-profile p-4">
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">နာမည်</p>
                  <p class="roboto">{{ student.name }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">Facebook Name/ID</p>
                  <p class="roboto">{{ student.social_media_id }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ကျောင်းအမည် (တက်နေဆဲ/ပြီးဆုံး/အခြား)</p>
                  <p class="roboto">{{ student.school_name }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ကျား/မ</p>
                  <p class="roboto" v-if="student.gender == 1">ကျား</p>
                  <p class="roboto" v-else>မ</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">မွေးနေ့</p>
                  <p class="roboto">{{ student.date_of_birth }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ဖုန်းနံပါတ် ၁</p>
                  <p class="roboto">{{ student.phone_number_1 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ဖုန်းနံပါတ် ၂</p>
                  <p class="roboto">{{ student.phone_number_2 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">အီးမေးလ် ၁</p>
                  <p class="roboto">{{ student.email_1 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">အီးမေးလ် ၂</p>
                  <p class="roboto">{{ student.email_2 }}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">တိုင်းဒေသကြီး</p>
                  <p v-for="(value, index) in regionArr" :key="index" :value="value"><span v-if="index==student.region">{{value}}</span></p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">မြို့နယ်</p>
                  <p class="roboto">{{ student.town }}</p>
                </div>
                <div class="d-flex flex-wrap">
                  <p class="mr-4">လိပ်စာ</p>
                  <p class="roboto">{{ student.address }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/look-student-profile.js"></script>
