<template>
  <div class="followList">
    <div class="item" v-for="(item,index) in data" :key="index">
      <span class="badge">{{item.subtitle}}</span>
      <div class="top">
        <div class="imgBox">
          <img :src="item.headImage" :alt="item.name">
        </div>
        <div class="info">
          <p class="name">{{item.name}}</p>
          <span class="return">回报率：{{item.profit}}</span>
        </div>
        <div class="maxReturn">
          <p class="multiple">{{item.expect_rate_return}}</p>
          <p>最高回报(倍)</p>
        </div>
      </div>
      <div class="txtBox">
        <div class="txt">
          <div class="row">
            <p class="col">{{item.lottery_type}}</p>
            <p class="col time">{{item.sell_stop_time}} 截止</p>
          </div>
          <div class="row">
            <div class="col">方案金额: <span class="fontRed">{{item.amount}}</span>元</div>
            <div class="col">跟单人数: {{item.follow}}人</div>
          </div>
          <div class="row">
            <div class="col txtEllipsis">{{item.description}}</div>
          </div>
        </div>
        <a title="跟单" class="btnFollow">跟单</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'followList',
  props:['data'],
  created(){

  },
  data() {
    return {
    };
  },
  methods: {

  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  $redColor:        #e06464;
  .followList{
    overflow: hidden;
    .item{
      padding: .3rem;
      position: relative;
      border-bottom: #eaeaea solid 1px;
      .badge{
        position: absolute;
        right: 0;
        top: .1rem;
        line-height: .3rem;
        border-radius: .15rem 0 0 .15rem;
        color: #fff;
        padding: 0 .1rem;
        background: linear-gradient(to right, #e82e2c 0%, #fe8a2e 100%);
      }
      .top{
        display: flex;
        align-items: center;
        .imgBox{
          width: .95rem;
          height: .95rem;
          img{
            border-radius: 50%;
          }
        }
        .info{
          flex: 1;
          margin: 0 .15rem;
          .name{
            font-size: .3rem;
            color: #333;
          }
          .return{
            float: left;
            margin-top: .05rem;
            line-height: .3rem;
            border-radius: .15rem;
            text-align: center;
            border:$redColor solid 1px;
            color: $redColor;
            font-size: .18rem;
            padding: 0 .2rem;
          }
        }
        .maxReturn{
          width: 1.5rem;
          text-align: right;
          color: #999;
          font-size: .22rem;
          .multiple{
            font-size: .36rem;
            color: $redColor;
            margin-top: .12rem;
          }
        }
      }
      .txtBox{
        display: flex;
        align-items: center;
        margin-top: .2rem;
        .txt{
          flex: 1;
          max-width: 5.6rem;
          padding-right: .2rem;
          line-height: .45rem;
        }
        .btnFollow{
          width: 1rem;
          line-height: .6rem;
          height: .6rem;
          border-radius: .3rem;
          background: $redColor;
          color: #fff;
          font-size: .26rem;
          text-align: center;
        }
      }
    }
  }
</style>
