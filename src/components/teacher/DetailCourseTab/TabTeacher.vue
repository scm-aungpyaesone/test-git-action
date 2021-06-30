<template>
  <div class="roboto course-teacher text-center ">
    <div class="teacher-img mb-2">
      <template v-if="tabObj.image !=null">
        <img :src="tabObj.image" alt="TeacherProfile" id="profile-pic-user" class="img-fluid th-image" />
      </template>
      <template v-else>
        <img v-if="tabObj.gender == 0" src="@/assets/images/school.png"
          id="profile-pic-user" class="img-fluid th-image" />
        <img v-if="tabObj.gender == 1" src="@/assets/images/male_avartar.png"
          id="profile-pic-user" class="img-fluid th-image" />
        <img v-if="tabObj.gender == 2" src="@/assets/images/female_avartar.png"
          id="profile-pic-user" class="img-fluid th-image" />
      </template>
    </div>
    <div>
      <router-link :to="{ name: 'detailListTeacher', params: {id:tabObj.teacher_id}}"
        class="text-green teacher-name" v-if="tabObj.name">
        {{ tabObj.name }}, {{ tabObj.phone_number_1 }}
      </router-link>
      <router-link :to="{ name: 'detailListTeacher', params: {id:tabObj.teacher_id}}" 
        class="text-green teacher-name" v-if="!tabObj.name">
        {{ tabObj.school_name }}, {{ tabObj.phone_number_1 }}
      </router-link>
    </div>
    <p class="teacher-txt">{{ tabObj.teacher_detail }}</p>
  </div>
</template>

<script src="../../../services/teacher/DetailCourseTab/tab-teacher.js"></script>