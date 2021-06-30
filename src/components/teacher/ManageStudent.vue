<template>
  <MainLayout>
    <section class="manage-class py-5 profile-page-content">
      <div class="container pb-2 pb-md-4 roboto">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ဆရာအကောင့်ဆက်တင်
          <span>ကျောင်းသားစီမံခန့်ခွဲခြင်း</span>
        </h2>
        <div class="row">
          <div class="col-lg-3 col-md-4 aside">
            <ul class="profile-list pyidaungsu-regular">
              <li><a :href="$router.resolve({name: 'detailTeacher'}).href">ဆရာ အချက်အလက်</a></li>                 
              <li><a :href="$router.resolve({name: 'createCourse'}).href">သင်တန်း အသစ်ထည့်ရန်</a></li>
              <li><a :href="$router.resolve({name: 'manageCourse'}).href">သင်တန်း စီမံရန်</a> </li>                    
              <li><a :href="$router.resolve({name: 'createClass'}).href">တန်းခွဲ အသစ်ထည့်ရန်</a> </li>                                
              <li><a :href="$router.resolve({name: 'manageClass'}).href">တန်းခွဲ စီမံရန်</a> </li>             
              <li><a :href="$router.resolve({name: 'manageStudent'}).href" class="active">ကျောင်းသား စီမံခန့်ခွဲရန်</a></li> 
              <li><a :href="$router.resolve({name: 'changeTeacherPassword'}).href">စကားဝှက်ပြောင်းရန်</a></li> 
            </ul>
          </div>
          <div class="col-lg-9 col-md-8">                                     
            <div class="search-sort d-flex justify-content-between bg-lightgrey mb-4 flex-wrap">
                <div class="search-box col-sm-6 col-md-7 col-lg-5 col-xl-4 p-0 mb-sm-0 mb-1">
                  <p class="roboto">
                    <span class="roboto-bold">အရေအတွက် - </span>
                    {{ students.total }}
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
            
            <div v-for="(student, index) in students.data" :key="index">
              <ul class="list-item-group form-group d-lg-flex flex-wrap flex-xl-nowrap p-3">
                <li class="col-lg-3 col-xl-3 px-2">
                  <p>{{ student.name }}</p>
                  <router-link :to="{ name: 'lookStudentProfile', params: { id: student.student_id }}" class="edit remove mr-2"> 
                    <a title="View" class="text-white view">ကြည့်ရန်</a> 
                  </router-link>
                </li>
                <li class="col-lg-3 col-xl-3 px-2">{{ student.course_name }}</li>
                <li class="col-lg-3 col-xl-auto px-2" v-if="student.class_type == 1">ရုံးပိတ်ရက်အတန်း <br>
                  <time>{{ customFormatter(student.start_date + ' ' + student.start_time) }}</time> - <time>{{ customFormatter(student.end_date + ' ' + student.end_time) }}</time>
                </li>
                <li class="col-lg-3 col-xl-auto px-2" v-else-if="student.class_type == 2">ရုံးဖွင့်ရက်အတန်း <br>
                  <time>{{ customFormatter(student.start_date + ' ' + student.start_time) }}</time> - <time>{{ customFormatter(student.end_date + ' ' + student.end_time) }}</time>
                </li>
                <li class="col-lg-3 col-xl-auto px-2" v-else>နှစ်ခုစလုံး <br>
                  <time>{{ customFormatter(student.start_date + ' ' + student.start_time) }}</time> - <time>{{ customFormatter(student.end_date + ' ' + student.end_time) }}</time>
                </li>
                <li class="col-lg-2 col-xl-auto pyidaungsu-regular text-green apply-txt" v-if="student.status == 1">လျှောက်ထား</li>
                <li class="col-lg-2 col-xl-auto pyidaungsu-regular text-green apply-txt" v-if="student.status == 2">ခွင့်ပြုပြီး</li>
                <li class="col-lg-2 col-xl-auto pyidaungsu-regular text-green apply-txt" v-if="student.status == 3">ပယ်ဖျက်</li>
                <li class="col-lg-3 col-xl-auto px-0 px-xl-2 list-item-link" v-if="student.status == 1">
                  <a class="approve bg-green text-white pyidaungsu-regular" @click="approveStudent(student.class_student_id, student.student_id)">ခွင့်ပြု</a>
                  <a class="remove pyidaungsu-regular" @click="cancelStudent(student.class_student_id, student.student_id)">ပယ်ဖျက်</a>
                </li>
              </ul>
            </div>

            <!-- Pagination Start -->
            <div class="d-flex justify-content-between align-items-center flex-wrap mt-4">
              <p class="view-item">စုစုပေါင်း {{ lastPage }} မျက်နှာရဲ့ {{ currentPage }} မျက်နှာမြောက်</p>
              <!-- <Pagination v-if="pg_status == true" :data="students" @pagination-change-page="search">
                <span slot="prev-nav" class="text-darkgrey">&lt; ရှေ့သို့</span>
                <span slot="next-nav" class="text-darkgrey">နောက်သို့ &gt;</span>
              </Pagination>
              <Pagination v-else-if="pg_status == false" :data="students" @pagination-change-page="getClassStudentList">
                <span slot="prev-nav">&lt; ရှေ့သို့</span>
                <span slot="next-nav">နောက်သို့ &gt;</span>
              </Pagination> -->
              <advanced-laravel-vue-paginate 
                v-if="pg_status == true"
                :data = "students" 
                :onEachSide = "2" 
                :previousText = "'< ရှေ့သို့'" 
                :nextText = "'နောက်သို့ >'"
                @paginateTo = "search" />
              <advanced-laravel-vue-paginate 
                v-else-if="pg_status == false"
                :data = "students" 
                :onEachSide = "2" 
                :previousText = "'< ရှေ့သို့'" 
                :nextText = "'နောက်သို့ >'"
                @paginateTo = "getClassStudentList" />
            </div>
            <!-- Pagination End -->
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/manage-student.js"></script>