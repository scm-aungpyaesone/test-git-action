<template>
  <footer class="py-5 text-white">
    <div class="container py-4">
      <div class="row">
        <div class="col-lg-4 col-sm-7 mb-4 mb-lg-0">
          <p class="mb-3 footer-title pyidaungsu-bold">အခြားအချက်အလက်များ</p>
          <ul class="footer-info">
            <li class="d-flex align-items-center mb-3"><i class="fas fa-caret-square-right"></i><a title="ဝဘ်ဆိုက်အကြောင်း" :href="$router.resolve({name: 'aboutUs'}).href" class="text-white">ဝဘ်ဆိုက်အကြောင်း</a></li>
            <li class="d-flex align-items-center mb-3"><i class="fas fa-caret-square-right"></i><a title="စည်းကမ်းချက်များ" :href="$router.resolve({name: 'termsOfService'}).href" class="text-white">စည်းကမ်းချက်များ</a></li>
            <!-- <li class="d-flex align-items-center"><i class="fas fa-caret-square-right"></i><a title="မူဝါဒ ပေါ်လစီများ" :href="$router.resolve({name: 'privacyPolicy'}).href"  class="text-white">မူဝါဒ ပေါ်လစီများ</a></li> -->
          </ul>
        </div>
        <div class="col-lg-4 col-sm-5 mb-4 mb-lg-0">
          <ul class="footer-link">
            <li class="mb-2">
              <i class="fas fa-chevron-circle-right"></i><a :href="$router.resolve({name: 'teacherList'}).href" class="text-white footer-title">ဆရာများ</a>
            </li>
            <li class="mb-2">
              <i class="fas fa-chevron-circle-right"></i><a :href="$router.resolve({name: 'courseList'}).href" class="text-white footer-title">သင်တန်းများ</a>
            </li>
            <li class="mb-2">
              <i class="fas fa-chevron-circle-right"></i><a :href="$router.resolve({name: 'classList'}).href" class="text-white footer-title">တန်းခွဲများ</a>
            </li>
            <li class="mb-2">
              <i class="fas fa-chevron-circle-right"></i><a :href="$router.resolve({name: 'courseRequestList'}).href" class="text-white footer-title">သင်တန်းသစ်တောင်းဆိုမှုများ</a>
            </li>
            <li>
              <i class="fas fa-chevron-circle-right"></i><a :href="$router.resolve({name: 'newsList'}).href" class="text-white footer-title">သတင်းများ</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-4 mb-4 mb-lg-0">
          <p class="mb-3 footer-title pyidaungsu-bold">အခမဲ့ app ရယူရန်</p>
          <a href="https://play.google.com/store/apps/details?id=com.bib.kyaung" target="_blank">
            <img src="@/assets/images/google-play.png" alt="Google Play Badge" style="max-width: 50%; height: auto;">
          </a><br><br>
          <a href="https://appgallery.huawei.com/#/app/C103325683" target="_blank">
            <img src="@/assets/images/app-gallery.png" alt="AppGallery Badge" style="max-width: 50%; height: auto;">
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>