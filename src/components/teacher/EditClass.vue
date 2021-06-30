<template>
  <MainLayout>
    <section class="py-4 profile-page-content add-new-class">
      <div class="container py-2 py-md-5 roboto">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ဆရာအကောင့်ဆက်တင်
          <span>တန်းခွဲများ စီမံရန်</span>
        </h2>
        <div class="profile-page-block">
          <div class="row">
            <div class="col-lg-3 col-md-4 aside">
              <ul class="profile-list">
                <li>
                  <a :href="$router.resolve({name: 'detailTeacher'}).href">ဆရာ အချက်အလက်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'createCourse'}).href">သင်ခန်းစာများ ထည့်ရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'createClass'}).href">တန်းခွဲများ ထည့်ရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'manageCourse'}).href">သင်ခန်းစာများ စီမံရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'manageClass'}).href" class="active">တန်းခွဲများ စီမံရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'manageStudent'}).href">ကျောင်းသား/သူ များစီမံရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'changeTeacherPassword'}).href">စကားဝှက်ပြောင်းရန်</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-9 col-md-8">
              <div class="profile-page-main">
                <form method="post" @submit.prevent="submit" class="form-content py-4 px-0 px-sm-3">
                  <div class="form-group col-12 mb-md-4">
                    <label for="course-title">တန်းခွဲ ခေါင်းစဉ်</label>
                    <input type="text" v-model="updateClassForm.course_name"
                      class="form-control" placeholder="တန်းခွဲခေါင်းစဉ် ဖြည့်ပါ" :disabled="disabled" />
                  </div>
                  <div class="form-group col-12 mb-md-4">
                    <label for="class-fees">တန်းခွဲ သင်တန်းကြေး</label>
                    <input type="text" v-model="updateClassForm.fee"
                      class="form-control" placeholder="တန်းခွဲသင်တန်းကြေး ဖြည့်ပါ" id="fee"/>
                    <div class="error text-danger"
                      v-if="submitted && !$v.updateClassForm.fee.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                    <!-- <div class="error text-danger"
                      v-if="submitted && !$v.updateClassForm.fee.integer">တန်းခွဲ သင်တန်းကြေးသည် ကိန်း ဂဏန်း သာဖြစ်ရပါမည်</div> -->
                  </div>

                  <div class="row form-group col-12">
                    <div class="form-group col-lg-6 mb-md-4">
                      <label for="start-time">တန်းခွဲ စချိန်</label>
                      <div>
                        <date-picker v-model="updateClassForm.start_time" format="HH:mm" value-type="format" type="time"
                          @change="time_check" placeholder="နာရီ:မိနစ်" :time-picker-options="timePickerOptions"></date-picker>
                        <div class="error text-danger"
                          v-if="submitted && !$v.updateClassForm.start_time.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                        <div class="error text-danger"
                          v-if="time_invalid_error">တန်းခွဲ စချိန်သည် တန်းခွဲ ပြီးချိန် ထက်ကျော်နေပါသည်</div>
                      </div>
                    </div>

                    <div class="form-group col-lg-6 mb-md-4">
                      <label for="end-time">တန်းခွဲ ပြီးချိန်</label>
                      <div>
                        <date-picker v-model="updateClassForm.end_time" format="HH:mm" value-type="format"
                          type="time" @change="time_check" placeholder="နာရီ:မိနစ်" :time-picker-options="timePickerOptions"></date-picker>
                        <div class="error text-danger"
                          v-if="submitted && !$v.updateClassForm.end_time.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                        <div class="error text-danger"
                          v-if="time_invalid_error">တန်းခွဲ စချိန်သည် တန်းခွဲ ပြီးချိန် ထက်ကျော်နေပါသည်</div>
                        <div class="error text-danger"
                          v-if="time_equal_error">တန်းခွဲ စချိန်နှင့် တန်းခွဲ ပြီးချိန်သည် တူနေပါသည်</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="row form-group col-12">
                    <div class="form-group col-lg-6 mb-md-4">
                      <label for="start-date">တန်းခွဲ စမည့်ရက်</label>
                      <div>
                        <date-picker v-model="updateClassForm.start_date" value-type="YYYY-MM-DD" format="DD/MM/YYYY"
                          @change="date_check" :disabled-date="notBeforeToday" placeholder="ရက်/လ/ခုနှစ်"></date-picker>
                        <div class="error text-danger"
                          v-if="submitted && !$v.updateClassForm.start_date.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                        <div class="error text-danger"
                          v-if="date_invalid_error">တန်းခွဲ စမည့်ရက်သည် တန်းခွဲ ပြီးမည့်ရက် ထက်ကျော်နေပါသည်</div>
                      </div>
                    </div>
                    
                    <div class="form-group col-lg-6 mb-md-4">
                      <label for="end-date">တန်းခွဲ ပြီးမည့်ရက်</label>
                      <div>
                        <date-picker v-model="updateClassForm.end_date" value-type="YYYY-MM-DD" format="DD/MM/YYYY"
                          @change="date_check" :disabled-date="notBeforeToday" placeholder="ရက်/လ/ခုနှစ်"></date-picker>
                        <div class="error text-danger"
                          v-if="submitted && !$v.updateClassForm.end_date.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                        <div class="error text-danger"
                          v-if="date_invalid_error">တန်းခွဲ စမည့်ရက်သည် တန်းခွဲ ပြီးမည့်ရက် ထက်ကျော်နေပါသည်</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="form-group col-12 mb-md-4">
                    <label for="class-type">တန်းခွဲ အမျိုးအစား</label>
                    <div class="class-type-radio">
                      <label>
                        <input type="radio" value="2" v-model="updateClassForm.class_type"
                          class="mr-2 weekday" @click="checkWeekday" />ရုံးဖွင့်ရက်
                      </label>
                      <div class="classday-checkbox d-flex flex-wrap ml-2">
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="monday" value="1" v-model="updateClassForm.monday"
                              class="mr-2" :disabled="!(updateClassForm.class_type==2)" />တနင်္လာနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="tuesday" value="Tuesday" v-model="updateClassForm.tuesday"
                              class="mr-2" :disabled="!(updateClassForm.class_type==2)" />အင်္ဂါနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="wednesday" value="Wednesday" v-model="updateClassForm.wednesday"
                              class="mr-2" :disabled="!(updateClassForm.class_type==2)" />ဗုဒ္ဓဟူးနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="thursday" value="Thursday" v-model="updateClassForm.thursday"
                              class="mr-2" :disabled="!(updateClassForm.class_type==2)" />ကြာသပတေးနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="friday" value="Friday" v-model="updateClassForm.friday"
                              class="mr-2" :disabled="!(updateClassForm.class_type==2)" />သောကြာနေ့
                          </label>
                        </div>
                      </div>
                      <div class="error text-danger" v-if="updateClassForm.class_type==2 && weekday_validation">ဖြည့်ရန်လိုအပ်ပါသည်</div>

                      <label>
                        <input type="radio" value="1" v-model="updateClassForm.class_type"
                          class="mr-2" @click="checkWeekend" />ရုံးပိတ်ရက်
                      </label>
                      <div class="classday-checkbox d-flex flex-wrap ml-2">
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="saturday" value="Saturday" v-model="updateClassForm.saturday"
                              class="mr-2" :disabled="!(updateClassForm.class_type==1)" />စနေနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="sunday" value="Sunday" v-model="updateClassForm.sunday"
                              class="mr-2" :disabled="!(updateClassForm.class_type==1)" />တနင်္ဂနွေနေ့
                          </label>
                        </div>
                      </div>
                      <div class="error text-danger" v-if="updateClassForm.class_type==1 && weekend_validation">ဖြည့်ရန်လိုအပ်ပါသည်</div>

                      <label>
                        <input type="radio" value="3" v-model="updateClassForm.class_type"
                          class="mr-2 weekday" @click="checkWeekdayWeekend" />နှစ်ခုစလုံး
                      </label>
                      <div class="classday-checkbox d-flex flex-wrap ml-2">
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="monday" value="1" v-model="updateClassForm.monday1"
                              class="mr-2" :disabled="!(updateClassForm.class_type==3)" />တနင်္လာနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="tuesday" value="Tuesday" v-model="updateClassForm.tuesday1"
                              class="mr-2" :disabled="!(updateClassForm.class_type==3)" />အင်္ဂါနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="wednesday" value="Wednesday" v-model="updateClassForm.wednesday1"
                              class="mr-2" :disabled="!(updateClassForm.class_type==3)" />ဗုဒ္ဓဟူးနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="thursday" value="Thursday" v-model="updateClassForm.thursday1"
                              class="mr-2" :disabled="!(updateClassForm.class_type==3)" />ကြာသပတေးနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="friday" value="Friday" v-model="updateClassForm.friday1"
                              class="mr-2" :disabled="!(updateClassForm.class_type==3)" />သောကြာနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="saturday" value="Saturday" v-model="updateClassForm.saturday1"
                              class="mr-2" :disabled="!(updateClassForm.class_type==3)" />စနေနေ့
                          </label>
                        </div>
                        <div class="col-6 col-sm-4 col-md-6 col-lg-4 px-1">
                          <label>
                            <input type="checkbox" id="sunday" value="Sunday" v-model="updateClassForm.sunday1"
                              class="mr-2" :disabled="!(updateClassForm.class_type==3)" />တနင်္ဂနွေနေ့
                          </label>
                        </div>
                      </div>
                      <div class="error text-danger" v-if="updateClassForm.class_type==3 && weekdayweekend_validation">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                    </div>
                  </div>

                  <div class="form-group col-lg-6 mb-0 pyidaungsu-regular">
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

<script src="../../services/teacher/edit-class.js"></script>

    