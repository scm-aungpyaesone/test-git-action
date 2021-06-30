<template>
  <MainLayout>
    <section class="py-5 profile-page-content add-new-course">
      <div class="container pb-2 pb-md-4">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ဆရာအကောင့်ဆက်တင်
          <span>သင်တန်း အသစ်ထည့်ခြင်း</span>
        </h2>
        <div class="profile-page-block">
          <div class="row">
            <div class="col-lg-3 col-md-4 aside">
              <ul class="profile-list">
                <li>
                  <a :href="$router.resolve({name: 'detailTeacher'}).href">ဆရာ အချက်အလက်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'createCourse'}).href" class="active">သင်တန်း အသစ်ထည့်ရန်</a>
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
                <form method="post" @submit.prevent="submit" class="form-content py-4 px-0 px-sm-3">
                  <div class="form-group col-12 mb-md-4">
                    <label for="course-title">သင်တန်း အမျိုးအစား</label>
                    <select @change="onChange($event)" name="category_name" class="form-control custom-select">
                      <option selected>အမျိုးအစား ရွေးပါ</option>
                      <option v-for="(value, index) in category" :key="index" :value="value.category_id">
                        {{ value.category_name }}
                      </option>
                    </select>
                    <div class="error text-danger"
                      v-if="submitted && !$v.courseRequestForm.category_name.required">
                      ဖြည့်ရန်လိုအပ်ပါသည်
                    </div>
                  </div>

                  <div class="form-group col-12 mb-md-4">
                    <label for="course-title">သင်တန်း ခေါင်းစဉ်</label>
                    <input type="text"
                      v-model="courseRequestForm.course_title"
                      class="form-control" placeholder="သင်တန်းခေါင်းစဉ် ဖြည့်ပါ" />
                    <div class="error text-danger"
                      v-if="submitted && !$v.courseRequestForm.course_title.required">
                      ဖြည့်ရန်လိုအပ်ပါသည်
                    </div>
                    <div class="error text-danger"
                      v-if="submitted && !$v.courseRequestForm.course_title.maxLength">
                      သင်တန်း ခေါင်းစဉ်သည် စာလုံးရေ ၁၀၀ ထက်မကျော်ရပါ
                    </div>
                  </div>

                  <div class="form-group col-12 mb-md-4">
                    <label for="course-explanation">သင်တန်း ရှင်းပြချက်</label>
                    <textarea type="text" v-model="courseRequestForm.course_explanation"
                      class="editor" rows="5" cols="5" placeholder="သင်တန်းရှင်းပြချက် ဖြည့်ပါ">
                    </textarea>
                    <div class="error text-danger"
                      v-if="submitted && !$v.courseRequestForm.course_explanation.required">
                      ဖြည့်ရန်လိုအပ်ပါသည်
                    </div>
                    <div class="error text-danger"
                      v-if="submitted && !$v.courseRequestForm.course_explanation.maxLength">
                      သင်တန်း ရှင်းပြချက်သည် စာလုံးရေ ၁၀၀၀ ထက်မကျော်ရပါ
                    </div>
                  </div>

                  <div class="form-group col-md-12 mb-md-4">
                    <label for="course-details">သင်တန်း အသေးစိတ်</label>
                    <ckeditor :editor="editor" v-model="courseRequestForm.course_details"
                      :config="editorConfig"></ckeditor>
                    <div class="error text-danger"
                      v-if="submitted && !$v.courseRequestForm.course_details.required">
                      ဖြည့်ရန်လိုအပ်ပါသည်</div>
                    <div class="error text-danger"
                      v-if="submitted && !$v.courseRequestForm.course_details.maxLength">
                      သင်တန်း အသေးစိတ်သည် စာလုံးရေ ၅၀၀၀ ထက်မကျော်ရပါ</div>
                  </div>

                  <div class="form-group col-12 mb-md-4">
                    <label for="certificate">သင်တန်းဆင်းလက်မှတ် / ဒီပလိုမာ</label>
                    <div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input type="radio" class="form-check-input"
                            v-model="courseRequestForm.certificate" value="1" />ပေးမယ်
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input type="radio" class="form-check-input"
                            v-model="courseRequestForm.certificate" value="0" />မပေးဘူး
                        </label>
                      </div>
                      <div class="error text-danger" v-if="submitted && !$v.courseRequestForm.certificate.required">
                        ဖြည့်ရန်လိုအပ်ပါသည်
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-lg-6 mb-0 pyidaungsu-regular">
                    <button class="btn text-green save-btn" type="submit">သိမ်းဆည်းရန်</button>
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

<script src="../../services/teacher/create-course.js"></script>

<style src="../../assets/css/teacher/create-course.css"></style>

