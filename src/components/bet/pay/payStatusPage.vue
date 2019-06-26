<template>
  <div class="payStatusPage page">
    <mHead :title="title" url="homePage"></mHead>
    <div class="content">
<!--      投注成功-->
      <div class="statusTxt">
        <i class="icon" :class="{up:status == '0000',dw:status=='250'}"></i>
        <p class="tips" v-if="status == '0000'">恭喜您投注成功！</p>
        <p class="tips" v-if="status == '250'">很遗憾，投注失败！</p>
        <p v-if="status == '0000'">您可在投注记录中查看出票状态</p>
      </div>

      <div class="btnBox">
        <a @click="$navPush('jczqHhtzPage',{load:0})" class="btnItem">继续投注</a>
        <a href="" class="btnItem">查看记录</a>
      </div>
    </div>
  </div>
</template>

<script>
import mHead from '../../common/mHead'
export default {
  name: 'payStatusPage',
  components:{
    mHead
  },
  activated(){
    this.status = this.$route.query.status;
    switch (this.status) {
      case '0000':
        this.title = '投注成功';
        break;
      case '250':
        this.title = '投注失败';
        break;
      default:
        break;
    }
  },
  created(){

  },
  data() {
    return {
      title:'',
      status: ''
    };
  },
  methods: {
  }
}
</script>

<style>
</style>
