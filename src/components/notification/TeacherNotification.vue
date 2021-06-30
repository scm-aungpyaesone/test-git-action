<template>
  <MainLayout>
    <section class="py-4">
      <div class="container py-2 py-md-5 roboto">
        <div class="mb-3 d-flex justify-content-between">
          <h3 class="sub-title noti-title">အသိပေးချက်များ</h3>
          <p class="roboto">
            <span class="roboto-bold">အရေအတွက် - </span>
            {{ noti.total }}
          </p>
        </div>
        <div class="row">
          <div class="col-sm-6 noti-list-col"
            v-for="notification in noti.data"
            :key="notification.notification_id">
            <template v-if="notification.sender == 2">
              <div class="noti-item px-3 py-4 shadow-01 roboto">
                <p>{{ notification.message }}</p>
                <span class="date text-green">
                  <i class="far fa-calendar-alt"></i>
                  {{ notification.send_date | setMoment }}
                </span>
                <span class=" relative"><i class='fas dash-icon'>&#xf068;</i>  By Student</span>
                <br />
                <button class="btn btn-success btn-sm mt-3 form-control col-md-8">
                  <router-link
                    :to="{ name: 'lookStudentProfile', params: { id: notification.student_id },}"
                    class="edit remove mr-2">
                    <a title="View" class="text-white view">
                      <i class="fas fa-info-circle mr-2"></i> ကျောင်းသား အချက်အလက်များ ကြည့်ရန်
                    </a>
                  </router-link>
                </button>
              </div>
            </template>
            <template v-else>
              <router-link :to="{ name: 'teacherNotificationDetail', params: { id: notification.notification_id }}">
                <div class="noti-item px-3 py-4 shadow-01 roboto noti-message">
                  <p>{{ notification.message | shorttext(120) }}...</p>
                  <span class="date text-green">
                    <i class="far fa-calendar-alt"></i>
                    {{ notification.send_date | setMoment }}
                  </span>
                  <span class=" relative"><i class='fas dash-icon'>&#xf068;</i>  By Admin</span>
                </div>
              </router-link>
            </template>
          </div>
        </div>
        <div class="roboto d-flex justify-content-between align-items-center flex-wrap mt-4">
          <p class="view-item">စုစုပေါင်း {{ lastPage }} မျက်နှာရဲ့ {{ currentPage }} မျက်နှာမြောက်</p>
          <!-- <Pagination :data="noti" @pagination-change-page="getNotificationList">
            <span slot="prev-nav">&lt; ရှေ့သို့</span>
            <span slot="next-nav">နောက်သို့ &gt;</span>
          </Pagination> -->
          <advanced-laravel-vue-paginate 
            :data = "noti" 
            :onEachSide = "2" 
            :previousText = "'< ရှေ့သို့'" 
            :nextText = "'နောက်သို့ >'"
            @paginateTo = "getNotificationList" />
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/notification/teacher-notification.js"></script>

<style src="../../assets/css/notification/teacher-notification.css"></style>