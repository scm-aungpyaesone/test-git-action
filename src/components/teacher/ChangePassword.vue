<template>
  <MainLayout>
    <section class="manage-class py-5 profile-page-content">
      <div class="container pb-2 pb-md-4">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ဆရာအကောင့်ဆက်တင်
          <span>စကားဝှက် ပြောင်းခြင်း</span>
        </h2>
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
                <a :href="$router.resolve({name: 'createClass'}).href">တန်းခွဲ အသစ်ထည့်ရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'manageClass'}).href">တန်းခွဲ စီမံရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'manageStudent'}).href">ကျောင်းသား စီမံခန့်ခွဲရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({name: 'changeTeacherPassword'}).href"
                  class="active">စကားဝှက်ပြောင်းရန်</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-9 col-md-8">
            <div class="profile-page-main">
              <form class="form-content py-4 px-0 px-sm-3" @submit.prevent="handleSubmit">
                <p class="px-3 pb-3">လက်ရှိစကားဝှက်ကိုပြောင်းလဲရန် သင်၏ စကားဝှက်အသစ် ကိုရိုက်ထည့်ပါ။</p>
                <div class="form-group col-12 mb-md-4">
                  <label for="currentPassword">လက်ရှိစကားဝှက်</label>
                  <input type="password" class="form-control" v-model="teacher.current_password"
                    placeholder="လက်ရှိစကားဝှက် ဖြည့်ပါ" />
                  <div class="error text-danger"
                    v-if="submitted && !$v.teacher.current_password.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger"
                    v-if="submitted && !$v.teacher.current_password.minLength">လက်ရှိစကားဝှက် စာလုံးအရေအတွက်သည် ၈ လုံး အောက်မငယ်ရပါ</div>
                  <div
                    class="error text-danger"
                    v-if="submitted && !$v.teacher.current_password.maxLength"
                  >လက်ရှိစကားဝှက် စာလုံးအရေအတွက်သည် ၁၂ လုံး ထက်မကြီးရပါ</div>
                </div>
                <div class="form-group col-12 mb-md-4">
                  <label for="ConfirmNewPassword">စကားဝှက်အသစ် အတည်ပြုခြင်း</label>
                  <input type="password" class="form-control" v-model="teacher.new_password"
                    placeholder="စကားဝှက်အသစ် ဖြည့်ပါ" />
                  <div class="error text-danger"
                    v-if="submitted && !$v.teacher.new_password.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger"
                    v-if="submitted && !$v.teacher.new_password.minLength">စကားဝှက်အသစ် စာလုံးအရေအတွက်သည် ၈ လုံး အောက်မငယ်ရပါ</div>
                  <div class="error text-danger"
                    v-if="submitted && !$v.teacher.new_password.maxLength">စကားဝှက်အသစ် စာလုံးအရေအတွက်သည် ၁၂ လုံး ထက်မကြီးရပါ</div>
                </div>
                <div class="form-group col-12 mb-md-4">
                  <label for="ConfirmNewPassword">စကားဝှက်အသစ် အတည်ပြုရန်</label>
                  <input type="password" class="form-control" v-model="teacher.confirm_new_password"
                    placeholder="အတည်ပြုစကားဝှက်အသစ် ဖြည့်ပါ" />
                  <div class="error text-danger"
                    v-if="submitted && !$v.teacher.confirm_new_password.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger"
                    v-if="submitted && !$v.teacher.confirm_new_password.sameAsPassword">စကားဝှက်အသစ် နှင့် တူရန်လိုအပ်ပါသည်</div>
                </div>
                <div class="form-group col-lg-6 mb-0">
                  <button type="submit" class="btn text-green prepare-btn">ပြင်ဆင်ရန်</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/teacher/change-password.js"></script>