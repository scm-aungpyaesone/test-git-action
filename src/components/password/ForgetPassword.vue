<template>
  <MainLayout>
    <section class="forgot-password py-4">
      <div class="container py-2 py-md-5 pb-lg-0">
        <div class="form-info col-lg-10">
          <h2 class="sub-head py-3 pb-lg-5 px-2 text-white text-center text-capitalize">
            <img src="@/assets/images/logo.png" alt="Create your account" />
            <span class="d-block pt-md-4 pb-lg-4 pt-sm-2 roboto">စကားဝှက် မေ့နေလား?</span>
          </h2>
          <div class="form-content col-lg-10 p-0 p-md-5">
            <form class="p-3" method="post" @submit.prevent="handleSubmit">
              <p class="pb-3">သင်၏အီးမေးလ် လိပ်စာကို ရိုက်ထည့်ပေးပါ။ စကားဝှက်အသစ်ပြုလုပ်ရန် ညွှန်ကြားချက်များကို ပို့ပေးပါမည်။</p>
              <div class="form-group col-lg-7 px-0 mb-md-4">
                <label for="email">အီးမေးလ်</label>
                <input class="form-control" type="email" v-model="email" placeholder="အီးမေးလ် ဖြည့်ပါ" />             
                <p class="error text-danger" v-if="submitted && !$v.email.required">အီးမေးလ် ဖြည့်ရန်လိုအပ်ပါသည်</p>
                <p class="error text-danger" v-if="submitted && !$v.email.email">အီးမေးလ်လိပ်စာ မှားနေပါသည်</p>
                <p class="error text-danger">{{ this.mail_msg }}</p>
              </div>
              <div class="form-group mb-0">
                <div class="col-lg-7 px-0">
                  <button class="form-control-plaintext text-white">စကားဝှက် အသစ်ပြုလုပ်ရန်</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/password/forget-password.js"></script>

<style src="../../assets/css/password/forget-password.css"></style>
