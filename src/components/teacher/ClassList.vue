<template>
  <MainLayout>
    <section class="py-4 class">
      <div class="container py-2 py-md-5">
        <div class="row">
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

            <div class="filter roboto mb-4">
              <p class="roboto-bold pb-2 aside-title mb-2">တန်းခွဲအလိုက်ရှာရန်</p>
              <input type="checkbox" value="1" v-model="filter.class_type" class="mr-2" />
              <label for>ရုံးပိတ်ရက်အတန်း</label>
              <br />
              <input type="checkbox" value="2" v-model="filter.class_type" class="mr-2" />
              <label for>ရုံးဖွင့်ရက်အတန်း</label>
              <br />
              <input type="checkbox" value="3" v-model="filter.class_type" class="mr-2" />
              <label for>နှစ်ခုစလုံး</label>
              <br />
            </div>
            <div class="filter roboto mb-4">
              <p class="roboto-bold pb-2 aside-title mb-2">အတန်းချိန်အလိုက်ရှာရန်</p>

              <!-- date picker -->
              <label for="start-time">အတန်းစချိန်</label>
              <date-picker format="HH:mm" value-type="format" type="time"
                placeholder="နာရီ:မိနစ်" :time-picker-options="timePickerOptions"
                v-model="filter.start_time"></date-picker>

              <label for="start-time">အတန်းပြီးဆုံးချိန်</label>
              <date-picker format="HH:mm" value-type="format" type="time"
                placeholder="နာရီ:မိနစ်" :time-picker-options="timePickerOptions"
                v-model="filter.end_time"
              ></date-picker>
            </div>
            <div class="filter roboto mb-4">
              <p class="roboto-bold mb-2 aside-title pb-2">သင်တန်းကြေးအလိုက်ရှာရန်</p>
              <!-- <p class="roboto-bold price-range">Price Range</p>
              <p class="roboto-bold price-range">MMK {{this.currentRefinement.min}} - MMK {{this.currentRefinement.max}}</p>
              <vue-slider
                :min="range.min"
                :max="range.max"
                :lazy="true"
                :value="toValue(currentRefinement, range)"
                @change="refine({ min: $event[0], max: $event[1]})"
              /> -->
              <label for="start-time">မှ</label>
              <input type="text" v-model="filter.min" placeholder="အနည်းဆုံး" id="min" class="form-control" />

              <label for="start-time">အထိ</label>
              <input type="text" v-model="filter.max" placeholder="အများဆုံး" id="max" class="form-control" />
            </div>
            <div class="mt-4">
              <button type="button" v-on:click="classFilter()" class="btn apply-filter text-white text-center roboto" id="myBtn">
                စီစစ်ရန်
              </button>
            </div>
          </div>

          <div class="col-lg-9 col-md-8">
            <div class="class-main">
              <div class="mb-3 d-flex justify-content-between">
                <h3 class="sub-title">တန်းခွဲများ</h3>
                <p class="roboto">
                  <span class="roboto-bold">အရေအတွက် - </span>
                  {{ classes.total }}
                </p>
              </div>
              <div class="search-sort d-flex justify-content-between bg-lightgrey mb-4 flex-wrap">
                <div class="search-box col-sm-6 col-md-7 col-lg-5 col-xl-4 p-0 mb-sm-0 mb-1">
                  <div class="search-form relative">
                    <input
                      class="form-control"
                      v-model="filter.class_name"
                      v-on:keyup="classFilter"
                      type="search"
                      placeholder="ရှာဖွေရန်"
                    />
                    <button>
                      <i class="fas fa-search"></i>
                    </button>
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
                <div v-for="classvalue in classes.data" :key="classvalue.class_id" class="col-lg-6 mb-4">
                  <div class="class-item">
                    <ul class="roboto">
                      <li>
                        <p class="pyidaungsu-regular class-name">{{ classvalue.course_name }}</p>
                        <p class="bg-white shadow-04 text-center class-day" v-if="classvalue.class_type == 1">ရုံးပိတ်ရက်အတန်း</p>
                        <p class="bg-white shadow-04 text-center class-day" v-if="classvalue.class_type == 2">ရုံးဖွင့်ရက်အတန်း</p>
                        <p class="bg-white shadow-04 text-center class-day" v-if="classvalue.class_type == 3">နှစ်ခုစလုံး</p>
                      </li>
                      <li class="roboto">
                        <span>{{ classvalue.duration }}</span>
                        <span>{{ classvalue.start_time }} - {{ classvalue.end_time }}</span>
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
                        <span>MMK {{ classvalue.fee }}</span>
                      </li>
                      <li>
                        <router-link
                          :to="{ name: 'detailClass', params: { id:classvalue.class_id }}"
                          class="view-detail btn"
                        >ကြည့်ရန်</router-link>
                        <!-- <router-link :to="{ name: 'detailClass', params: { id:classvalue.class_id }}" class="btn enroll-btn text-white">စာရင်းသွင်းရန်</router-link> -->
                        <v-dialog />
                        <div v-if="!classvalue.attendClass">
                          <button type="button" v-if="!isStudent" v-on:click="confirmLogin(classvalue.class_id)" class="btn enroll-btn roboto text-white">စာရင်းသွင်းရန်</button>
                          <button type="button" v-if="isStudent" v-on:click="confirmEnroll(classvalue.class_id)" class="btn enroll-btn roboto text-white">စာရင်းသွင်းရန်</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="roboto d-flex justify-content-between flex-wrap my-3 mb-md-0">
              <p class="view-item">စုစုပေါင်း {{ lastPage }} မျက်နှာရဲ့ {{ currentPage }} မျက်နှာမြောက်</p>
              <!-- <Pagination
                :data="classes"
                @pagination-change-page="classFilter"
                v-if="pg_status == true"
              >
                <span slot="prev-nav">&lt; ရှေ့သို့</span>
                <span slot="next-nav">နောက်သို့ &gt;</span>
              </Pagination>
              <Pagination
                :data="classes"
                @pagination-change-page="getAllClasses"
                v-if="pg_status == false"
              >
                <span slot="prev-nav">&lt; ရှေ့သို့</span>
                <span slot="next-nav">နောက်သို့ &gt;</span>
              </Pagination> -->
              <advanced-laravel-vue-paginate 
                v-if="pg_status == true"
                :data = "classes" 
                :onEachSide = "2" 
                :previousText = "'< ရှေ့သို့'" 
                :nextText = "'နောက်သို့ >'"
                @paginateTo = "classFilter" />
              <advanced-laravel-vue-paginate 
                v-if="pg_status == false"
                :data = "classes" 
                :onEachSide = "2" 
                :previousText = "'< ရှေ့သို့'" 
                :nextText = "'နောက်သို့ >'"
                @paginateTo = "getAllClasses" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/class-list.js"></script>
