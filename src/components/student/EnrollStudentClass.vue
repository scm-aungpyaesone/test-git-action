<template>
  <MainLayout>
    <section class="student-class py-5 profile-page-content">
      <div class="container pb-2 pb-md-4">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ကျောင်းသားအကောင့်ဆက်တင်
          <span>တန်းခွဲများ</span>
        </h2>
        <div class="row">
          <div class="col-lg-3 col-md-4 aside">
            <ul class="profile-list">
              <li>
                <a :href="$router.resolve({name: 'detailStudent'}).href">ကျောင်းသားအချက်အလက်</a>
              </li>
              <li>
                <a class="active" :href="$router.resolve({name: 'enrollStudentList'}).href">တန်းခွဲများ</a>
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
            <div class="search-sort d-flex justify-content-between bg-lightgrey mb-4 flex-wrap">
                <div class="search-box col-sm-6 col-md-7 col-lg-5 col-xl-4 p-0 mb-sm-0 mb-1">
                  <p class="roboto">
                    <span class="roboto-bold">အရေအတွက် - </span>
                    {{ classes.total }}
                  </p>
                </div>
                <div class="search-box col-12 col-xl-5 ml-auto p-0">
                  <div class="search-form relative">
                    <input class="form-control" v-model="keyword"
                      v-on:keyup="search" type="search"
                      placeholder="ရှာဖွေရန်" />
                    <button>
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
            </div>

            <!-- <div v-for="classvalue in classes.data" :key="classvalue.class_id"> -->
            <ul v-for="classvalue in classes.data" :key="classvalue.class_id"
              class="list-item-group form-group d-lg-flex flex-wrap flex-xl-nowrap p-3 roboto">
              <li class="col-lg-3 pr-0">
                <p v-if="classvalue.teacher_name">{{ classvalue.teacher_name }}</p>
                <p v-if="!classvalue.teacher_name">{{ classvalue.school_name }}</p>
                <router-link :to="{ name: 'lookTeacherProfile', params: { id: classvalue.teacher_id },}"
                  class="edit remove mr-2">
                  <a title="View" class="text-white view" v-if="classvalue.status === 2">ကြည့်ရန်</a>
                </router-link>
              </li>
              <li class="col-lg-3 col-xl-3 px-4">{{ classvalue.course_name }}</li>
              <li class="col-auto px-0">
                <div v-if="classvalue.class_type === 1">ရုံးပိတ်ရက်အတန်း</div>
                <div v-else-if="classvalue.class_type === 2">ရုံးဖွင့်ရက်အတန်း</div>
                <div v-else>နှစ်ခုစလုံး</div>
                <time>{{ classvalue.start_time }}</time> -
                <time>{{ classvalue.end_time }}</time>
              </li>
              <li class="col-lg-2 col-xl-auto pyidaungsu-regular apply-txt" id="show-status">
                <div v-if="classvalue.status === 1">လျှောက်ထားဆဲ</div>
                <div v-else-if="classvalue.status === 2 ">ခွင့်ပြုပြီး</div>
                <div v-else-if="classvalue.status === 3 ">ငြင်းဆိုသည်</div>
                <div v-else-if="classvalue.status === 4 ">ပြီးဆုံးသည်</div>
              </li>
              <li class="col-lg-3 col-xl-auto px-0 px-xl-2 list-item-link" v-if="classvalue.status === 1">
                <a @click="notify(classvalue.teacher_id)" class="send-request text-white pyidaungsu-regular">တောင်းဆိုချက်ပို့</a>
              </li>
            </ul>
            <div class="roboto d-flex justify-content-between flex-wrap my-3 mb-md-0">
              <p class="view-item">စုစုပေါင်း {{ lastPage }} မျက်နှာရဲ့ {{ currentPage }} မျက်နှာမြောက်</p>
              <!-- <Pagination v-if="pag_status == true" :data="classes" @pagination-change-page="search">
                <span slot="prev-nav">&lt; ရှေ့သို့</span>
                <span slot="next-nav">နောက်သို့ &gt;</span>
              </Pagination>
              <Pagination
                v-else-if="pag_status == false"
                :data="classes"
                @pagination-change-page="getEnrollStudentList"
              >
                <span slot="prev-nav">&lt; ရှေ့သို့</span>
                <span slot="next-nav">နောက်သို့ &gt;</span>
              </Pagination> -->
              <advanced-laravel-vue-paginate 
                v-if="pag_status == true"
                :data = "classes" 
                :onEachSide = "2" 
                :previousText = "'< ရှေ့သို့'" 
                :nextText = "'နောက်သို့ >'"
                @paginateTo = "search" />
              <advanced-laravel-vue-paginate 
                v-else-if="pag_status == false"
                :data = "classes" 
                :onEachSide = "2" 
                :previousText = "'< ရှေ့သို့'" 
                :nextText = "'နောက်သို့ >'"
                @paginateTo = "getEnrollStudentList" />
          </div>
          </div>

        </div>
      </div>
      <!-- </div> -->
    </section>
  </MainLayout>
</template>

<script src="../../services/student/enroll-student-class.js"></script>
