<template>
  <MainLayout>
    <section class="signup-teacher py-4">
      <div class="container pt-lg-5 pt-sm-1 pb-lg-0 pb-2">
        <div class="form-info col-lg-10">
          <h2 class="sub-head py-3 pb-lg-5 px-2 text-white text-center text-capitalize">
            <img src="@/assets/images/login-logo.png" alt="Create your account">
            <span class="d-block pt-md-4 pb-lg-4 pt-sm-2 roboto">အကောင့်ပြုလုပ်ရန်</span>
          </h2>
          <div class="form-content col-lg-10 p-0 p-md-5">
            <form method="post" @submit.prevent="submit" class="p-3">
              <h5>အကောင့်အသစ်ပြုလုပ်ရန် လိုအပ်သောအချက်အလက်များကို ဖြည့်ပါ</h5><br>
              <div class="signup-profile mb-4">
                <p class="pb-2">ပရိုဖိုင်းဓာတ်ပုံတင်ပါ</p>
                <div class="form-row align-items-center justify-content-center justify-content-sm-start">
                  <div class="user-icon d-flex align-items-center justify-content-center ml-2 mr-3 mb-2 mb-sm-0">
                    <div class="upload-profile">
                      <img class="profile-pic" id="profile-pic-user" :src="profile" v-if="profile.length > 0">
                      <i v-if="profile.length == 0" class="fas fa-user-alt profile-logo"></i>
                    </div>
                  </div>
                  <div class="file-upload ml-0 ml-sm-2" id="file-upload-user">
                    <span for="inputImg" id="upload-button-user" class="d-block" @click="$refs.fileInput.click()">ပုံရွေးရန်</span>
                    <input type="file" id="profile-photo" v-on:change="onProfileChange" class="file-upload d-none" ref="fileInput" accept="image/*" />
                  </div>
                </div>
                <div class="error text-danger" v-if="errorArr.profile" >{{ errorArr.profile[0] }}</div>
              </div>

              <div class="row">
                <div class="form-group col-lg-6 mb-md-4">
                  <label for="name">နာမည်</label>
                  <input type="text" v-model="signupForm.name" class="form-control" placeholder="နာမည် ဖြည့်ပါ" @change="one_field_required_check">
                  <div class="error text-danger" v-if="submitted && one_field_required_error">နာမည် သို့မဟုတ် သင်တန်းကျောင်းအမည် ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.name.maxLength">နာမည်သည် စာလုံးရေ ၁၀၀ ထက်မကျော်ရပါ</div>
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label for="schoolName">သင်တန်းကျောင်းအမည်</label>
                  <input type="text" v-model="signupForm.school_name" class="form-control" placeholder="သင်တန်းကျောင်းအမည် ဖြည့်ပါ" @change="one_field_required_check">
                  <div class="error text-danger" v-if="submitted && one_field_required_error">နာမည် သို့မဟုတ် သင်တန်းကျောင်းအမည် ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.school_name.maxLength">သင်တန်းကျောင်းအမည်သည် စာလုံးရေ ၁၀၀ ထက်မကျော်ရပါ</div>
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">စကားဝှက်</label>
                  <input type="password" v-model="signupForm.password" class="form-control" placeholder="စကားဝှက် ဖြည့်ပါ">
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.password.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.password.minLength">စကားဝှက်သည် အနည်းဆုံး ၈ လုံးရှိရပါမည်</div>
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.password.maxLength">စကားဝှက်သည် ၁၂ လုံး ထက်မကျော်ရပါ</div>
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">စကားဝှက် အတည်ပြုခြင်း</label>
                  <input type="password" v-model="signupForm.confirm_password" class="form-control" placeholder="အတည်ပြုစကားဝှက် ဖြည့်ပါ">
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.confirm_password.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.confirm_password.sameAsPassword">စကားဝှက် နှင့် တူရန်လိုအပ်ပါသည်</div>
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">ပညာအရည်အချင်း</label>
                  <input type="text" v-model="signupForm.education" class="form-control" placeholder="ပညာအရည်အချင်း ဖြည့်ပါ">
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">အတွေ့အကြုံ</label>
                  <input type="text" v-model="signupForm.experience" class="form-control" placeholder="အတွေ့အကြုံ ဖြည့်ပါ">
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">ကျောင်းသူ/သား ထံသို့ အမှာစကား</label>
                  <textarea rows="4" v-model="signupForm.message" class="editor" placeholder="အမှာစကား ဖြည့်ပါ"></textarea>
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label for="gender">ကျား/မ</label>
                  <div>
                    <div class="form-check-inline">
                      <label class="form-check-label">
                        <input type="radio" v-model="signupForm.gender" value="1" class="form-check-input" name="optradio">ကျား
                      </label>
                    </div>
                    <div class="form-check-inline">
                      <label class="form-check-label">
                        <input type="radio" v-model="signupForm.gender" value="2" class="form-check-input" name="optradio">မ
                      </label>
                    </div>
                  </div>  
                  <!-- <div class="error text-danger" v-if="submitted && !$v.signupForm.gender.required">ဖြည့်ရန်လိုအပ်ပါသည်</div> -->
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">မွေးနေ့</label>
                  <div>
                    <date-picker v-model="signupForm.date_of_birth" value-type="YYYY-MM-DD" format="DD/MM/YYYY" :disabled-date="notAfterToday"  placeholder="ရက်/လ/ခုနှစ်"></date-picker>
                    <!-- <div class="error text-danger" v-if="submitted && !$v.signupForm.date_of_birth.required">ဖြည့်ရန်လိုအပ်ပါသည်</div> -->
                  </div>
                </div>
                <div class="form-group col-12 mb-md-4">
                  <!-- <label for="nrcNumber">မှတ်ပုံတင် နံပါတ်</label>
                  <div class="d-flex flex-wrap align-items-center">
                    <div class="col-auto pr-2 pl-0 mb-1 sort relative">
                      <select class="form-control custom-select" id="nrc" @change="onChange($event)">
                        <option value="">---</option>
                        <option v-for="option in nrcno" :key="option.value" :value="option.value">{{ option.name }}</option>
                      </select>
                    </div>
                    <div class="col-auto px-2 slash roboto-light"> / </div>
                    <div class="col-auto pr-2 pl-0 sort relative">
                      <select class="form-control custom-select" id="nrcnamelist" @change="onChangeNrcName($event)" v-model="selectedNrcName">
                        <option v-for="(value, index) in districtList" :key="index" :value="value">{{ value }}</option>
                      </select>
                    </div>
                    <div class="col-auto pr-2 pl-0 sort relative">
                      <select class="form-control custom-select" id="nrcnainglist" v-model="selectedNrcNaing">
                        <option v-for="(value, index) in naingList" :key="index" :value="value">{{ value }}</option>
                      </select>
                    </div>
                    <div class="col-6 col-md-4 col-xl-3 pl-0">
                      <input type="text" v-model="signupForm.nrc_number" placeholder="မှတ်ပုံတင်နံပါတ်" class="form-control" id="nrc_number" maxlength="6"
                        :disabled="!nrckey  || !selectedNrcName || !selectedNrcNaing">
                    </div>
                  </div>
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.nrc_valid.minLength">မှတ်ပုံတင်နံပါတ်သည် အနည်းဆုံး ၆လုံး ဖြစ်ရပါမည်။</div>
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.nrc_valid.maxLength">မှတ်ပုံတင်နံပါတ်သည် အများဆုံး ၆လုံး ဖြစ်ရပါမည်။</div> -->
                  <!-- <div class="error text-danger" v-if="submitted && !$v.signupForm.nrc_valid.numeric">မှတ်ပုံတင်နံပါတ်သည် ကိန်းဂဏန်းဖြစ်ရပါမည်။</div> -->
                </div>
                <!-- <div class="form-group col-lg-6 mb-md-4 nrc-signup">
                  <label for="frontPhoto">မှတ်ပုံတင် အရှေ့ဓါတ်ပုံ</label>
                  <div class="d-flex align-items-center">
                    <div class="upload-nrc col-6">
                      <img class="nrc-pic" id="nrc-pic-front" :src="image_front" v-if="image_front.length > 0">
                      <i v-if="image_front.length == 0" class="fas fa-image nrc-front-icon"></i>
                    </div>
                    <div class="file-upload ml-2" id="file-upload-front">
                      <span for="inputImg" id="upload-button-front" @click="$refs.frontPhoto.click()" class="d-block">ပုံရွေးရန်</span>
                      <input type="file" id="file-upload-front-1" v-on:change="onNrcFrontChange" class="file-upload d-none" ref="frontPhoto" accept="image/*" />
                    </div>
                  </div>
                  <div class="error text-danger" v-if="errorArr.nrc_front" >{{ errorArr.nrc_front[0] }}</div>
                </div>
                <div class="form-group col-lg-6 mb-md-4 nrc-signup">
                  <label class="control-label">မှတ်ပုံတင် အနောက်ဓါတ်ပုံ</label>
                  <div class="d-flex align-items-center">
                    <div class="upload-nrc col-6">
                      <img class="nrc-pic" id="nrc-pic-back" :src="image_back" v-if="image_back.length > 0">
                      <i v-if="image_back.length == 0" class="fas fa-image nrc-back-icon"></i>
                    </div>
                    <div class="file-upload ml-2" id="file-upload-back">
                      <span for="inputImg" id="upload-button-back" class="d-block" @click="$refs.backPhoto.click()">ပုံရွေးရန်</span>
                      <input type="file" id="file-upload-back-1" v-on:change="onNrcBackChange" class="file-upload d-none" ref="backPhoto" accept="image/*" />
                    </div>
                  </div>
                  <div class="error text-danger" v-if="errorArr.nrc_back" >{{ errorArr.nrc_back[0] }}</div>
                </div> -->
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">ဖုန်းနံပါတ် ၁</label>
                  <input type="text" v-model="signupForm.phone_number_1" class="form-control" placeholder="ဖုန်းနံပါတ် ၁ ဖြည့်ပါ" id="phone_number_1" maxlength="20">
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.phone_number_1.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.phone_number_1.maxLength">ဖုန်းနံပါတ် ၁ သည် စာလုံး အရေအတွက်သည် ၂၀ ထက်မကျော်ရပါ</div>
                  <!-- <div class="error text-danger" v-if="submitted && !$v.signupForm.phno_valid.numeric">ဖုန်းနံပါတ် ၁ သည် နံပါတ် ဖြစ်ရပါမည်</div> -->
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">ဖုန်းနံပါတ် ၂</label>
                  <input type="text" v-model="signupForm.phone_number_2" class="form-control" placeholder="ဖုန်းနံပါတ် ၂ ဖြည့်ပါ" id="phone_number_2" maxlength="20">
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.phone_number_2.maxLength">ဖုန်းနံပါတ် ၂ စာလုံး အရေအတွက်သည် ၂၀ ထက်မကျော်ရပါ</div>
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">အီးမေးလ် ၁</label>
                  <input type="email" v-model="signupForm.email_1" class="form-control" placeholder="အီးမေးလ် ၁ ဖြည့်ပါ">
                  <!-- <div class="error text-danger" v-if="submitted && !$v.signupForm.email_1.required">ဖြည့်ရန်လိုအပ်ပါသည်</div> -->
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.email_1.email">အီးမေးလ် ၁ ပုံစံ မှားယွင်းနေပါသည်</div>
                  <div class="error text-danger" v-if="errorArr.email_1" >{{ errorArr.email_1[0] }}</div>
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">အီးမေးလ် ၂</label>
                  <input type="email" v-model="signupForm.email_2" class="form-control" placeholder="အီးမေးလ် ၂ ဖြည့်ပါ">
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.email_2.email">အီးမေးလ် ၂ ပုံစံ မှားယွင်းနေပါသည်</div>
                  <div class="error text-danger" v-if="errorArr.email_2" >{{ errorArr.email_2[0] }}</div>
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="region">တိုင်းဒေသကြီး</label>
                  <div class="sort relative">
                    <select class="form-control custom-select" v-model="signupForm.region" @change="onRegionChange($event)">
                      <option value="">---</option>
                      <option v-for="(value, index) in regionArr" :key="index" :value="index">{{ value }}</option>
                    </select>
                  </div>
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.region.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">မြို့နယ်</label>
                  <div class="sort relative">
                    <select class="form-control custom-select" @change="onChangeTwspName($event)" name="selectedTwspName">
                      <option selected>---</option>
                      <option v-for="(value, index) in twspName" :key="index" :value="value" >{{ value }}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group col-lg-6 mb-md-4">
                  <label class="control-label">လိပ်စာ</label>
                  <textarea rows="4" v-model="signupForm.address" placeholder="လိပ်စာ ဖြည့်ပါ" class="editor"></textarea>
                  <div class="error text-danger" v-if="submitted && !$v.signupForm.address.maxLength">လိပ်စာ စာလုံးအရေအတွက်သည် ၂၀၀ ထက်မကျော်ရပါ</div>
                </div>

              </div>

              <div class="form-group mb-0 pyidaungsu-regular">
                <div class="col-lg-7 mb-3 mb-sm-4 px-0">
                  <button type="submit" class="form-control-plaintext text-white">အကောင့်မှတ်ပုံတင်ရန်</button>
                </div>
                <p>အကောင့်ရှိပြီးသားလား? <router-link :to="{ name: 'login'}" class="pl-2">အကောင့်ဝင်ရန်</router-link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/signup-teacher.js"></script>

<style src="../../assets/css/teacher/signup-teacher.css"></style>
