<template>
  <div class="newsDetailPage">
    <div class="header">
      <a @click="goBack()" class="btnGoBack btn lf1">返回</a>
    </div>
    <div class="content">
    </div>
  </div>
</template>

<script>
export default {
  name: 'newsDetailPage',
  created(){
    console.log(this.$route.query.url);
  },
  data() {
    return {
    };
  },
  methods:{
    goBack(){
      this.$store.commit("setTransition", "turn-off");
      this.$router.back(-1);
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.newsDetailPage{
  position: relative;
  height: 100vh;
  background: #666;
}
</style>
