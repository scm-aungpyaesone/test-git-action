<template>
  <MainLayout>
    <section class="signup-teacher py-4">
      <div class="container pt-lg-5 pt-sm-1 pb-lg-0 pb-2">
        <div class="form-info col-lg-10">
          <h2 class="sub-head py-3 pb-lg-5 px-2 text-white text-center text-capitalize">
            <img src="@/assets/images/login-logo.png" alt="Create your account">
            <span class="d-block pt-md-4 pb-lg-4 pt-sm-2  roboto">စည်းကမ်းချက်နှင့်သတ်မှတ်ချက်များ</span>
          </h2>
          <div class="form-content col-lg-10 p-0 p-md-5">
            <form method="post" @submit.prevent="submit" class="p-3">
              <span class="relative">
                ၁။ သင်တန်းကျောင်းများနှင့် မသက်ဆိုင်သော အကြောင်းအရာများတင်ပါက Admin Team ဘက်မှ ပယ်ဖျက်၍ Warning ပေးပါမည်။
                <br>
                ၂။ Warning ၃ခါနှင့်အထက် ကျော်ပါက အကောင့်ပယ်ဖျက်နိုင်ပါသည်။
                <br>
                ၃။ ကျောင်း(သို့)ဆရာများက အခမဲ့ သင်ကြားနိုင်သလို၊ အခကြေးငွေယူ၍လည်း သင်ကြားနိုင်ပါသည်။
                <br>
                ၄။ သင်တန်းကြေးကို ကျောင်းသားမှ ကျောင်း(သို့)ဆရာများသို့ တိုက်ရိုက်ဆက်သွယ်၍ ပေးဆောင်နိုင်ပါသည်။
                <br>
                ၅။ သင်တန်းကြေးနှင့် ပတ်သက်သည့် ဖြစ်ပေါ်လာသော ကိစ္စအဝဝကို Admin Team ဘက်မှ တာဝန်မယူပါ။
                <br>
                ၆။ တင်ထားသော Courses များနှင့်ပတ်သက်၍ အကြောင်းတစ်စုံတစ်ခု ပြဿနာဖြစ်ပါက Admin team ရဲ့ ဆုံးဖြတ်ချက်အမှန်သာဖြစ်ပါသည်။
                <br>
                ၇။ ကျောင်း(သို့)ဆရာနှင့် ကျောင်းသားများအကြား ဖြစ်လာသည့် ပြဿနာများကို တာဝန်မယူပါ။
              </span><br><br>
              <div class="form-group mb-0 pyidaungsu-regular">
                <div class="mb-3 mb-sm-4"><input type="checkbox" v-bind:value="seen" v-on:input="seen = $event.target.checked" class="mr-2" name="agree"><a target="_blank" class="ml-2">စည်းကမ်းချက်နှင့်သတ်မှတ်ချက်များ </a><span>ကိုသဘောတူညီပါသည်။</span></div>
                <div class="col-lg-7 mb-3 mb-sm-4 px-0">
                  <button type="submit" v-bind:disabled="isDisabled" :class="{ 'disable':!seen }" class="form-control-plaintext text-white">လက်ခံရန်</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/agreement-teacher.js"></script>

<style src="../../assets/css/teacher/signup-teacher.css"></style>
