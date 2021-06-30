<template>
  <MainLayout>
    <section class="py-4 course">
      <div class="container py-2 py-md-5">
        <div class="row side">
          <div class="col-lg-3 col-md-4 aside">
            <div class="filter roboto mb-4">
              <p class="roboto-bold pb-2 aside-title mb-2">အမျိုးအစားအလိုက်ရှာရန်</p>
              <select @change="onChangeCategory($event)" name="category_name" class="form-control custom-select">
                <option value selected>အမျိုးအစား ရွေးပါ</option>
                <option v-for="(value, index) in category" :key="index" :value="value.category_id">
                  {{ value.category_name }}
                </option>
              </select>
            </div>

            <div class="filter roboto mb-4">
              <p class="roboto-bold mb-2 aside-title pb-2">တည်နေရာအလိုက်ရှာရန်</p>
              <label for="start-time">တိုင်းဒေသကြီး</label>
              <select @change="onRegionChange($event)" name="region" class="form-control custom-select">
                <option value selected>တိုင်းဒေသကြီး ရွေးပါ</option>
                <option v-for="(value, index) in regionArr" :key="index" :value="index" :selected="value == filter.region">
                  {{ value }}
                </option>
              </select>

              <label for="start-time">မြို့နယ်</label>
              <select @change="onChangeTwspName($event)" name="township" class="form-control custom-select">
                <option value selected>မြို့နယ် ရွေးပါ</option>
                <option v-for="(value, index) in twspName" :key="index" :value="value" >
                  {{ value }}
                </option>
              </select>
            </div>
            
            <div class="filter roboto mb-4 course-scroll">
              <p class="roboto-bold pb-2 aside-title mb-2">ဆရာ/ကျောင်းအလိုက်ရှာရန်</p>
              <div v-for="teacher in teachers" :key="teacher.teacher_id" class="mb-2">
                <input type="checkbox" class="mr-2" :id="teacher.teacher_id"
                  :value="teacher.teacher_id" v-model="filter.teacher_id" />
                <label v-if="teacher.name" class="course-filter">{{ teacher.name }}</label>
                <label v-if="!teacher.name" class="course-filter">{{ teacher.school_name }}</label>
              </div>
            </div>

            <button type="button" v-on:click="applyCourseFilter()" class="btn apply-filter text-white text-center roboto" id="myBtn">
              စီစစ်ရန်
            </button>
          </div>

          <div class="col-lg-9 col-md-8">
            <div class="course-main">
              <div class="mb-3 d-flex justify-content-between">
                <h3 class="sub-title">သင်တန်းများ</h3>
                <p class="roboto">
                  <span class="roboto-bold">အရေအတွက် - </span>
                  {{ courses.total }}
                </p>
              </div>

              <div class="search-sort d-flex justify-content-between bg-lightgrey mb-4 flex-wrap">
                <div class="search-box col-sm-6 col-md-7 col-lg-5 col-xl-4 p-0 mb-sm-0 mb-1">
                  <div class="search-form relative">
                    <input class="form-control" v-model="filter.course_name"
                      v-on:keyup="applyCourseFilter" type="search"
                      placeholder="ရှာဖွေရန်" />
                    <button>
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
                <div class="col-sm-4 col-lg-3 p-0">
                  <div class="sort relative">
                    <select @change="onChange($event)" name="sortby" class="form-control custom-select" v-model="sortBy">
                      <option value>စီရန်</option>
                      <option value="newly">နေ့စွဲ</option>
                      <option value="alphabetical">အက္ခရာ</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div v-for="(course, index) in courses.data" :key="index" class="col-md-6 mb-4">
                  <router-link :to="{ name: 'detailCourse', params: { id:course.course_id }}">
                    <div class="course-item bg-lightgrey shadow-02">
                      <p class="course-name">{{ course.course_title }}</p>
                      <p class="roboto">
                        By
                        <span class="text-green" v-if="course.name">{{ course.name }}</span>
                        <span class="text-green" v-if="!course.name">{{ course.school_name }}</span>
                      </p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="roboto d-flex justify-content-between flex-wrap my-3 mb-md-0">
              <p class="view-item">စုစုပေါင်း {{ lastPage }} မျက်နှာရဲ့ {{ currentPage }} မျက်နှာမြောက်</p>
              <!-- <Pagination :data="courses" @pagination-change-page="getCourses" class="pagination" v-if="pg_status == false">
                <span slot="prev-nav">&lt; ရှေ့သို့</span>
                <span slot="next-nav">နောက်သို့ &gt;</span>
              </Pagination>
              <Pagination :data="courses" @pagination-change-page="applyCourseFilter" class="pagination" v-if="pg_status == true">
                <span slot="prev-nav">&lt; ရှေ့သို့</span>
                <span slot="next-nav">နောက်သို့ &gt;</span>
              </Pagination> -->
              <advanced-laravel-vue-paginate 
                v-if="pg_status == false"
                :data = "courses" 
                :onEachSide = "2" 
                :previousText = "'< ရှေ့သို့'" 
                :nextText = "'နောက်သို့ >'"
                @paginateTo = "getCourses" />
              <advanced-laravel-vue-paginate 
                v-if="pg_status == true"
                :data = "courses" 
                :onEachSide = "2" 
                :previousText = "'< ရှေ့သို့'" 
                :nextText = "'နောက်သို့ >'"
                @paginateTo = "applyCourseFilter" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/course-list.js"></script>

<style src="../../assets/css/teacher/dashboard-teacher.css"></style>
<style src="../../assets/css/teacher/course-list.css"></style>

