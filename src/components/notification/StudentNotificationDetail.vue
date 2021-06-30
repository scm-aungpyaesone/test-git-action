<template>
  <MainLayout>
    <section class="py-4">
      <div class="container pt-sm-1 pb-lg-0 pb-2">
        <div class="form-content p-md-5">
          <h3 class="sub-title noti-detail">အသိပေးချက် အသေးစိတ်အချက်အလက်များ</h3>
        </div>
        <div class="noti-detail-page">
          <div class="roboto mb-4 mb-md-0">
            <div class="noti-item px-3 py-4 shadow-01 roboto">
              <div class="mb-2">
                <span class="date text-green">
                  <i class="far fa-calendar-alt"></i>
                  {{ notification.send_date | setMoment }}
                </span>
                <span class="float-right relative"><i class='fas dash-icon'>&#xf068;</i> By Admin</span>
              </div>
              <p>{{ notification.message }}</p>
            <br />
            </div>
            <div class="noti-detail-btn">
              <button class="btn btn-secondary text-white">
                <router-link exact class="noti-btn" :to="{ name: 'studentNotification' }">နောက်သို့</router-link>             
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script src="../../services/notification/student-notification-detail.js"></script>

<style src="../../assets/css/notification/student-notification-detail.css"></style>