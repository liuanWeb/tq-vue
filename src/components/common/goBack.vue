<template>
  <div class="goBack">
    <a @click="goBack(url,query)" class="btnGoBack"></a>
  </div>
</template>

<script>
export default {
  name: 'goBack',
  props:['url','query'],
  created(){

  },
  data() {
    return {
    };
  },
  methods: {
    goBack(url,query){
      this.$store.commit("setTransition", "turn-off");
      if(url){
        this.$router.push({path:url,query:query});
      }else{

        this.$router.back(-1);
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .goBack{
    width: 44px;
    height: 44px;
    .btnGoBack{
      display: block;
      width: 100%;
      height: 100%;
      background: url("../../assets/img/iconGoBack.png") no-repeat center;
      -webkit-background-size: 44px auto;
      background-size: 44px auto;
    }
  }
</style>
