<template>
  <MainLayout>
    <section class="teacher-detail py-4">
      <div class="container py-2 py-md-5">
        <div class="bg-blockgrey p-4">
          <div class="d-flex flex-wrap">
            <div class="col-lg-3 col-md-6 mb-2 mb-lg-0 px-0 pr-md-3">
              <template v-if="teacher.profile !=null">
                <img :src="teacher.profile" alt="TeacherProfile" class="img-fluid">
              </template>
              <template v-else>
                <img v-if="teacher.gender == 0" src="@/assets/images/school.png" class="img-fluid">
                <img v-if="teacher.gender == 1" src="@/assets/images/male_avartar.png" class="img-fluid">
                <img v-if="teacher.gender == 2" src="@/assets/images/female_avartar.png" class="img-fluid">
              </template>
            </div>
            <div class="teacher-info col-sm-6 col-lg-9 px-0 px-lg-3">
              <p class="teacher-name">{{ teacher.name }}</p>
              <p class="roboto-bold">သင်တန်းကျောင်းအမည် :<span class="roboto"> {{ teacher.school_name }}</span></p>
              <p class="roboto-bold">ပညာအရည်အချင်း :<span class="roboto"> {{ teacher.education }}</span></p>
              <p class="roboto-bold">အတွေ့အကြုံ :<span class="roboto"> {{ teacher.experience }}</span></p>
              <p class="roboto-bold">ဖုန်းနံပါတ် :<span class="roboto"> {{ teacher.phone_number_1 }}</span></p>
              <star-rating
                :increment="0.1"
                :max-rating="5"
                :glow="10"
                :rounded-corners="true"
                :star-size="20"
                :show-rating="false"
                :read-only="true"
                :rating="teacher.rating"
              ></star-rating>
            </div>
            <div class="msg-student mt-4">

            </div>
          </div>                
        </div>
        <div class="course pt-5">
          <p class="pyidaungsu-bold mb-4 course-list"><i class="fas fa-check-circle text-green"></i>သင်ခန်းစာ {{ courses.total}} ခု သင်ကြားထားပါသည်။</p>
          <div class="row">
            <div v-for="course in courses.data" :key="course.course_id" class="col-md-4 col-sm-6 mb-4">
              <router-link :to="{ name: 'detailCourse', params: { id:course.course_id }}">
                <div class="course-item bg-lightgrey shadow-02">
                  <p class="course-name">{{ course.course_title}}</p>
                  <p class="roboto">By 
                    <span class="text-green" v-if="course.name">{{ course.name }}</span>
                    <span class="text-green" v-if="!course.name">{{ course.school_name }}</span>
                  </p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="roboto d-flex justify-content-between align-items-center flex-wrap mt-4">
          <p class="view-item">စုစုပေါင်း {{ lastPage }} မျက်နှာရဲ့ {{ currentPage }} မျက်နှာမြောက်</p>
          <!-- <Pagination :data="courses" @pagination-change-page="getCourseByTeacherId" class="pagination">
            <span slot="prev-nav">&lt; ရှေ့သို့</span>
            <span slot="next-nav">နောက်သို့ &gt;</span>
          </Pagination> -->
          <advanced-laravel-vue-paginate 
            :data = "courses" 
            :onEachSide = "2" 
            :previousText = "'< ရှေ့သို့'" 
            :nextText = "'နောက်သို့ >'"
            @paginateTo = "getCourseByTeacherId" />
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/detail-list-teacher.js"></script>

<style src="../../assets/css/teacher/detail-list-teacher.css"></style>
