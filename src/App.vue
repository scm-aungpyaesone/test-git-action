<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    }
  }
</script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-181420283-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-181420283-1');
</script>

<style>
@import './assets/css/bootstrap.min.css';
@import './assets/css/style.css';
@import './assets/css/fontawesome-free/css/all.min.css';
</style>
