<template>
<MainLayout>
<section class="py-4">
      <div class="container py-2 py-md-5">
        <div class="mb-3 d-flex justify-content-between">
          <h3 class="sub-title">သင်တန်းသစ်တောင်းဆိုမှုများ</h3>
          <p class="roboto">
            <span class="roboto-bold">အရေအတွက် - </span>
            {{ course_requests.total }}
          </p>
        </div>

        <div class="search-sort d-flex justify-content-between bg-lightgrey mb-4 flex-wrap">
          <div class="search-box col-sm-6 col-md-7 col-lg-5 col-xl-4 p-0 mb-sm-0 mb-1">
            <div class="search-form relative">
              <input class="form-control" v-model="keyword"
                v-on:keyup="search" type="search"
                placeholder="ရှာဖွေရန်" />
              <button>
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div class="col-sm-5 col-md-4 col-lg-3 col-xl-2 p-0">
            <div class="sort relative">
              <select @change="onChange($event)" name="sortby" class="form-control custom-select" v-model="sortBy">
                <option value="">စီရန်</option>
                <option value="newly">နေ့စွဲ</option>
                <option value="alphabetical">အက္ခရာ</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div v-for="course_request in course_requests.data"
            :key="course_request.course_request_id"
            :value="course_request.course_request_id" class="col-md-4 col-sm-6 mb-4">
            <router-link :to="{ name:'courseRequestDetail', params: {id:course_request.course_request_id}}">
              <div class="news-item rq-item shadow-01 roboto news-size">
                <h3 class="news-title">{{ course_request.course_request_title}}</h3>
                <p class="mb-1">{{ course_request.course_request_details | shorttext(100)}}...</p>
                <div>
                  <span class="date text-green mr-3">
                    <i class="far fa-calendar-alt"></i>
                    {{ course_request.insert_time | setMoment}}
                  </span>
                  <span class="relative"><i class='fas dash-icon'>&#xf068;</i> By {{ course_request.name }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="roboto d-flex justify-content-between flex-wrap mt-4">
          <p class="view-item">စုစုပေါင်း {{ lastPage }} မျက်နှာရဲ့ {{ currentPage }} မျက်နှာမြောက်</p>
          <!-- <Pagination :data="course_requests" @pagination-change-page="onChange" v-if="pg_sortby == true">          
            <span slot="prev-nav">&lt; ရှေ့သို့</span>
            <span slot="next-nav">နောက်သို့ &gt;</span>
          </Pagination> 
          <Pagination :data="course_requests" @pagination-change-page="search" v-if="pg_status == true && pg_sortby == false">          
            <span slot="prev-nav">&lt; ရှေ့သို့</span>
            <span slot="next-nav">နောက်သို့ &gt;</span>
          </Pagination> 
          <Pagination :data="course_requests" @pagination-change-page="getCourseRequest" v-if="pg_status == false && pg_sortby == false">
            <span slot="prev-nav">&lt; ရှေ့သို့</span>
            <span slot="next-nav">နောက်သို့ &gt;</span>
          </Pagination> -->
          <advanced-laravel-vue-paginate 
            v-if="pg_sortby == true"
            :data = "course_requests" 
            :onEachSide = "2" 
            :previousText = "'< ရှေ့သို့'" 
            :nextText = "'နောက်သို့ >'"
            @paginateTo = "onChange" />
          <advanced-laravel-vue-paginate 
            v-if="pg_status == true && pg_sortby == false"
            :data = "course_requests" 
            :onEachSide = "2" 
            :previousText = "'< ရှေ့သို့'" 
            :nextText = "'နောက်သို့ >'"
            @paginateTo = "search" />
          <advanced-laravel-vue-paginate 
            v-if="pg_status == false && pg_sortby == false"
            :data = "course_requests" 
            :onEachSide = "2" 
            :previousText = "'< ရှေ့သို့'" 
            :nextText = "'နောက်သို့ >'"
            @paginateTo = "getCourseRequest" />
        </div>
      </div>
    </section>
</MainLayout>
</template>

<script src="../../services/student/course-request-list.js"></script>
  