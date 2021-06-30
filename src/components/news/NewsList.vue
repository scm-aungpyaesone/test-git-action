<template>
  <MainLayout>
    <section class="py-4">
      <div class="container py-2 py-md-5">
        <div class="mb-3 d-flex justify-content-between">
          <h3 class="sub-title">သတင်းများ</h3>
          <p class="roboto">
            <span class="roboto-bold">အရေအတွက် - </span>
            {{ news.total }}
          </p>
        </div>

        <div class="search-sort d-flex justify-content-between bg-lightgrey mb-4 flex-wrap">
          <div class="search-box col-sm-6 col-md-7 col-lg-5 col-xl-4 p-0 mb-sm-0 mb-1">
            <div class="search-form relative">
              <input class="form-control" v-model="keyword"
                v-on:keyup="search" type="search"
                placeholder="ရှာဖွေရန်" />
              <button>
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div class="col-sm-5 col-md-4 col-lg-3 col-xl-2 p-0">
            <div class="sort relative">
              <select @change="onChange($event)" name="sortby" class="form-control custom-select" v-model="sortBy">
                <option value="">စီရန်</option>
                <option value="newly">နေ့စွဲ</option>
                <option value="alphabetical">အက္ခရာ</option>
              </select>
            </div>
          </div>
        </div>

        <div class="row">
          <div v-for="newsval in news.data" :key="newsval.news_id" :value="newsval.news_id" class="col-md-4 col-sm-6 mb-4">
            <router-link :to="{ name: 'newsDetail', params: {id:newsval.news_id}}">
              <div class="news-item shadow-01 roboto news-size">
                <h3 class="news-title">{{ newsval.news_title}}</h3>
                <p class="mb-1">{{ newsval.news_details | shorttext(100) }}...</p>
                <div>
                  <span class="date text-green mr-3">
                    <i class="far fa-calendar-alt"></i>
                    {{ newsval.publish_date | setMoment}}
                  </span>
                  <span class=" relative"><i class='fas dash-icon'>&#xf068;</i>  By Admin</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="roboto d-flex justify-content-between flex-wrap mt-4">
          <p class="view-item">စုစုပေါင်း {{ lastPage }} မျက်နှာရဲ့ {{ currentPage }} မျက်နှာမြောက်</p>   
          <!-- <Pagination :data="news" @pagination-change-page="onChange" v-if="pg_sortby == true">          
            <span slot="prev-nav">&lt; ရှေ့သို့</span>
            <span slot="next-nav">နောက်သို့ &gt;</span>
          </Pagination>         -->
          <!-- <Pagination :data="news" @pagination-change-page="search" v-if="pg_status == true && pg_sortby == false">
            <span slot="prev-nav">&lt; ရှေ့သို့</span>
            <span slot="next-nav">နောက်သို့ &gt;</span>
          </Pagination>
          <Pagination :data="news" @pagination-change-page="getNews" v-if="pg_status == false && pg_sortby == false">
            <span slot="prev-nav">&lt; ရှေ့သို့</span>
            <span slot="next-nav">နောက်သို့ &gt;</span>
          </Pagination> -->
          <advanced-laravel-vue-paginate 
            v-if="pg_sortby == true"
            :data = "news" 
            :onEachSide = "2" 
            :previousText = "'< ရှေ့သို့'" 
            :nextText = "'နောက်သို့ >'"
            @paginateTo = "onChange" />
          <advanced-laravel-vue-paginate 
            v-if="pg_status == true && pg_sortby == false"
            :data = "news" 
            :onEachSide = "2" 
            :previousText = "'< ရှေ့သို့'" 
            :nextText = "'နောက်သို့ >'"
            @paginateTo = "search" />
          <advanced-laravel-vue-paginate 
            v-if="pg_status == false && pg_sortby == false"
            :data = "news" 
            :onEachSide = "2" 
            :previousText = "'< ရှေ့သို့'" 
            :nextText = "'နောက်သို့ >'"
            @paginateTo = "getNews" />
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/news/news-list.js"></script>

<style src="../../assets/css/news/news-list.css"></style>