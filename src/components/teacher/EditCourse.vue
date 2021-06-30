<template>
  <MainLayout>
    <section class="py-4 profile-page-content add-new-class">
      <div class="container py-2 py-md-5 roboto">
        <h2 class="setting-title px-4 py-3 pyidaungsu-regular text-white">
          ဆရာအကောင့်ဆက်တင်
          <span>သင်ခန်းစာများ စီမံရန်</span>
        </h2>
        <div class="profile-page-block">
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
                  <a :href="$router.resolve({name: 'manageCourse'}).href" class="active">သင်တန်း စီမံရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'createClass'}).href">တန်းခွဲ အသစ်ထည့်ရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'manageClass'}).href">တန်းခွဲ စီမံရန်</a>
                </li>
                <li>
                  <a :href="$router.resolve({name: 'manageStudent'}).href">ကျောင်းသားစီမံခန့်ခွဲရန်</a>
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
                    <select @change="onChange($event)" name="category_name" v-model="updateCourseForm.category_id" class="form-control custom-select">
                      <option value>အမျိုးအစား ရွေးပါ</option>
                      <option v-for="(value, index) in category" :key="index" :value="value.category_id" :selected="value == updateCourseForm.category_id">
                        {{ value.category_name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-12 mb-md-4">
                    <label for="class-fees">သင်တန်း ခေါင်းစဉ်</label>
                    <input type="text" v-model="updateCourseForm.course_title"
                      class="form-control" placeholder="သင်တန်းခေါင်းစဉ် ဖြည့်ပါ" />
                    <div class="error text-danger" v-if="submitted && !$v.updateCourseForm.course_title.required">
                      ဖြည့်ရန်လိုအပ်ပါသည်
                    </div>
                    <div class="error text-danger" v-if="submitted && !$v.updateCourseForm.course_title.maxLength">
                      သင်တန်း ခေါင်းစဉ်သည် စာလုံးရေ ၁၀၀ ထက်မကျော်ရပါ
                    </div>
                  </div>
                  <div class="form-group col-12 mb-md-4">
                    <label for="class-fees">သင်တန်း ရှင်းပြချက်</label>
                    <textarea rows="5" cols="5" v-model="updateCourseForm.course_explanation" class="editor"
                      placeholder="သင်တန်းရှင်းပြချက် ဖြည့်ပါ"></textarea>
                    <div class="error text-danger" v-if="submitted && !$v.updateCourseForm.course_explanation.required">
                      ဖြည့်ရန်လိုအပ်ပါသည်
                    </div>
                    <div class="error text-danger" v-if="submitted && !$v.updateCourseForm.course_explanation.maxLength">
                      သင်တန်း ရှင်းပြချက်သည် စာလုံးရေ ၁၀၀၀ ထက်မကျော်ရပါ
                    </div>
                  </div>
                  <div class="form-group col-12 mb-md-4">
                    <label for="class-fees">သင်တန်း အသေးစိတ်</label>
                    <ckeditor :editor="editor" v-model="updateCourseForm.course_details"
                      :config="editorConfig">
                    </ckeditor>
                    <div class="error text-danger" v-if="submitted && !$v.updateCourseForm.course_details.required">
                      ဖြည့်ရန်လိုအပ်ပါသည်
                    </div>
                    <div class="error text-danger" v-if="submitted && !$v.updateCourseForm.course_details.maxLength">
                      သင်တန်း အသေးစိတ်သည် စာလုံးရေ ၅၀၀၀ ထက်မကျော်ရပါ
                    </div>
                  </div>
                  <div class="form-group col-12 mb-md-4">
                    <label for="certificate">သင်တန်းဆင်းလက်မှတ် / ဒီပလိုမာ</label>
                    <div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input type="radio" class="form-check-input" 
                            v-model="updateCourseForm.certificate" value="1" />ပေးမယ်
                        </label>
                      </div>
                      <div class="form-check-inline">
                        <label class="form-check-label">
                          <input type="radio" class="form-check-input"
                            v-model="updateCourseForm.certificate" value="0" />မပေးဘူး
                        </label>
                      </div>
                      <div class="error text-danger" v-if="submitted && !$v.updateCourseForm.certificate.required">
                        ဖြည့်ရန်လိုအပ်ပါသည်
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-lg-6 mb-0 pyidaungsu-regular">
                    <button type="submit" class="btn text-green save-btn">သိမ်းဆည်းရန်</button>
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

<script src="../../services/teacher/edit-course.js"></script>
    