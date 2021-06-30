<template>
  <MainLayout>
    <section class="py-5 profile-page-content add-new-class">
      <div class="container pb-2 pb-md-4">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ဆရာအကောင့်ဆက်တင်
          <span>တန်းခွဲအသစ်ထည့်ခြင်း</span>
        </h2>
        <div class="profile-page-block">
          <div class="row">
            <div class="col-lg-3 col-md-4 aside">
              <ul class="profile-list">
                <li>
                  <a :href="$router.resolve({name: 'detailTeacher'}).href">ဆရာ အချက်အလက်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'createCourse'}).href">သင်တန်း အသစ်ထည့်ရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'manageCourse'}).href">သင်တန်း စီမံရန်</a>
                </li>
                <li>
                  <a
                    :href="$router.resolve({name: 'createClass'}).href"
                    class="active"
                  >တန်းခွဲ အသစ်ထည့်ရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'manageClass'}).href">တန်းခွဲ စီမံရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'manageStudent'}).href">ကျောင်းသားစီမံခန့်ခွဲရန်</a>
                </li>
                <li>
                  <a
                    :href="$router.resolve({name: 'changeTeacherPassword'}).href"
                  >စကားဝှက်ပြောင်းရန်</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-9 col-md-8">
              <div class="profile-page-main">
                <form method="post" @submit.prevent="submit" class="form-content py-4 px-0 px-sm-3">
                  <div class="form-group col-12 mb-md-4">
                    <label for="course-title">တန်းခွဲ ခေါင်းစဉ်</label>
                    <div class="sort relative">
                      <select @change="onChange($event)"
                        name="course_title" class="form-control custom-select">
                        <option selected>သင်တန်း ရွေးပါ</option>
                        <option
                          v-for="(value, index) in courses"
                          :key="index"
                          :value="value.course_id"
                        >{{ value.course_title }}</option>
                      </select>
                    </div>
                    <div
                      class="error text-danger"
                      v-if="submitted && !$v.createClassForm.course_title.required"
                    >ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  </div>

                  <div class="form-group col-12 mb-md-4">
                    <label for="class-fees">တန်းခွဲ သင်တန်းကြေး</label>
                    <input
                      type="text"
                      v-model="createClassForm.fee"
                      placeholder="တန်းခွဲ သင်တန်းကြေး ဖြည့်ပါ"
                      class="form-control"
                      id="fee"
                    />
                    <div
                      class="error text-danger"
                      v-if="submitted && !$v.createClassForm.fee.required"
                    >ဖြည့်ရန်လိုအပ်ပါသည်</div>
                    <!-- <div
                      class="error text-danger"
                      v-if="submitted && !$v.createClassForm.fee.integer"
                    >တန်းခွဲ သင်တန်းကြေးသည် ကိန်း ဂဏန်း သာဖြစ်ရပါမည်</div> -->
                  </div>
                  
                  <div class="row form-group col-12">
                    <div class="form-group col-lg-6 mb-md-4">
                      <label for="start-time">တန်းခွဲ စချိန်</label>
                      <div class="">
                        <date-picker
                          v-model="createClassForm.start_time"
                          format="HH:mm"
                          value-type="format"
                          type="time"
                          @change="time_check"
                          placeholder="နာရီ:မိနစ်" :time-picker-options="timePickerOptions"
                        ></date-picker>
                      </div>
                      <div class="error text-danger" v-if="submitted && !$v.createClassForm.start_time.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                      <div class="error text-danger" v-if="time_invalid_error">တန်းခွဲ စချိန်သည် တန်းခွဲ ပြီးချိန်ထက် ကျော်နေပါသည်</div>
                    </div>

                    <div class="form-group col-lg-6 mb-md-4">
                      <label for="end-time">တန်းခွဲ ပြီးချိန်</label>
                      <div>
                        <date-picker
                          v-model="createClassForm.end_time"
                          format="HH:mm"
                          value-type="format"
                          type="time"
                          @change="time_check"
                          placeholder="နာရီ:မိနစ်" :time-picker-options="timePickerOptions"
                        ></date-picker>
                      </div>
                      <div class="error text-danger" v-if="submitted && !$v.createClassForm.end_time.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                      <div class="error text-danger" v-if="time_invalid_error">တန်းခွဲ စချိန်သည် တန်းခွဲ ပြီးချိန်ထက် ကျော်နေပါသည်</div>
                      <div class="error text-danger" v-if="time_equal_error">တန်းခွဲ စချိန်နှင့် တန်းခွဲ ပြီးချိန်သည် တူနေပါသည်</div>
                    </div>
                  </div>
                  
                  <div class="row col-12">
                    <div class="form-group col-lg-6 mb-md-4">
                      <label for="start-date">တန်းခွဲ စမည့်ရက်</label>
                      <div>
                        <date-picker
                          v-model="createClassForm.start_date"
                          value-type="YYYY-MM-DD"
                          format="DD/MM/YYYY"
                          :disabled-date="notBeforeToday"
                          @change="date_check"
                          placeholder="ရက်/လ/ခုနှစ်"
                        ></date-picker>
                      </div>
                      <div class="error text-danger" v-if="submitted && !$v.createClassForm.start_date.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                      <div class="error text-danger" v-if="date_invalid_error">တန်းခွဲ စမည့်ရက်သည် တန်းခွဲ ပြီးမည့်ရက်ထက် ကျော်နေပါသည်</div>
                    </div>

                    <div class="form-group col-lg-6 mb-md-4">
                      <label for="end-date">တန်းခွဲ ပြီးမည့်ရက်</label>
                      <div>
                        <date-picker
                          v-model="createClassForm.end_date"
                          value-type="YYYY-MM-DD"
                          format="DD/MM/YYYY"
                          :disabled-date="notBeforeToday"
                          @change="date_check"
                          placeholder="ရက်/လ/ခုနှစ်"
                        ></date-picker>
                      </div>
                      <div class="error text-danger" v-if="submitted && !$v.createClassForm.end_date.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                      <div class="error text-danger" v-if="date_invalid_error">တန်းခွဲ စမည့်ရက်သည် တန်းခွဲ ပြီးမည့်ရက်ထက် ကျော်နေပါသည်</div>
                    </div>
                  </div>

                  <div class="form-group col-12 mb-md-4">
                    <label for="class-type">တန်းခွဲ အမျိုးအစား</label>
                    <div class="class-type-radio">
                      <label>
                        <input type="radio" value="2" v-model="createClassForm.class_type"
                          class="mr-2 weekday" @click="checkWeekday" />ရုံးဖွင့်ရက်
                      </label>
                      <div class="classday-checkbox d-flex flex-wrap ml-2">
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="monday" value="Monday"
                              v-model="createClassForm.monday" :disabled="!(createClassForm.class_type==2)" />တနင်္လာနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="tuesday" value="Tuesday"
                              v-model="createClassForm.tuesday" :disabled="!(createClassForm.class_type==2)" />အင်္ဂါနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="wednesday" value="Wednesday"
                              v-model="createClassForm.wednesday" :disabled="!(createClassForm.class_type==2)" />ဗုဒ္ဓဟူးနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="thursday" value="Thursday"
                              v-model="createClassForm.thursday" :disabled="!(createClassForm.class_type==2)" />ကြာသပတေးနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="friday" value="Friday"
                              v-model="createClassForm.friday" :disabled="!(createClassForm.class_type==2)" />သောကြာနေ့
                          </label>
                        </div>
                      </div>

                      <div class="error text-danger" v-if="createClassForm.class_type==2 && weekday_validation">ဖြည့်ရန်လိုအပ်ပါသည်</div>

                      <label>
                        <input type="radio" class="mr-2" value="1"
                          v-model="createClassForm.class_type" @click="checkWeekend" />ရုံးပိတ်ရက်
                      </label>
                      <div class="classday-checkbox d-flex flex-wrap ml-2">
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="saturday" value="Saturday"
                              v-model="createClassForm.saturday" :disabled="!(createClassForm.class_type==1)" />စနေနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="sunday" value="Sunday"
                              v-model="createClassForm.sunday" :disabled="!(createClassForm.class_type==1)" />တနင်္ဂနွေနေ့
                          </label>
                        </div>
                      </div>

                      <div class="error text-danger" v-if="createClassForm.class_type==1 && weekend_validation">ဖြည့်ရန်လိုအပ်ပါသည်</div>

                      <label>
                        <input type="radio" class="mr-2" value="3"
                          v-model="createClassForm.class_type" @click="checkWeekdayWeekend" />နှစ်ခုစလုံး
                      </label>
                      <div class="classday-checkbox d-flex flex-wrap ml-2">
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="monday" value="Monday"
                              v-model="createClassForm.monday1" :disabled="!(createClassForm.class_type==3)" />တနင်္လာနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="tuesday" value="Tuesday"
                              v-model="createClassForm.tuesday1" :disabled="!(createClassForm.class_type==3)" />အင်္ဂါနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="wednesday" value="Wednesday"
                              v-model="createClassForm.wednesday1" :disabled="!(createClassForm.class_type==3)" />ဗုဒ္ဓဟူးနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="thursday" value="Thursday"
                              v-model="createClassForm.thursday1" :disabled="!(createClassForm.class_type==3)" />ကြာသပတေးနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="friday" value="Friday"
                              v-model="createClassForm.friday1" :disabled="!(createClassForm.class_type==3)" />သောကြာနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="saturday" value="Saturday"
                              v-model="createClassForm.saturday1" :disabled="!(createClassForm.class_type==3)" />စနေနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" class="mr-2" id="sunday" value="Sunday"
                              v-model="createClassForm.sunday1" :disabled="!(createClassForm.class_type==3)" />တနင်္ဂနွေနေ့
                          </label>
                        </div>
                      </div>

                      <div class="error text-danger" v-if="createClassForm.class_type==3 && weekdayweekend_validation">ဖြည့်ရန်လိုအပ်ပါသည်</div>

                    </div>
                    <div class="error text-danger" v-if="submitted && !$v.createClassForm.class_type.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  </div>

                  <div class="form-group col-lg-6 mb-0">
                    <button type="submit" class="btn text-green save-btn">သိမ်းဆည်းရန်</button>
                    <div class="error text-danger" v-if="submit_permission">ရက်စွဲနှင့်အချိန် မှားယွင်းနေပါသည်</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/create-class.js"></script>

<style src="../../assets/css/teacher/create-class.css"></style>
