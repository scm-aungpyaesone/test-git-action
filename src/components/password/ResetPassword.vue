<template>
  <MainLayout>
    <section class="reset-password py-4">
      <div class="container py-2 py-md-5 pb-lg-0">
        <div class="form-info col-lg-10">
          <h2 class="sub-head py-3 pb-lg-5 px-2 text-white text-center text-capitalize">
            <img src="@/assets/images/logo.png" alt="Create your account" />
            <span class="d-block pt-md-4 pb-lg-4 pt-sm-2 roboto">စကားဝှက် အသစ်ပြုလုပ်ပါ</span>
          </h2>
          <div class="form-content col-lg-10 p-0 p-md-5">
            <form class="p-3" method="post" @submit.prevent="handleSubmit">
              <p class="pb-3">စကားဝှက်အဟောင်းကို ပြန်လည်သတ်မှတ်ရန် သင်၏စကားဝှက်အသစ်ကိုထည့်ပါ။</p>
              <div class="form-group mb-md-4">
                <div class="col-lg-7 px-0">
                  <input type="hidden" v-model="token" />
                  <label for="newPassword">စကားဝှက်အသစ်</label>
                  <input type="password" v-model="password" class="form-control" placeholder="စကားဝှက်အသစ် ဖြည့်ပါ" />
                  <p class="error text-danger" v-if="submitted && !$v.password.required">ဖြည့်ရန်လိုအပ်ပါသည်</p>
                  <p class="error text-danger" v-if="submitted && !$v.password.minLength">စကားဝှက်သည် အနည်းဆုံး ၈ လုံးရှိရပါမည်</p>
                  <p class="error text-danger" v-if="submitted && !$v.password.maxLength">စကားဝှက်သည် ၁၂ လုံးထက် မကျော်ရပါ</p>
                </div>
              </div>
              <div class="form-group mb-md-4">
                <div class="col-lg-7 px-0">
                  <label for="confirmNewPassword">စကားဝှက်အသစ် အတည်ပြုခြင်း</label>
                  <input type="password" v-model="repeat_password" class="form-control" placeholder="အတည်ပြုစကားဝှက် ဖြည့်ပါ" />
                  <p class="error text-danger" v-if="submitted && !$v.repeat_password.required">ဖြည့်ရန်လိုအပ်ပါသည်</p>
                  <p class="error text-danger" v-if="submitted && !$v.repeat_password.sameAsPassword">စကားဝှက် နှင့် တူရန်လိုအပ်ပါသည်</p>
                </div>
              </div>
              <div class="form-group mb-0">
                <div class="col-lg-7 px-0">
                  <button type="submit" class="form-control-plaintext text-white">စကားဝှက် အသစ်ပြုလုပ်ရန်</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/password/reset-password.js"></script>