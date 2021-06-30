<template>
  <MainLayout>
    <div class="top-banner">
      <div class="top-overlay"></div>
      <p class="container text-white text-center">
        ပညာမျှဝေချင်သူများနှင့် ပညာရှာချင်သူများ၏
        <br />ဆုံစည်းရာနေရာ
      </p>
    </div>
    <section v-if="courses.data != null && courses.data != ''" class="py-5 bg-white">
      <div class="container py-4">
        <div class="d-flex justify-content-between">
          <h2 class="sub_title text-green">သင်တန်းများ</h2>
          <a title="ကြည့်ရန်" :href="$router.resolve({name: 'courseList'}).href" class="btn to-view-btn">ကြည့်ရန်</a>
        </div>
        <swiper class="swiper mt-5" :options="coursesOption">
          <swiper-slide v-for="course in courses.data" :key="course.course_id">
            <router-link :to="{ name: 'detailCourse', params: { id:course.course_id }}">
              <div class="course-col bg-lightgrey shadow-03 py-3">
                <p class="course-name">{{ course.course_title }}</p>
                <p class="teacher-name" v-if="course.name">{{ course.name }}</p>
                <p class="teacher-name" v-if="!course.name">{{ course.school_name }}</p>
              </div>
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </section>

    <section v-if="classes.data != null && classes.data != ''" class="py-5 bg-lightgrey">
      <div class="container py-4">
        <div class="d-flex justify-content-between">
          <h2 class="sub_title text-green">တန်းခွဲများ</h2>
          <a title="ကြည့်ရန်" :href="$router.resolve({name: 'classList'}).href" class="btn to-view-btn">ကြည့်ရန်</a>
        </div>

        <swiper class="swiper mt-5" :options="swiperOption">
          <swiper-slide v-for="classvalue in classes.data" :key="classvalue.class_id">
            <router-link :to="{ name: 'detailClass', params: { id:classvalue.class_id }}">
              <div class="class-item">
                <ul class="roboto">
                  <li>
                    <p class="pyidaungsu-regular class-name">{{ classvalue.course_name }}</p>
                    <p class="bg-white shadow-04 text-center class-day" v-if="classvalue.class_type == 1">ရုံးပိတ်ရက်အတန်း</p>
                    <p class="bg-white shadow-04 text-center class-day" v-if="classvalue.class_type == 2">ရုံးဖွင့်ရက်အတန်း</p>
                    <p class="bg-white shadow-04 text-center class-day" v-if="classvalue.class_type == 3">နှစ်ခုစလုံး</p>
                  </li>
                  <li class="roboto">
                    <p>{{ classvalue.duration }}</p>
                    <p>{{ classvalue.start_time }} - {{ classvalue.end_time }}</p>
                  </li>
                  <li>
                    <star-rating
                      :increment="0.1"
                      :max-rating="5"
                      :glow="10"
                      :rounded-corners="true"
                      :star-size="20"
                      :show-rating="false"
                      :read-only="true"
                      :rating="classvalue.rate"
                    ></star-rating>
                    <p>MMK {{ classvalue.fee }}</p>
                  </li>
                </ul>
              </div>
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </section>

    <section v-if="course_requests.data != null && course_requests.data != ''" class="request py-5 bg-white">
      <div class="container py-4">
        <div class="d-flex justify-content-between">
          <h2 class="sub_title text-green">သင်တန်းသစ်တောင်းဆိုမှုများ</h2>
          <a title="ကြည့်ရန်" :href="$router.resolve({name: 'courseRequestList'}).href" class="btn to-view-btn rc-btn">ကြည့်ရန်</a>
        </div>
        <swiper class="swiper mt-5" :options="swiperOption">
          <swiper-slide v-for="course_request in course_requests.data" :key="course_request.course_request_id"
            :value="course_request.course_request_id">
            <router-link :to="{ name: 'courseRequestDetail', params: {id:course_request.course_request_id}}">
              <div class="request-item shadow-03 p-3 cr-size">
                <p class="mb-1 course-name">{{ course_request.course_request_title }}</p>
                <p class="roboto p-size">{{ course_request.course_request_details | shorttext(80)}}...</p>
                <div>
                  <span class="date text-green mr-3">
                    <i class="far fa-calendar-alt"></i>
                    {{ course_request.start_time | setMoment}}
                  </span>
                  <span class="relative h-info"><i class='fas dash-icon'>&#xf068;</i> By {{ course_request.name }}</span>
                </div>
              </div>
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </section>

    <section v-if="news.data != null && news.data != ''" class="news py-5">
      <div class="container py-4">
        <div class="d-flex justify-content-between">
          <h2 class="sub_title text-green">သတင်းများ</h2>
          <a title="ကြည့်ရန်" :href="$router.resolve({name: 'newsList'}).href" class="btn to-view-btn">ကြည့်ရန်</a>
        </div>
        <swiper class="swiper mt-5" :options="swiperOption">
          <swiper-slide v-for="newsval in news.data" :key="newsval.news_id" :value="newsval.news_id">
            <router-link :to="{ name: 'newsDetail', params: {id:newsval.news_id}}">
              <div class="news-item shadow-01 roboto ns-size">
                <h3 class="news-title">{{ newsval.news_title}}</h3>
                <p class="mb-1">{{ newsval.news_details | shorttext(100) }}...</p>
                <div>
                  <span class="date text-green mr-3">
                    <i class="far fa-calendar-alt"></i>
                    {{ newsval.publish_date | setMoment}}
                  </span>
                  <span class="relative h-info"><i class='fas dash-icon'>&#xf068;</i> By Admin</span>
                </div>
              </div>
            </router-link>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../services/home.js"></script>

<style src="../assets/css/home.css"></style>