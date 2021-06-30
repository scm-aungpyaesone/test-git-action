
<template>
  <div class="main-layout">
    <Header />
      <!-- inner-banner -->
      <!-- <div class="inner-banner d-flex align-items-center">
          <div class="container">
              <p class="text-white text-center">အကောင်းဆုံး ပညာရှာဖွေရာနေရာ</p>
          </div>
      </div> -->
      <!-- inner-banner -->
    <slot />
    <Footer />
    <div class="copy text-white">
      <div class="container py-2 roboto">
        <p>Copyright 2020 BIB Co., Ltd</p>
        <!-- <p>POWERED BY <a href="http://bib.com.mm/" target="_blank" title="BIB Co., Ltd">BIB</a></p> -->
      </div>
    </div>
  </div>
</template>

<script src="../../services/layout/main-layout.js"></script>
