<template>
  <div class="fbDetailHomePage page">
    <div class="header">
      <goBack class="lf1 btn"></goBack>
      <div class="title">
        <p class="league">中超</p>
        <p class="time">时间</p>
      </div>
    </div>
    <div class="content">
      <div class="mMatchDetailInfo">
        <div class="infoBox">
          <div class="teamInfo">
            <div class="imgBox">
              <img src="../../../../../assets/img/test.jpg" alt="">
            </div>
            <p class="name">大德</p>
          </div>
          <div class="scoreBox">
            <span class="status">已完场</span>
            <div class="score">
              6 <span class="line"></span> 6
            </div>
            <span class="scoreBan">1:1</span>
          </div>
          <div class="teamInfo right">
            <div class="imgBox">
              <img src="../../../../../assets/img/test.jpg" alt="">
            </div>
            <p class="name">大德</p>
          </div>
        </div>
        <div class="tabBox">
          <div class="item" v-for="(item,index) in 7">大德</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goBack from '../../../../common/goBack'
export default {
  name: 'fbDetailHomePage',
  created(){

  },
  components:{
    goBack
  },
  data() {
    return {
    };
  },
  methods: {
    screen(){

    }
  }
}
</script>

<style>
</style>
