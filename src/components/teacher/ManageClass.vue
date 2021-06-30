<template>
  <MainLayout>
    <section class="manage-class py-5 profile-page-content">
      <div class="container pb-2 pb-md-4">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ဆရာအကောင့်ဆက်တင်
          <span>တန်းခွဲစီမံခြင်း</span>
        </h2>
        <div class="row">
          <div class="col-lg-3 col-md-4 aside">
            <ul class="profile-list">
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
                <a
                  :href="$router.resolve({name: 'manageClass'}).href"
                  class="active"
                >တန်းခွဲ စီမံရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'manageStudent'}).href">ကျောင်းသားစီမံခန့်ခွဲရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'changeTeacherPassword'}).href">စကားဝှက်ပြောင်းရန်</a>
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
            <ul v-for="classvalue in classes.data" :key="classvalue.class_id"
              class="list-item-group form-group d-lg-flex d-block p-3 roboto">
              <li class="col-lg-3 col-xl-4 pr-0 px-lg-3">{{ classvalue.course_name }}</li>
              <li class="col-auto px-3">
                <div v-if="classvalue.class_type == 1">ရုံးပိတ်ရက်အတန်း</div>
                <div v-else-if="classvalue.class_type == 2">ရုံးဖွင့်ရက်အတန်း</div>
                <div v-else>နှစ်ခုစလုံး</div>
                <time>{{ classvalue.start_time }}</time> -
                <time>{{ classvalue.end_time }}</time>
              </li>
              <li class="col-auto px-1 text-xl-center">MMK {{ classvalue.fee }}</li>
              <li class="col-auto px-2 px-xl-3">{{ classvalue.duration }}</li>
              <li class="list-item-link col-auto px-0">
                <router-link :to="{ name: 'editClass', params: { id: classvalue.class_id },}" class="edit">
                  <i class="far fa-edit mr-1"></i>ပြင်ဆင်ရန်
                </router-link>
              </li>
            </ul>
            <div class="roboto d-flex justify-content-between flex-wrap my-3 mb-md-0">
              <p class="view-item">
                စုစုပေါင်း {{ lastPage }} မျက်နှာရဲ့
                {{ currentPage }} မျက်နှာမြောက်
              </p>

              <!-- <Pagination v-if="pg_status == true" :data="classes" @pagination-change-page="search">
                <span slot="prev-nav">&lt; ရှေ့သို့</span>
                <span slot="next-nav">နောက်သို့ &gt;</span>
              </Pagination>

              <Pagination v-else-if="pg_status == false" :data="classes" @pagination-change-page="getClassByTeacherId">
                <span slot="prev-nav">&lt; ရှေ့သို့</span>
                <span slot="next-nav">နောက်သို့ &gt;</span>
              </Pagination> -->
              <advanced-laravel-vue-paginate 
                v-if="pg_status == true"
                :data = "classes" 
                :onEachSide = "2" 
                :previousText = "'< ရှေ့သို့'" 
                :nextText = "'နောက်သို့ >'"
                @paginateTo = "search" />
              <advanced-laravel-vue-paginate 
                v-else-if="pg_status == false"
                :data = "classes" 
                :onEachSide = "2" 
                :previousText = "'< ရှေ့သို့'" 
                :nextText = "'နောက်သို့ >'"
                @paginateTo = "getClassByTeacherId" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>
<script src="../../services/teacher/manage-class.js"></script>

<style src="../../assets/css/teacher/manage-class.css"></style>
