<template>

  <div class="basketBallMatchPage">
    <a title="筛选" class="btn rg1 mIconScreen"></a>
    <div class="mListHead">
      <div class="typeList">
        <div class="item cur">全部</div>
        <div class="item">竞彩</div>
      </div>
      <div class="timeList">
        <div class="list">
          <div class="item cur">
            <p class="week">星期二</p>
            <p>05/14</p>
          </div>
          <div class="item">
            <p class="week">星期二</p>
            <p>05/14</p>
          </div>
          <div class="item">
            <p class="week">星期二</p>
            <p>05/14</p>
          </div>
          <div class="item">
            <p class="week">星期二</p>
            <p>05/14</p>
          </div>
          <div class="item">
            <p class="week">星期二</p>
            <p>05/14</p>
          </div>
          <div class="item">
            <p class="week">星期二</p>
            <p>05/14</p>
          </div>
          <div class="item">
            <p class="week">星期二</p>
            <p>05/14</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mMatchList">
      <div class="item">
        <div class="hd box">
          <p class="left"></p>
          <p class="center"></p>
        </div>
        <div class="match">
          <div class="box">
            <div class="left teamInfo"></div>
            <div class="center"></div>
            <div class="right teamInfo"></div>
          </div>
          <div class="box">
            <div class="left"></div>
            <div class="center"></div>
            <div class="right"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basketBallMatchPage',
  created(){

  },
  data() {
    return {
    };
  },
  methods: {
    scroll(event) {
      localStorage.setItem('matchPage',event.target.scrollTop);
    }
  }
}
</script>

<style>
</style>
