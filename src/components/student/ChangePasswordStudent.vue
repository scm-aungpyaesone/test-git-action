<template>
  <MainLayout>
    <section class="student-request-course py-5 profile-page-content">
      <div class="container pb-2 pb-md-4">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ကျောင်းသားအကောင့်ဆက်တင်
          <span>စကားဝှက် ပြောင်းခြင်း</span>
        </h2>
        <div class="student-request-course-content student-page-block">
          <div class="row">
            <div class="col-lg-3 col-md-4 aside">
              <ul class="profile-list">
                <li>
                  <a :href="$router.resolve({ name: 'detailStudent' }).href">ကျောင်းသားအချက်အလက်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'enrollStudentList'}).href">တန်းခွဲများ</a>
                </li>
                <li>
                  <a :href="$router.resolve({ name: 'courseRequest' }).href">သင်တန်း တောင်းဆိုရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'changePasswordStudent'}).href" class="active">စကားဝှက် ပြောင်းရန်</a>
                </li>
              </ul>
            </div>
            <div class="col-lg-9 col-md-8">
              <div class="profile-page-main">
                <form class="form-content py-4 px-0 px-sm-3" @submit.prevent="handleSubmit">
                  <p class="px-3 pb-3">လက်ရှိစကားဝှက်ကိုပြောင်းလဲရန် သင်၏ စကားဝှက်အသစ် ကိုရိုက်ထည့်ပါ။</p>
                  <div class="form-group col-12 mb-md-4">
                    <label for="currentPassword">လက်ရှိစကားဝှက်</label>
                    <input type="password" class="form-control" v-model="student.current_password" placeholder="လက်ရှိစကားဝှက် ဖြည့်ပါ" />
                    <div class="error text-danger" v-if="submitted && !$v.student.current_password.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                    <div class="error text-danger" v-if="submitted && !$v.student.current_password.minLength">လက်ရှိစကားဝှက် စာလုံးအရေအတွက်သည် ၈ လုံး အောက်မငယ်ရပါ</div>
                    <div class="error text-danger" v-if="submitted && !$v.student.current_password.maxLength">လက်ရှိစကားဝှက် စာလုံးအရေအတွက်သည် ၁၂ လုံး ထက်မကြီးရပါ</div>
                  </div>
                  <div class="form-group col-12 mb-md-4">
                    <label for="newPassword">စကားဝှက်အသစ်</label>
                    <input type="password" class="form-control"
                      v-model="student.new_password"
                      placeholder="စကားဝှက်အသစ် ဖြည့်ပါ" />
                    <div class="error text-danger"
                      v-if="submitted && !$v.student.new_password.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                    <div class="error text-danger"
                      v-if="submitted && !$v.student.new_password.minLength">စကားဝှက်အသစ် စာလုံးအရေအတွက်သည် ၈ လုံး အောက်မငယ်ရပါ</div>
                    <div class="error text-danger"
                      v-if="submitted && !$v.student.new_password.maxLength">စကားဝှက်အသစ် စာလုံးအရေအတွက်သည် ၁၂ လုံး ထက်မကြီးရပါ</div>
                  </div>
                  <div class="form-group col-12 mb-md-4">
                    <label for="ConfirmNewPassword">စကားဝှက်အသစ် အတည်ပြုခြင်း</label>
                    <input type="password" class="form-control"
                      v-model="student.confirm_new_password"
                      placeholder="အတည်ပြုစကားဝှက် ဖြည့်ပါ" />
                    <div class="error text-danger"
                      v-if="submitted && !$v.student.confirm_new_password.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                    <div class="error text-danger"
                      v-if="submitted && !$v.student.confirm_new_password.sameAsPassword">စကားဝှက်အသစ် နှင့် တူရန်လိုအပ်ပါသည်</div>
                  </div>
                  <div class="form-group col-lg-6 mb-0 submit-box">
                    <button type="submit" class="btn text-green prepare-btn">ပြင်ဆင်ရန်</button>
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

<script src="../../services/student/change-password-student.js"></script>
