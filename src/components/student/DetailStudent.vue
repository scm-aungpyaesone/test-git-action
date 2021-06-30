<template>
  <MainLayout>
    <section class="py-5 profile-page-content">
      <div class="container pb-2 pb-md-4">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ကျောင်းသားအကောင့်ဆက်တင်
          <span>ကျောင်းသားအချက်အလက်</span>
        </h2>
        <div class="row">
          <div class="col-lg-3 col-md-4 aside">
            <ul class="profile-list">
              <li>
                <a title="ကျောင်းသားအချက်အလက်" class="active"
                  :href="$router.resolve({name: 'detailStudent'}).href">ကျောင်းသားအချက်အလက်</a>
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
          <div class="col-lg-9 col-md-8">
            <div class="profile-page-main">
              <div class="text-right mb-3">
                <a title="ပြင်ဆင်ရန်" :href="$router.resolve({name: 'editStudent'}).href" class="text-green pyidaungsu-regular prepare">
                  <i class="far fa-edit"></i>
                  <span>ပြင်ဆင်ရန်</span>
                </a>
              </div>
              <div class="view-profile p-4">
                <div class="user-icon d-flex justify-content-center align-items-center mb-3">
                  <template v-if="student.profile !=null">
                    <img :src="student.profile" alt="studentProfile" id="profile-pic-user" class="img-fluid" />
                  </template>
                  <template v-else>
                    <img v-if="student.gender == 1" src="@/assets/images/male_avartar.png" id="profile-pic-user" class="img-fluid" />
                    <img v-if="student.gender == 2" src="@/assets/images/female_avartar.png" id="profile-pic-user" class="img-fluid" />
                  </template>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">Login ID</p>
                  <p class="roboto">{{student.student_no}}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">နာမည်</p>
                  <p class="roboto">{{student.name}}</p>
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
                <!-- <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">မှတ်ပုံတင် နံပါတ်</p>
                  <p class="roboto">{{ student.nrc_number }}</p>
                </div>
                <div v-if="student.nrc_front != null" class="d-flex mb-3 flex-wrap nrc-p">
                  <p class="mr-4">မှတ်ပုံတင် အရှေ့ဓါတ်ပုံ</p>
                  <div class="col-12 col-md-6 col-lg-4 pl-0">
                    <img :src="student.nrc_front" alt="Techer" class="img-fluid" />
                  </div>
                </div>
                <div v-if="student.nrc_back != null" class="d-flex mb-3 flex-wrap nrc-p">
                  <p class="mr-4">မှတ်ပုံတင် အနောက်ဓါတ်ပုံ</p>
                  <div class="col-12 col-md-6 col-lg-4 pl-0">
                    <img :src="student.nrc_back" alt="Techer" class="img-fluid" />
                  </div>
                </div> -->
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ဖုန်းနံပါတ် ၁</p>
                  <p class="roboto">{{ student.phone_number_1}}</p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">ဖုန်းနံပါတ် ၂</p>
                  <p class="roboto">{{ student.phone_number_2}}</p>
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
                  <p class="roboto" v-for="(value, index) in regionArr" :key="index" :value="value"><span v-if="index==student.region">{{value}}</span></p>
                </div>
                <div class="d-flex mb-3 flex-wrap">
                  <p class="mr-4">မြို့နယ်</p>
                  <p class="roboto">{{ student.town}}</p>
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

<script src="../../services/student/detail-student.js"></script>

<style src="../../assets/css/student/detail-student.css"></style>