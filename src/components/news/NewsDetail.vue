<template>
  <MainLayout>
    <section class="py-4 news-detail">
      <div class="container py-2 py-md-5">
        <div class="row">
          <div class="col-lg-3 col-md-4 aside">
            <div class="filter mb-4 p-4 news-scroll">
              <p class="pyidaungsu-bold aside-title">သတင်းများ</p>
              <ul>
                <li class="py-2" v-for="news in newsList" :key="news.news_id" :value="news.news_id">
                  <a :href="$router.resolve({name: 'newsDetail', params: {id:news.news_id}}).href" class="d-block">{{ news.news_title}}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-9 col-md-8 roboto mb-4 mb-md-0">
            <h2 class="title text-green mb-3">{{ news.news_title }}</h2>
            <div class="news-item bg-white p-3">
              <div class="mb-2">
                <span class="date text-green"><i class="far fa-calendar-alt"></i>{{ news.publish_date | setMoment }}</span>
                <span class="float-right relative"><i class='fas dash-icon'>&#xf068;</i> By Admin</span>
              </div>
              <p class="mb-4">{{ news.news_details }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/news/news-detail.js"></script>
