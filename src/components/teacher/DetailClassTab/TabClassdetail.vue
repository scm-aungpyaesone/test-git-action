<template>
  <div class="col-12 p-0">
    <p class="bg-green shadow-04 text-center mb-2 d-inline-block text-white px-2 roboto mb-3">
      <span v-if="tabObj.class_type == 1">ရုံးပိတ်ရက်အတန်း</span>
      <span v-else-if="tabObj.class_type == 2">ရုံးဖွင့်ရက်အတန်း</span>
      <span v-else>နှစ်ခုစလုံး</span>
    </p>
    <ul class="class-info">
      <li>
        <span>သင်တန်းကြေး</span>
        <span class="text-green">MMK {{tabObj.class_fee}}</span>
      </li>
      <li>
        <span>အတန်းကြာချိန်</span>
        <span>{{tabObj.class_duration}}</span>
      </li>
      <li>
        <span>တန်းခွဲ စမည့်ရက်</span>
        <span>{{tabObj.class_startDate}}</span>
      </li>
      <li>
        <span>တန်းခွဲ ပြီးမည့်ရက်</span>
        <span>{{tabObj.class_endDate}}</span>
      </li>
      <li>
        <span>အချိန်ဇယားနေ့</span>
        <span>
          <ul class="class-days">
            <li v-if="tabObj.monday">တနင်္လာ </li>
            <li v-if="tabObj.tuesday">အင်္ဂါ </li>
            <li v-if="tabObj.wednesday">ဗုဒ္ဓဟူး </li>
            <li v-if="tabObj.thursday">ကြာသပတေး </li>
            <li v-if="tabObj.friday">သောကြာ </li>
            <li v-if="tabObj.saturday">စနေ </li>
            <li v-if="tabObj.sunday">တနင်္ဂနွေ </li>
          </ul>
        </span>
      </li>
      <li>
        <span>တန်းခွဲ စချိန်</span>
        <span>{{tabObj.class_startTime}}</span>
      </li>
      <li>
        <span>တန်းခွဲ ပြီးချိန်</span>
        <span>{{tabObj.class_endTime}}</span>
      </li>
      <li>
        <span>အဆင့်သတ်မှတ်ချက်</span>
        <star-rating
          :increment="0.5"
          :max-rating="5"
          :glow="10"
          :rounded-corners="true"
          :star-size="20"
          :show-rating="false"
          :read-only="true"
          :rating="tabObj.class_rating"
        ></star-rating>
      </li>
    </ul>

    <!-- student star rating box -->
    <div class="star-rating px-0 my-3 roboto">
      <p v-if="isLogin && tabObj.checkStudent">(တန်းခွဲ အဆင့်သတ်မှတ်ရန်)</p>
      <star-rating
        :increment="1"
        :max-rating="5"
        :glow="10"
        :rounded-corners="true"
        :star-size="25"
        :show-rating="false"
        :rating="tabObj.current_student_rating"
        @rating-selected="setRating"
        v-if="isLogin && tabObj.checkStudent"
      ></star-rating><!-- if student is logged in and existed in class_student table with approve status, show rating. -->
    </div>

    <!-- restricted-alert --> 
    <div class="restricted-alert col-12 col-lg-7 pl-0 my-3 roboto">
      <p v-if="!isLogin || !isStudent"> <!-- if not login  -->
        အတန်းအပ်ရန်အတွက် ကျောင်းသားအကောင့်ဖြင့် 
        <router-link class="text-green" :to="{ name: 'login' }">အကောင့်ဝင်ရန်</router-link> လိုအပ်ပါသည်။
      </p>
    </div>
    
    <!-- enroll btn -->
    <div> 
      <v-dialog class="vm--overlay"/>
      <div v-if="!tabObj.attendClass"><!-- Show if student is existed in class_student table (without status) -->
        <!-- <a title="Enroll" href="#" class="btn enroll-btn roboto text-white" v-if="isStudent" v-on:click="confirmEnroll()">စာရင်းသွင်းရန်</a> -->
        <button type="button" v-if="isStudent" v-on:click="confirmEnroll()" class="btn enroll-btn roboto text-white">စာရင်းသွင်းရန်</button>
      </div>
      <div 
        class="restricted-alert col-12 col-lg-7 pl-0 my-3 roboto"
        v-if="tabObj.attendClass && !tabObj.checkStudent && isStudent" >
        <p class="text-green">အတန်းအပ်ထားသည်ကို လက်ခံရန် စောင့်ပေးပါ။</p>
      </div>
    </div>
  </div>
</template>

<script src="../../../services/teacher/DetailClassTab/tab-classdetail.js"></script>

<style scoped src="../../../assets/css/teacher/DetailClassTab/tab-classdetail.css"></style>
