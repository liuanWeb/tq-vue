<template>
  <div class="tabs">
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="footer">
      <router-link class="link home" to="/homePage" @click.native="clickLink">购彩</router-link>
      <router-link class="link match" to="/matchPage" @click.native="clickLink">比分</router-link>
      <router-link class="link follow" to="/C" @click.native="clickLink">跟单</router-link>
      <router-link class="link news" to="/D" @click.native="clickLink">资讯</router-link>
      <router-link class="link user" to="/D" @click.native="clickLink">我的</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tabs',
    created(){

    },
    data () {
      return {

      }
    },
    methods: {
      clickLink() {
        this.$store.commit("setTransition", "turn-on");
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss" scoped>
  $url:'../../assets/img/footer/';
  .footer{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    background:#fff;
    .link{
      flex: 1;
      text-align: center;
      border-top: #eaeaea solid 1px;
      box-sizing:border-box;
      padding-top:30px;
      line-heigth:30px;
      &.router-link-active{
        color: #cc2426;
      }
      &.home{
         background: url($url + "iconHome.png") no-repeat center 5px;
         -webkit-background-size: 20px 20px;
         background-size: 20px 20px;
        &.router-link-active{
          background: url($url + "iconHomeCur.png") no-repeat center 5px;
          -webkit-background-size: 20px 20px;
          background-size: 20px 20px;
        }
      }
      &.match{
        background: url($url + "iconMatch.png") no-repeat center 5px;
        -webkit-background-size: 20px 20px;
        background-size: 20px 20px;
        &.router-link-active{
          background: url($url + "iconMatchCur.png") no-repeat center 5px;
          -webkit-background-size: 20px 20px;
          background-size: 20px 20px;
        }
      }
      &.follow{
        background: url($url + "iconFollow.png") no-repeat center 5px;
        -webkit-background-size: 20px 20px;
        background-size: 20px 20px;
        &.router-link-active{
          background: url($url + "iconFollowCur.png") no-repeat center 5px;
          -webkit-background-size: 20px 20px;
          background-size: 20px 20px;
        }
      }
      &.news{
        background: url($url + "iconNews.png") no-repeat center 5px;
        -webkit-background-size: 20px 20px;
        background-size: 20px 20px;
        &.router-link-active{
          background: url($url + "iconNewsCur.png") no-repeat center 5px;
          -webkit-background-size: 20px 20px;
          background-size: 20px 20px;
        }
      }
      &.user{
        background: url($url + "iconUser.png") no-repeat center 5px;
        -webkit-background-size: 20px 20px;
        background-size: 20px 20px;
        &.router-link-active{
          background: url($url + "iconUserCur.png") no-repeat center 5px;
          -webkit-background-size: 20px 20px;
          background-size: 20px 20px;
        }
      }
    }
  }
</style>
