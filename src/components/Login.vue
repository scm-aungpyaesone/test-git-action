<template>
  <MainLayout>
    <section class="login py-4">
      <div class="container py-md-5 pt-lg-5 pt-sm-1 pb-lg-0 pb-2">
        <div class="form-info col-lg-10">
          <h2 class="sub-head py-3 pb-lg-5 px-2 text-white text-center text-capitalize">
            <img src="@/assets/images/login-logo.png"
              alt="login to your account" />
            <span class="d-block pt-md-4 pb-lg-4 pt-sm-2 roboto">အကောင့်ဝင်ပါ</span>
          </h2>
          <div class="form-content col-lg-10 p-0 p-md-5">
            <form method="post" @submit.prevent="submitLogin" class="p-3">
              <p class="pb-3">
                သင်၏အကောင့်သို့ ဝင်နိုင်ရန် အကောင့် User ID နှင့် စကားဝှက်အား
                ဖြည့်ပါ။
              </p>
              <div class="form-group col-lg-7 px-0 mb-4">
                <label for="userid">User ID</label>
                <input type="text" v-model="loginForm.login_number"
                  placeholder="User ID ဖြည့်ပါ" class="form-control" />
                <div class="error text-danger" v-if="submitted && !$v.loginForm.login_number.required">
                  ဖြည့်ရန်လိုအပ်ပါသည်
                </div>
              </div>

              <div class="form-group col-lg-7 px-0 mb-4">
                <label for="psw">စကားဝှက်</label>
                <input type="password" v-model="loginForm.password"
                  placeholder="စကားဝှက် ဖြည့်ပါ" class="form-control" />
                <div class="error text-danger" v-if="submitted && !$v.loginForm.password.required">
                  လျှို့ဝှက်နံပါတ် ဖြည့်ရန်လိုအပ်ပါသည်
                </div>
              </div>

              <div class="form-group col-lg-7 px-0 mb-4">
                <button type="submit" class="form-control-plaintext mb-3 text-white pyidaungsu-regular">
                  အကောင့်ဝင်ရန်
                </button>
                <div class="row mx-0 justify-content-between roboto">
                  <label for="forgot-psw?">
                    <router-link class="float-right"
                      :to="{ name: 'forgetPassword' }">စကားဝှက် မေ့နေလား?
                    </router-link>
                  </label>
                </div>
                <p class="roboto">အကောင့်မရှိသေးဘူးလား?</p>
                <p class="text-green">
                  <a :href="$router.resolve({ name: 'signupTeacher' }).href">ဆရာအကောင့် ပြုလုပ်ရန်</a>
                </p>
                <p class="text-green">
                  <a :href="$router.resolve({ name: 'signupStudent' }).href">ကျောင်းသားအကောင့် ပြုလုပ်ရန်</a>
                </p>
              </div>
              <!-- <hr class="boder-dashed roboto"> -->
              <!-- <div class="facebook">
                <p class="roboto-bold pb-3">Login using Facebook to get quick access</p>
                <a href="http://" target="_blank" class="facebook-link text-white">
                    <i class="fab fa-facebook-f"></i>
                    <span class="signin">Signin with facebook</span>
                </a>
              </div> -->
            </form>
            <div class="form-group col-lg-7 px-0 mb-4 facebook">
              <button type="button" class="button pyidaungsu-regular" v-on:click="AuthProvider('facebook')">
                <i class="fab fa-facebook-f"></i>
                FACEBOOK အကောင့်ဖြင့်ဝင်ရန်
              </button>
              <hr class="boder-dashed roboto" />
            </div>
          </div>
        </div>
      </div>
      <div class="alert-wrapper" v-if="showAlert">
        <div class="alert-box">
          <form>
            <div class="bg-title">
              <label class="title" for="teacher">သင်၏ Facebook အကောင့်နှင့်<br />အကောင့် ပြုလုပ်ထားခြင်းမရှိပါ</label>
            </div>
            <br />
            <input type="radio" value="2" class="alert-radio" v-model="type_radio" name="type_radio" />
            <label for="teacher">ဆရာ/မ အဖြစ် အကောင့် ပြုလုပ်ရန်</label>
            <br />
            <input type="radio" value="1" class="alert-radio" v-model="type_radio" name="type_radio" />
            <label for="student">ကျောင်းသား အဖြစ် အကောင့် ပြုလုပ်ရန်</label>
            <br />
            <button type="button" v-on:click="showAlert = false" class="btn btn-default alert-btn">ပယ်ဖျက်ရန်
            </button>
            <button type="submit" class="btn btn-success alert-btn" v-on:click="submitAlert()">အိုခေ
            </button>
          </form>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../services/login.js"></script>

<style src="../assets/css/login.css"></style>