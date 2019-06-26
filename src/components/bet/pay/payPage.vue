<template>
  <div class="payPage page">
    <mHead title="支付确认"></mHead>
    <div class="content">
      <div class="payList">
        <div class="item">
          <p class="tit">投注彩种</p>
          <p class="c fontGray">
            <span v-if="params.lotteryType == 407">竞彩足球</span>
            <span v-if="params.lotteryType == 406">竞彩篮球</span>
          </p>
        </div>
        <div class="item">
          <p class="tit">投注金额</p>
          <p class="c fontRed">{{params.amount}}元</p>
        </div>
        <div class="item">
          <p class="tit">可用余额</p>
          <p class="c">{{balance.able_darw_amount}} 元</p>
        </div>
      </div>
      <a title="立即支付" @click="pay()" class="btnPay" v-if="payStatus == 0">立即支付:{{params.amount}}元</a>
      <a title="支付ing" class="btnPay ing" v-if="payStatus == 1">支付ing...</a>
    </div>
  </div>
</template>

<script>
import mHead from '../../common/mHead'
export default {
  name: 'payPage',
  components:{
    mHead
  },
  activated(){
    this.params.issueNo = this.$route.query.issueNo;
    this.params.lotteryType = this.$route.query.lotteryType;
    this.params.playType = this.$route.query.playType;
    // this.params.passType = this.$route.query.passType;
    this.params.content = this.$route.query.content;
    this.params.multiple = this.$route.query.multiple;
    this.params.amount = this.$route.query.amount;
    this.params.nonce_token = Date.parse(new Date());

    this.payStatus = 0;
    this.getBalance();
  },
  created(){
  },
  data() {
    return {
      balance: '', // 余额数据
      params:{
        issueNo: '', // 期号
        lotteryType: '', // 彩种
        playType: '', //玩法类型
        // passType: '', // 过关方式
        amount: '',
        content: '',
        multiple: '',
        nonce_token: '',
        betCount: 1
      },
      payStatus: 0
    };
  },
  methods: {
    // 获取账户余额
    getBalance(){
      this.$api.betPageApi.pay.getBalance().then(data=>{
        if(data.code == '0000'){
          this.balance = data.result;
        }
      })
    },
    // 支付
    pay(){
      if(this.balance.able_darw_amount < this.params.amount){
        this.$toast('余额不足');
      }else{
        this.payStatus = 1;
        console.log(this.params.lotteryType);
        if(this.params.lotteryType == '407'){
          this.$api.betPageApi.pay.toPay.jczq(this.params).then(data=>{
            if(data.code == '0000'){
              setTimeout(()=>{
                this.$navPush('payStatusPage',{status:data.code});
              },1500);
            }
          });
        }else if(this.params.lotteryType == '401' || this.params.lotteryType == '402'){
          this.$api.betPageApi.pay.toPay.jjc(this.params).then(data=>{
            if(data.code == '0000'){
              setTimeout(()=>{
                this.$navPush('payStatusPage',{status:data.code});
              },1500);
            }
          });
        }
      }
    }
  }
}
</script>

<style>
</style>
