<template>
  <MainLayout>
    <section class="py-4 news-detail">
      <div class="container py-2 py-md-5">
        <div class="row">
          <div class="col-lg-3 col-md-4 aside">
            <div class="filter mb-4 p-4 news-scroll">
              <p class="pyidaungsu-bold aside-title">သင်တန်းသစ်တောင်းဆိုမှုများ</p>
              <ul>
                <li class="py-2" v-for="course_requests in courseRequestList" :key="course_requests.course_request_id" :value="course_requests.course_request_id">
                  <a :href="$router.resolve({name: 'courseRequestDetail', params: {id:course_requests.course_request_id}}).href" class="d-block">{{ course_requests.course_request_title}}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-9 col-md-8 roboto mb-4 mb-md-0">
            <h2 class="title text-green mb-3">{{ course_requests.course_request_title }}</h2>
            <div class="news-item rq-item bg-white p-3">
              <div class="mb-2">
                <span class="date text-green"><i class="far fa-calendar-alt"></i>{{ course_requests.start_time | setMoment }}</span>
                <span class="float-right relative"><i class='fas dash-icon'>&#xf068;</i> By {{ course_requests.name }}</span>
              </div>
              <p class="mb-4">{{ course_requests.course_request_details }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/student/course-request-detail.js"></script>
