<template>
<!--头部-->
  <div class="homePage page" >
    <div class="header">
      <div class="shopInfo">
        <div class="logo fl"></div>
        <p class="name fl">推球实体店</p>
      </div>
    </div>
<!--内容区-->
    <div class="content hasFooter" @scroll="scroll" id="tabsContent">
      <mt-loadmore ref="loadmore" :top-method="loadTop" @top-status-change="handleTopChange">
        <div v-for="(item,index) in templateData" :key="index">
          <!--焦点图-->
          <mt-swipe :auto="4000" class="mSwipeBox bannerBox"  v-if="item.type == 1">
            <mt-swipe-item v-for="(itemItem,k) in item.item" :key="k">
              <div class="imgBox"
                   @click="$toWebView(itemItem.redirect_type,itemItem.redirect_name,{title:itemItem.title,url:itemItem.redirect_name})">
                <img :src="itemItem.img_url" :alt="itemItem.title">
              </div>
            </mt-swipe-item>
          </mt-swipe>
          <!--通知-->
          <div class="mBox noticeBox" v-if="item.type == 2">
            <i class="iconNotice"></i>
            <div class="list">
              <p class="item" @click="$navPush('/newsDetailPage',{id:itemItem.id})" v-for="(itemItem,k) in item.item" :key="k">{{itemItem.title}}</p>
            </div>
            <a class="linkMore">···</a>
          </div>
          <!--快捷入口-->
          <div class="navBox mBox betBox" v-if="item.type == 3">
            <div class="betList">
              <div class="item" v-for="(itemItem,k) in item.item" :key="k"
                   @click="$toWebView(itemItem.redirect_type,itemItem.redirect_name,{title:itemItem.title,url:itemItem.redirect_name})">
                <div class="imgBox">
                  <img :src="itemItem.img_url" :alt="itemItem.title">
                </div>
                <p class="title">{{itemItem.title}}</p>
              </div>
            </div>
          </div>
          <!--投注快捷入口-->
          <div class="mBox betBox" v-if="item.type == 5" >
            <div class="item" v-for="(itemItem,k) in item.item" :key="k" @click="toBet(itemItem)">
              <div class="imgBox">
                <img :src="itemItem.img_url" :alt="itemItem.title">
              </div>
              <p class="title">{{itemItem.title}}</p>
            </div>
          </div>
          <!--活动专区-->
          <div class="actBox mBox" v-if="item.type == 16">
            <div class="imgBox" v-for="(itemItem,k) in item.item" :key="k"
                 @click="$toWebView(itemItem.redirect_type,itemItem.redirect_name,{title:itemItem.title,url:itemItem.redirect_name})">
              <img :src="itemItem.img_url" :alt="itemItem.title">
            </div>
          </div>
          <!--热门赛事-->
          <div class="hotMatchBox mBox" v-if="item.type == 4">
            <div class="mBoxHd">
              <p class="title">热门赛事</p>
              <a class="linkMore"></a>
            </div>
            <mt-swipe :auto="0" class="mSwipeBox list" >
              <mt-swipe-item v-for="(itemItem,k) in item.item" class="item"  :key="k">
                <div class="top ">
                  <div class="teamBox">
                    <div class="imgBox">
                      <img src="../../assets/img/test.jpg" alt="">
                    </div>
                    <p class="name">{{itemItem.extendObj.race.home_team}}</p>
                  </div>
                  <div class="matchInfo">
                    <p>{{itemItem.extendObj.race.league_name}}</p>
                    <p class="time fontGray">{{itemItem.extendObj.race.match_time}}</p>
                  </div>
                  <div class="teamBox">
                    <div class="imgBox">
                      <img src="../../assets/img/test.jpg" alt="">
                    </div>
                    <p class="name">{{itemItem.extendObj.race.guest_team}}</p>
                  </div>
                </div>
                <div class="spBox">
                  <div class="spItem" v-for="(itemItems,n) in itemItem.extendObj.spfSpArr" :key="n"
                       @click="chooseSp(itemItem,itemItems)"
                       :class="{active: itemItems == itemItem.buySp}">
                    <p class="tit" v-if="n == 0">胜</p>
                    <p class="tit" v-if="n == 1">平</p>
                    <p class="tit" v-if="n == 2">负</p>
                    <p class="sp">{{itemItems}}</p>
                  </div>
                </div>
                <div class="txtBox">
                  <p class="bonus">奖金：<span class="fontRed">{{(itemItem.buyAmount * itemItem.buySp).toFixed(2)}}</span>元</p>
                  <div class="buy" @click="isShowHotMatch(itemItem)">
                    <span>{{itemItem.buyAmount}}元</span>
                    <div class="mSelect mSelectTop" v-show="itemItem.isShow">
                      <p class="sItem" v-for="(items,s) in hotMatchBuyAmount" :key="s" :class="{active:itemItem.buyAmount == items}" @click="chooseAmount(itemItem,items)">{{items}}</p>
                    </div>
                  </div>
                  <a title="投注" class="btnBet">投注</a>
                </div>
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <!--二维码专区-->
          <div class="ewmBox mBox row" v-if="item.type == 18">
            <div class="item imgBox" v-for="(itemItem,k) in item.item" :key="k">
              <img :src="itemItem.img_url" :alt="itemItem.title">
            </div>
          </div>
          <!--彩票学堂-->
          <div class="lotteryBox mBox" v-if="item.type == 17">
            <div class="item imgBox" v-for="(itemItem,k) in item.item" :key="k"
                 @click="$toWebView(itemItem.redirect_type,itemItem.redirect_name,{title:itemItem.title,url:itemItem.redirect_name})">
              <img :src="itemItem.img_url" :alt="itemItem.title">
            </div>
          </div>
          <!--红人跟单-->
          <div class="followBox mBox" v-if="item.type == 10000">
            <div class="mBoxHd">
              <p class="title">红人跟单</p>
              <a class="linkMore"></a>
            </div>
            <followList :data="item.item"></followList>
          </div>
          <!--热门资讯-->
          <div class="newsBox mBox" v-if="item.type == 9">
            <div class="mBoxHd">
              <p class="title">热门资讯</p>
              <a class="linkMore"></a>
            </div>
            <newsList :data="item.item"></newsList>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import followList from '../common/followList'
import newsList from '../common/newsList'
export default {
  name: 'homePage',
  components:{followList,newsList},
  created(){
    // this.$api.homePageApi.user();
    this.template();
  },
  data() {
    return {
      templateData: [],  // 模版数据
      hotMatchBuyAmount: [10,20,50,100],// 热门赛事购买金额
      topStatus: ''
    };
  },
  methods: {
    loadTop(){

    },
    handleTopChange(status){
      this.topStatus = status;
      if(this.topStatus == 'loading'){
        this.template();
        setTimeout(()=>{
          this.$refs.loadmore.onTopLoaded();
        },2000)
      }
    },
    // 获取模板数据
    template(){
      this.$api.homePageApi.template().then( data =>{
        this.templateData = data.result.module;
        this.templateData.forEach((v,k)=>{
          if(v.type == 4){
            v.item.forEach((s,w)=>{
              s.isShow = false;
              s.buyAmount = 10;
              s.buySp = s.extendObj.spfSpArr[0];
            });
          }
        })
      })
    },
    // 滚动监听
    scroll(event) {
      localStorage.setItem('homePage',event.target.scrollTop);
    },
    // 显示/关闭 热门赛事投注金额下拉框
    isShowHotMatch(item){
      item.isShow = !item.isShow;
      this.$set(this.templateData,0,'');
    },
    // 选择投注金额
    chooseAmount(item,items){
      this.$set(item,'isShow','false');
      item.buyAmount = items;
    },
    // 选择投注赔率
    chooseSp(item,items){
      this.$set(item,'buySp',items);
      this.$set(this.templateData,0,'');
    },
    // 去投注面板
    toBet(item){
      let type = JSON.parse(item.redirect_param);
      console.log(type.lotteryType);
      switch (type.lotteryType) {
        case '407':
          this.$navPush('/jczqBetPage',{load:true});
          break;
        case '406':
          this.$navPush('/jclqBetPage',{load:true});
          break;
        case '401':
          this.$navPush('/sfcRxjBetPage',{load:true,lotteryType: '401'});
          break;
        case '402':
          this.$navPush('/sfcRxjBetPage',{load:true,lotteryType: '402'});
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style>
</style>
