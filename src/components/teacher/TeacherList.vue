<template>
  <MainLayout>
    <section class="teacher py-4">
      <div class="container py-2 py-md-5">
        <div class="mb-3 d-flex justify-content-between">
          <h3 class="sub-title">ဆရာများ</h3>
          <p class="roboto">
            <span class="roboto-bold">အရေအတွက် - </span>
             {{ teachers.total }}</p>
        </div>

        <div class="search-sort d-flex justify-content-between bg-lightgrey mb-4 flex-wrap">
          <div class="search-box col-sm-6 col-md-5 col-lg-4 p-0 mb-sm-0 mb-1">
            <div class="search-form relative">
              <input class="form-control" v-model="filter.teacher_name" v-on:keyup="teacherFilter" type="search" placeholder="ရှာဖွေရန်">
              <button><i class="fas fa-search"></i></button>
            </div>
          </div>
          <div class="col-sm-4 col-lg-3 p-0">
            <div class="sort relative">
              <select @change="onChange($event)" name="sortby" class="form-control custom-select">
                <option value="sortby">စီရန်</option>
                <option value="newly">နေ့စွဲ</option>
                <option value="alphabetical">အက္ခရာ</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div v-for="teacher in teachers.data" :key="teacher.teacher_id" :value="teacher.teacher_id" class="col-lg-4 col-sm-6 mb-4">
            <router-link class="" :to="{name: 'detailListTeacher', params: {id:teacher.teacher_id}}">
              <div class="teacher-listing p-3 shadow-01 h-100">
                <template v-if="teacher.profile != null">
                  <img :src="teacher.profile" alt="Teacher" class="img-fluid w-100 mb-2">
                </template>
                <template v-else>
                  <div class="teacher-image">
                    <img v-if="teacher.gender == 0" src="@/assets/images/school.png" class="img-fluid mb-2">
                    <img v-if="teacher.gender == 1" src="@/assets/images/male_avartar.png" class="img-fluid mb-2">
                    <img v-if="teacher.gender == 2" src="@/assets/images/female_avartar.png" class="img-fluid mb-2">
                  </div>
                </template>
                <p class="teacher-name" v-if="teacher.name">{{ teacher.name }}</p>
                <p class="teacher-name" v-if="!teacher.name">{{ teacher.school_name }}</p>
                <p class="teaching-course roboto">{{ teacher.education }}</p>
                <div class="rating">
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
              </div>
            </router-link>
          </div>
        </div>
        <div class="roboto d-flex justify-content-between flex-wrap mt-4">
          <p class="view-item">စုစုပေါင်း {{ lastPage }} မျက်နှာရဲ့ {{ currentPage }} မျက်နှာမြောက်</p>
          <!-- <Pagination :data="teachers" @pagination-change-page="teacherFilter" v-if="pg_status == true">
            <span slot="prev-nav">&lt; ရှေ့သို့</span>
            <span slot="next-nav">နောက်သို့ &gt;</span>
          </Pagination> -->
          <!-- <Pagination :data="teachers" @pagination-change-page="getTeachers" v-if="pg_status == false">
            <span slot="prev-nav">&lt; ရှေ့သို့</span>
            <span slot="next-nav">နောက်သို့ &gt;</span>
          </Pagination> -->
          <advanced-laravel-vue-paginate 
            v-if="pg_status == true"
            :data = "teachers" 
            :onEachSide = "2" 
            :previousText = "'< ရှေ့သို့'" 
            :nextText = "'နောက်သို့ >'"
            @paginateTo = "teacherFilter" />
          <advanced-laravel-vue-paginate 
            v-if="pg_status == false"
            :data = "teachers" 
            :onEachSide = "2" 
            :previousText = "'< ရှေ့သို့'" 
            :nextText = "'နောက်သို့ >'"
            @paginateTo = "getTeachers" />
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/teacher-list.js"></script>
