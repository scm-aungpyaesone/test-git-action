<template>
  <MainLayout>
    <section class="student-request-course py-5 profile-page-content">
      <div class="container pb-2 pb-md-4">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ကျောင်းသားအကောင့်ဆက်တင်
          <span>သင်တန်း တောင်းဆိုခြင်း</span>
        </h2>
        <div class="row">
          <div class="col-lg-3 col-md-4 aside">
            <ul class="profile-list">
              <li>
                <a :href="$router.resolve({ name: 'detailStudent' }).href">ကျောင်းသားအချက်အလက်</a>
              </li>
              <li>
                <a :href="$router.resolve({ name: 'enrollStudentList' }).href">တန်းခွဲများ</a>
              </li>
              <li>
                <a class="active" :href="$router.resolve({ name: 'courseRequest' }).href">သင်တန်း တောင်းဆိုရန်</a>
              </li>
              <li>
                <a :href="$router.resolve({ name: 'changePasswordStudent' }).href">စကားဝှက် ပြောင်းရန်</a>
              </li>
            </ul>
          </div>
          <div class="col-lg-9 col-md-8">
            <div class="profile-page-main">
              <form method="post" @submit.prevent="submit" class="form-content py-4 px-0 px-sm-3">
                <div class="form-group col-12 mb-md-4">
                  <label for="coursetitle">သင်တန်းခေါင်းစဉ်</label>
                  <input type="text" name="course_request_title" placeholder="သင်တန်းခေါင်းစဉ် ဖြည့်ပါ"
                    class="form-control" v-model="courseRequestForm.course_request_title" />
                  <div class="error text-danger"
                    v-if="submitted && !$v.courseRequestForm.course_request_title.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger"
                    v-if="submitted && !$v.courseRequestForm.course_request_title.maxLength">သင်တန်း ခေါင်းစဉ်သည် စာလုံးရေ ၁၀၀ ထက်မကျော်ရပါ</div>
                </div>

                <div class="form-group col-12 mb-md-4">
                  <label for="coursedetail">တောင်းဆိုချင်သော အကြောင်းအရာများ</label>
                  <textarea rows="5" class="editor" name="course_request_details"
                    placeholder="တောင်းဆိုလိုသော အကြောင်းအရာ ဖြည့်ပါ" v-model="courseRequestForm.course_request_details"></textarea>
                  <div class="error text-danger"
                    v-if=" submitted && !$v.courseRequestForm.course_request_details.required">ဖြည့်ရန်လိုအပ်ပါသည်</div>
                  <div class="error text-danger"
                    v-if="submitted && !$v.courseRequestForm.course_request_details.maxLength">တောင်းဆိုချင်သော အကြောင်းအရာများသည် စာလုံးရေ ၁၀၀၀ ထက်မကျော်ရပါ</div>
                </div>

                <div class="form-group col-lg-6 mb-0 submit-box">
                  <button title="သိမ်းဆည်းရန်" class="btn text-green save-btn" type="submit">သိမ်းဆည်းရန်</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/student/course-request.js"></script>
