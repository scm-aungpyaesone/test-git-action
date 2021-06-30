<template>
  <MainLayout>
    <section class="course-detail py-4">
      <div class="container py-2 py-md-5">
        <div class="bg-blockgrey text-center py-lg-4 py-5 px-2 course-detail-title mb-3">
          <div v-if="courses.certificate != null && courses.certificate != ''" class="certificate">
            <img src="@/assets/images/course-certificate.png"
              alt="Course Certificate" class="img-fluid" />
          </div>
          <h2 class="title text-green mb-3">{{ courses.course_title }}</h2>
          <div class="roboto">
            <span v-if="courses.name">
              ဆရာ
              <router-link :to="{ name: 'detailListTeacher'}" class="text-green teacher-name">
                {{ courses.name }},
              </router-link>
            </span>
            <span v-if="!courses.name">
              ကျောင်း
              <router-link :to="{ name: 'detailListTeacher'}" class="text-green teacher-name">
                {{ courses.school_name }},
              </router-link>
            </span>
            <span>
              ပို့စ်တင်သည့် ရက်စွဲ
              <span class="text-green roboto-bold">{{ courses.update_time | setMoment }}</span>
            </span>
          </div>
        </div>

        <div class="detail-tab py-5">
          <ul class="nav nav-tabs">
            <button v-for="tab in tabs" v-bind:key="tab" v-bind:class="['tab-button', { active: currentTab === tab }]"
              v-on:click="currentTab = tab">
              <li class="nav-item">
                <a v-if="tab == 'Courseexplanation'">သင်ခန်းစာ ရှင်းပြချက်</a>
                <a v-if="tab == 'Coursedetail'">သင်ခန်းစာ အသေးစိတ်</a>
                <a v-if="tab == 'Teacher'">ဆရာအချက်အလက်</a>
              </li>
            </button>
          </ul>
          <div class="tab-content">
            <div class="container tab-pane p-3 p-md-4 roboto active">
              <component v-bind:is="currentTabComponent" class="tab"
                :tabObj="currentTabComponentProp"></component>
            </div>
          </div>
        </div>

        <div class="py-2 py-md-4 class">
          <div class="mb-3 d-flex justify-content-between">
            <h3 class="sub-title">တန်းခွဲများ</h3>
            <p class="roboto">
              <span class="roboto-bold">အရေအတွက် - </span>
              {{ classList.total }}
            </p>
          </div>
          <div class="row">
            <div v-for="classvalue in classList.data" :key="classvalue.class_id"
              :value="classvalue.class_id" class="col-lg-4 col-md-6 mb-4">
              <router-link :to="{ name: 'detailClass', params: { id:classvalue.class_id }}">
                <div class="class-item">
                  <ul class="roboto">
                    <li>
                      <p class="pyidaungsu-regular class-name">{{ classvalue.course_name }}</p>
                      <p class="bg-white shadow-04 text-center class-day"
                        v-if="classvalue.class_type == 1">ရုံးပိတ်ရက်အတန်း</p>
                      <p class="bg-white shadow-04 text-center class-day"
                        v-if="classvalue.class_type == 2">ရုံးဖွင့်ရက်အတန်း</p>
                      <p class="bg-white shadow-04 text-center class-day"
                        v-if="classvalue.class_type == 3">နှစ်ခုစလုံး</p>
                    </li>
                    <li>
                      <span>{{ classvalue.duration }}</span>
                      <span>{{ classvalue.start_time }} - {{ classvalue.end_time }}</span>
                    </li>
                    <li>
                      <star-rating :increment="0.1" :max-rating="5"
                        :glow="10" :rounded-corners="true"
                        :star-size="20" :show-rating="false"
                        :read-only="true" :rating="classvalue.rate"></star-rating>
                      <span>MMK {{ classvalue.fee }}</span>
                    </li>
                  </ul>
                </div>
              </router-link>
            </div>
          </div>
          <div class="roboto d-flex justify-content-between flex-wrap my-3 mb-md-0">
            <p class="view-item">စုစုပေါင်း {{ lastPage }} မျက်နှာရဲ့ {{ currentPage }} မျက်နှာမြောက်</p>
            <!-- <Pagination :data="classList" @pagination-change-page="getClassesByCourseId">
              <span slot="prev-nav">&lt; ရှေ့သို့</span>
              <span slot="next-nav">နောက်သို့ &gt;</span>
            </Pagination> -->
            <advanced-laravel-vue-paginate 
              :data = "classList" 
              :onEachSide = "2" 
              :previousText = "'< ရှေ့သို့'" 
              :nextText = "'နောက်သို့ >'"
              @paginateTo = "getClassesByCourseId" />
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/detail-course.js"></script>

<style src="../../assets/css/teacher/detail-course.css"></style>


