<template>
  <MainLayout>
    <section class="py-4 class-detail">
      <div class="container py-2 py-md-5">
        <div class="bg-blockgrey text-center py-4 px-2 course-detail-title mb-3">
          <h2 class="title text-green mb-3">{{ classes.course_name }}</h2>
          <div class="roboto">
            <span v-if="classes.name">
              ဆရာ
              <router-link :to="{ name: 'detailListTeacher', params: { id: classes.teacher_id }}" class="text-green teacher-name">
                {{ classes.name }},
              </router-link>
            </span>
            <span v-if="!classes.name">
              ကျောင်း
              <router-link :to="{ name: 'detailListTeacher', params: { id: classes.teacher_id }}" class="text-green teacher-name">
                {{ classes.school_name }},
              </router-link>
            </span>
            <span>
              ပို့စ်တင်သည့် ရက်စွဲ
              <span class="text-green roboto-bold">{{ classes.update_time | setMoment }}</span>
            </span>
          </div>
        </div>

        <div class="detail-tab py-5">
          <ul class="nav nav-tabs">
            <button v-for="tab in tabs" v-bind:key="tab" v-bind:class="['tab-button', { active: currentTab === tab }]"
              v-on:click="currentTab = tab">
              <li class="nav-item">
                <a v-if="tab == 'CourseDetail'">တန်းခွဲအသေးစိတ်</a>
                <a v-if="tab == 'Teacher'">ဆရာအချက်အလက်</a>
              </li>
            </button>
          </ul>
          <div class="tab-content">
            <div class="container tab-pane p-3 p-md-4 roboto active">
              <component v-bind:is="currentTabComponent" class="tab" :tabObj="currentTabComponentProp"
                v-on:setRating="setRating" v-on:enrollClass="enrollClass"></component>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/detail-class.js"></script>