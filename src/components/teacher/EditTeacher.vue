<template>
  <MainLayout>
    <section class="teacher-page-profile-edit py-4 profile-page-content">
      <div class="container py-2 py-md-5 roboto">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ဆရာအကောင့်ဆက်တင်
          <span>ဆရာ အချက်အလက် ပြင်ဆင်ခြင်း</span>
        </h2>
        <div class="row">
          <div class="col-lg-3 col-md-4 aside">
            <ul class="profile-list">
              <li>
                <a
                  :href="$router.resolve({name: 'detailTeacher'}).href"
                  class="active"
                >ဆရာ အချက်အလက်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'createCourse'}).href">သင်တန်း အသစ်ထည့်ရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'manageCourse'}).href">သင်တန်း စီမံရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'createClass'}).href">တန်းခွဲ အသစ်ထည့်ရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'manageClass'}).href">တန်းခွဲ စီမံရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'manageStudent'}).href">ကျောင်းသား စီမံခန့်ခွဲရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'changeTeacherPassword'}).href">စကားဝှက်ပြောင်းရန်</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-9 col-md-8">
            <div class="profile-page-main">
              <form action method="POST" class="form-content px-3 py-4" @submit.prevent="handleSubmit()">
                <div class="mb-4">
                  <p class="col-12 pb-2">ပရိုဖိုင်းဓာတ်ပုံတင်ပါ</p>
                  <div class="form-row align-items-center justify-content-center justify-content-sm-start">
                    <div class="user-icon d-flex align-items-center justify-content-center ml-2 mr-3 mb-2 mb-sm-0">
                      <div class="upload-profile">
                        <img class="profile-pic" id="profile-pic-user" :src="image_profile" v-if="image_profile.length > 0" @error="setAltImg" />
                        <i v-if="image_profile.length == 0" class="fas fa-user-alt profile-logo"></i>
                      </div>
                    </div>
                    <div class="file-upload ml-0 ml-sm-2" id="file-upload-user">
                      <span for="inputImg" id="upload-button-user" class="d-block" @click="$refs.fileInput.click()">ပုံရွေးရန်</span>
                      <input type="file" id="profile-photo" v-on:change="onProfileChange" class="file-upload d-none" 
                        ref="fileInput" accept="image/*" />
                    </div>
                  </div>
                </div>
                <div class="form-group col-12 mb-md-4">
                  <label for="name">Login ID</label>
                  <input type="text" class="form-control" v-model="teacher.teacher_no" disabled />
                </div>
                <div class="form-group col-12 mb-md-4">
                  <label for="name">နာမည်</label>
                  <input type="text" class="form-control" v-model="teacher.name" @change="one_field_required_check"/>
                  <!-- <div class="error text-danger" v-if="submitted && !$v.teacher.name.required">
                    ဖြည့်ရန်လိုအပ်ပါသည်
                  </div> -->
                  <div class="error text-danger" v-if="submitted && one_field_required_error">နာမည် သို့မဟုတ် သင်တန်းကျောင်းအမည် ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger" v-if="submitted && !$v.teacher.name.maxLength">
                    နာမည်သည် စာလုံးရေ ၁၀၀ ထက်မကျော်ရပါ
                  </div>
                </div>
                <div class="form-group col-12 mb-md-4">
                  <label for="schoolName">သင်တန်းကျောင်းအမည်</label>
                  <input type="text" class="form-control" v-model="teacher.school_name" @change="one_field_required_check"/>
                  <div class="error text-danger" v-if="submitted && one_field_required_error">နာမည် သို့မဟုတ် သင်တန်းကျောင်းအမည် ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger" v-if="submitted && !$v.teacher.school_name.maxLength">
                    သင်တန်းကျောင်းအမည်သည် စာလုံးရေ ၁၀၀ ထက်မကျော်ရပါ
                  </div>
                </div>
                <div class="form-group col-12 mb-md-4">
                  <label for="education">ပညာအရည်အချင်း</label>
                  <input type="text" class="form-control" v-model="teacher.education" />
                </div>
                <div class="form-group col-12 mb-md-4">
                  <label for="experience">အတွေ့အကြုံ</label>
                  <input type="text" class="form-control" v-model="teacher.experience" />
                </div>
                <div class="form-group col-12 mb-md-4">
                  <label for="messageToStudent">ကျောင်းသူ/သား ထံသို့ အမှာစကား</label>
                  <textarea class="editor" v-model="teacher.message" rows="4"></textarea>
                </div>
                <div class="form-group col-12 mb-md-4">
                  <label for="experience">ကျား/မ</label>
                  <div>
                    <div class="form-check-inline">
                      <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="optradio" v-model="teacher.gender" value="1" checked />ကျား
                      </label>
                    </div>
                    <div class="form-check-inline">
                      <label class="form-check-label">
                        <input type="radio" class="form-check-input radio-gender" name="optradio" v-model="teacher.gender" value="2" checked />မ
                      </label>
                    </div>
                    <!-- <div class="error text-danger" v-if="submitted && !$v.teacher.gender.required">
                      ဖြည့်ရန်လိုအပ်ပါသည်
                    </div> -->
                  </div>
                </div>
                <div class="form-group col-12 mb-md-4">
                  <label for="dateBirth">မွေးနေ့</label>
                  <date-picker v-model="teacher.date_of_birth" value-type="YYYY-MM-DD"
                    format="DD/MM/YYYY" :disabled-date="notAfterToday" placeholder="ရက်/လ/ခုနှစ်"></date-picker>
                  <!-- <div class="error text-danger" v-if="submitted && !$v.teacher.date_of_birth.required">
                    ဖြည့်ရန်လိုအပ်ပါသည်
                  </div> -->
                </div>

                <!-- <div class="form-group col-12 mb-md-4">
                  <label for="nrcNumber">မှတ်ပုံတင် နံပါတ်</label>
                  <div class="d-flex flex-wrap align-items-center">
                    <div class="col-auto pr-2 pl-0 mb-1 sort relative">
                      <select class="form-control custom-select" id="nrc" @change="onChange($event)">
                        <option value>---</option>
                        <option v-for="option in nrcno" :key="option.value" :value="option.value"
                          :selected="nrckey == option.value">{{ option.name }}</option>
                      </select>
                    </div>
                    <div class="col-auto px-2 slash roboto-light">/</div>
                    <div class="col-auto pr-2 pl-0 sort relative mb-1">
                      <select class="form-control custom-select"
                        id="nrcnamelist" @change="onChangeNrcName($event)" v-model="selectedNrcName">
                        <option v-for="(value, index) in districtList" :key="index" :value="value"
                          :selected="selectedNrcName == value">{{ value }}</option>
                      </select>
                    </div>
                    <div class="col-auto pr-2 pl-0 sort relative mb-1">
                      <select class="form-control custom-select" id="nrcnainglist" v-model="selectedNrcNaing">
                        <option v-for="(value, index) in naingList" :key="index" :value="value"
                          :selected="selectedNrcNaing == value">{{ value }}</option>
                      </select>
                    </div>
                    <div class="col-6 col-md-4 col-lg-3 pl-0 mb-1">
                      <input type="text" class="form-control" v-model="teacher.nrc_number" placeholder="မှတ်ပုံတင်နံပါတ်" 
                        id="nrc_number" maxlength="6" :disabled="!nrckey  || !selectedNrcName || !selectedNrcNaing"/>
                    </div>
                  </div>
                  <div class="error text-danger" v-if="submitted && !$v.teacher.nrc_number.minLength">
                    မှတ်ပုံတင်နံပါတ်သည် အနည်းဆုံး ၆လုံး ဖြစ်ရပါမည်။
                  </div>
                  <div class="error text-danger" v-if="submitted && !$v.teacher.nrc_number.maxLength">
                    မှတ်ပုံတင်နံပါတ်သည် အများဆုံး ၆လုံး ဖြစ်ရပါမည်။
                  </div> -->
                  <!-- <div class="error text-danger" v-if="submitted && !$v.teacher.nrc_number.numeric">
                    မှတ်ပုံတင်နံပါတ်သည် ကိန်းဂဏန်းဖြစ်ရပါမည်။
                  </div> -->
                <!-- </div> -->

                <!-- <div class="form-group col-lg-8 col-xl-6 mb-md-4 nrc-edit">
                  <label for="frontPhoto">မှတ်ပုံတင် အရှေ့ဓါတ်ပုံ</label>
                  <div class="d-sm-flex align-items-center">
                    <div class="upload-nrc col-12 col-sm-7">
                      <img class="nrc-pic" id="nrc-pic-front" :src="image_front" v-if="image_front.length > 0" @error="setAltImg" />
                      <i v-if="image_front.length == 0" class="fas fa-image nrc-front-icon"></i>
                    </div>
                    <div class="file-upload ml-sm-2" id="file-upload-front">
                      <span class="d-block" for="inputImg" id="upload-button-front" @click="$refs.frontPhoto.click()">ပုံရွေးရန်</span>
                      <input type="file" id="file-upload-back-1" v-on:change="onNrcFrontChange" class="file-upload d-none"
                        ref="frontPhoto" accept="image/*" />
                    </div>
                  </div>
                  <div class="error text-danger" v-if="errorArr.nrc_front" >{{ errorArr.nrc_front[0] }}</div>
                </div>

                <div class="form-group col-lg-8 col-xl-6 mb-md-4 nrc-edit">
                  <label for="backPhoto">မှတ်ပုံတင် အနောက်ဓါတ်ပုံ</label>
                  <div class="d-sm-flex align-items-center">
                    <div class="upload-nrc col-12 col-sm-7">
                      <img class="nrc-pic" id="nrc-pic-back" :src="image_back" v-if="image_back.length > 0" @error="setAltImg" />
                      <i v-if="image_back.length == 0" class="fas fa-image nrc-back-icon"></i>
                    </div>
                    <div class="file-upload ml-sm-2" id="file-upload-back">
                      <span for="inputImg" id="upload-button-back" class="d-block" @click="$refs.backPhoto.click()">ပုံရွေးရန်</span>
                      <input type="file" id="file-upload-back-2" v-on:change="onNrcBackChange" 
                        class="file-upload d-none" ref="backPhoto" accept="image/*" />
                    </div>
                  </div>
                  <div class="error text-danger" v-if="errorArr.nrc_back">{{ errorArr.nrc_back[0] }}</div>
                </div> -->

                <div class="form-group col-12 mb-md-4">
                  <label for="phoneNumber1">ဖုန်းနံပါတ် ၁</label>
                  <input type="tel" class="form-control" v-model="teacher.phone_number_1" id="phone_number_1" maxlength="20"/>
                  <div class="error text-danger" v-if="submitted && !$v.teacher.phone_number_1.required">
                    ဖြည့်ရန်လိုအပ်ပါသည်
                  </div>
                  <div class="error text-danger" v-if="submitted && !$v.teacher.phone_number_1.maxLength">
                    ဖုန်းနံပါတ် ၁ စာလုံး အရေအတွက်သည် ၂၀ ထက်မကျော်ရပါ
                  </div>
                  <!-- <div class="error text-danger" v-if="submitted && !$v.teacher.phno_valid.maxLength">ဖုန်းနံပါတ် ၁ သည် စာလုံး အရေအတွက်သည် ၂၀ ထက်မကျော်ရပါ</div>
                  <div class="error text-danger" v-if="submitted && !$v.teacher.phno_valid.numeric">ဖုန်းနံပါတ် ၁ သည် နံပါတ် ဖြစ်ရပါမည်</div> -->
                </div>

                <div class="form-group col-12 mb-md-4">
                  <label for="phoneNumber2">ဖုန်းနံပါတ် ၂</label>
                  <input type="tel" class="form-control" v-model="teacher.phone_number_2" id="phone_number_2" maxlength="20"/>
                  <div class="error text-danger" v-if="submitted && !$v.teacher.phone_number_2.maxLength">
                    ဖုန်းနံပါတ် ၂ စာလုံး အရေအတွက်သည် ၂၀ ထက်မကျော်ရပါ
                  </div>
                </div>

                <div class="form-group col-12 mb-md-4">
                  <label for="email1">အီးမေးလ် ၁</label>
                  <input type="email" class="form-control" v-model="teacher.email_1" />
                  <!-- <div class="error text-danger" v-if="submitted && !$v.teacher.email_1.required">
                    ဖြည့်ရန်လိုအပ်ပါသည်
                  </div> -->
                  <div class="error text-danger" v-if="submitted && !$v.teacher.email_1.email">
                    အီးမေးလ် ၁ ပုံစံ မှားယွင်းနေပါသည်
                  </div>
                  <div class="error text-danger" v-if="errorArr.email_1">{{ errorArr.email_1[0] }}</div>
                </div>

                <div class="form-group col-12 mb-md-4">
                  <label for="email2">အီးမေးလ် ၂</label>
                  <input type="email" class="form-control" v-model="teacher.email_2" />
                  <div class="error text-danger" v-if="submitted && !$v.teacher.email_2.email">
                    အီးမေးလ် ၂ ပုံစံ မှားယွင်းနေပါသည်
                  </div>
                </div>

                <div class="form-group col-12 mb-md-4">
                  <label for="region">တိုင်းဒေသကြီး</label>
                  <div class="sort relative">
                    <select class="form-control custom-select" v-model="teacher.region" @change="onRegionChange($event)">
                      <option value>---</option>
                      <option v-for="(value, index) in regionArr" :key="index" :value="index" :selected="value == teacher.region">{{ value }}</option>
                    </select>
                  </div>
                  <div class="error text-danger" v-if="submitted && !$v.teacher.region.required">
                    ဖြည့်ရန်လိုအပ်ပါသည်
                  </div>
                  <div class="error text-danger" v-if="submitted && !$v.teacher.region.maxLength">
                    တိုင်းဒေသကြီး စာလုံးအရေအတွက်သည် ၁၀၀ ထက်မကျော်ရပါ
                  </div>
                </div>

                <div class="form-group col-12 mb-md-4">
                  <label for="township">မြို့နယ်</label>
                  <div class="sort relative">
                    <select class="form-control custom-select" v-model="teacher.town" @change="onChangeTwspName($event)">
                      <option value>---</option>
                      <option v-for="(value, index) in twspName" :key="index" :value="value" >{{ value }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group col-12 mb-md-4">
                  <label for="address">လိပ်စာ</label>
                  <textarea rows="4" name="address" class="editor" v-model="teacher.address"></textarea>
                  <div class="error text-danger" v-if="submitted && !$v.teacher.address.maxLength">
                    လိပ်စာ စာလုံးအရေအတွက်သည် ၂၀၀ ထက်မကျော်ရပါ
                  </div>
                </div>

                <div class="form-group col-lg-6 mb-0 pyidaungsu-regular">
                  <button type="submit" class="btn text-green save-btn">
                    <span>သိမ်းဆည်းရန်</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/edit-teacher.js"></script>

<style src="../../assets/css/teacher/edit-teacher.css"></style>

