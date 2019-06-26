<template>
  <div class="footBallMatchPage">
    <a title="筛选" class="btn rg1 mIconScreen" @click="isShowLeagueList = !isShowLeagueList;"></a>
<!--    顶部-->
    <div class="mListHead">
      <div class="typeList">
        <div class="item" :class="{cur: params.game == 0}" @click="changeGame(0)">全部</div>
        <div class="item" :class="{cur: params.game == 407}" @click="changeGame(407)">竞彩</div>
        <div class="item" :class="{cur: params.game == 405}" @click="changeGame(405)">北单</div>
        <div class="item" :class="{cur: params.game == 401}" @click="changeGame(401)">足彩</div>
      </div>
      <div class="timeList">
        <div class="list" :class="{zc: params.game == 401}">
          <div class="item" :class="{cur:item == date}" v-for="(item,index) in dateArr" :key="index" @click="changeDate(item)">
            <p class="week" v-show="params.game != 401">{{getWeek(item)}}</p>
            <p v-show="params.game != 401">{{item.substring(5,10)}}</p>
            <p v-show="params.game == 401">{{item}}</p>
          </div>
        </div>
      </div>
    </div>
<!--    赛事列表-->
    <div class="mMatchList"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="20">
      <div class="item"
           @click="$navPush('/fbDetailHomePage',{})"
           v-for="(item,index) in matchList" :key="index">
        <div class="hd box">
          <span class="middle" v-if="item.middle">中</span>
          <span>{{item.matchNoCn}} {{item.leagueName}}</span>
          <p class="time" v-if="item.status == 0">未开赛 {{(item.matchDate).substring(5,10)}} {{item.matchTime}}</p>
          <p class="time" v-if="item.status == 2">已完场</p>
          <p class="time" v-if="item.status == 8">推迟</p>
          <p class="time" v-if="item.status == 11">上半场 <span class="fontGreen">{{item.elapsedTime}}'</span></p>
          <p class="time" v-if="item.status == 12">下半场 <span class="fontGreen">{{item.elapsedTime}}'</span></p>
          <p class="time" v-if="item.status == 13 || item.status == 14"><span class="fontGreen">{{item.elapsedTime}}</span></p>
        </div>
        <div class="match">
          <div class="box">
            <div class="left teamInfo">
              <span class="logo">
                <img onerror="this.src='static/img/team_logo.png'" v-if="item.homeLogo" :src="item.homeLogo" alt="">
                <img v-if="!item.homeLogo" src="static/img/team_logo.png" alt="">
              </span>
              <span class="name">{{(item.homeName).substring(0,4)}}</span>
<!--              <span class="rank">{{item.homeRank}}</span>-->
              <span class="card yellow" v-if="item.card && item.card[0] && ((item.card[0]).split('-'))[1] > 0">{{((item.card[0]).split('-'))[1]}}</span>
              <span class="card red" v-if="item.card && item.card[0] && ((item.card[0]).split('-'))[0] > 0">{{((item.card[0]).split('-'))[0]}}</span>
            </div>
            <div class="center score"  v-if="item.status == 0 || item.status == 8">
              <span class="num">vs</span>
            </div>
            <div class="center score" v-if="!(item.status == 0 || item.status == 8)">
              <p class="num" >{{item.score[1]}}</p>
            </div>
            <div class="right teamInfo">
              <span class="card red" v-if="item.card && item.card[1] && ((item.card[1]).split('-'))[0] > 0">{{((item.card[1]).split('-'))[0]}}</span>
              <span class="card yellow" v-if="item.card && item.card[1] && ((item.card[1]).split('-'))[1] > 0">{{((item.card[1]).split('-'))[1]}}</span>
<!--              <span class="rank">{{item.awarRank}}</span>-->
              <span class="name">{{(item.awayName).substring(0,4)}}</span>
              <span class="logo">
                <img onerror="this.src='static/img/team_logo.png'" v-if="item.awayLogo" :src="item.awayLogo"  alt="">
                <img v-if="!item.awayLogo" src="static/img/team_logo.png" alt="">
              </span>
            </div>
          </div>
          <div class="box">
            <div class="left">
              <span class="lookNum">
                <span class="icon"></span>
                {{(Math.random() * 200).toFixed(0)}}
              </span>
            </div>
            <div class="center score" v-if="item.status == 2 || item.status == 12">
              <p>半场 {{item.score[0]}}</p>
            </div>
            <div class="center score" v-if="item.status == 13">
              <p>加时 {{item.score[2]}}</p>
            </div>
            <div class="right fontGray">
              <span>{{item.oddsAsia.split(';')[0]}}</span>
              <span>{{item.oddsAsia.split(';')[1]}}</span>
              <span>{{item.oddsAsia.split(';')[2]}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mLoadingBox" v-show="isLoading">
        <mt-spinner type="fading-circle" class="loadingMore" ></mt-spinner>
        <span class="txt">加载中...</span>
      </div>
    </div>
<!--    赛事筛选弹窗-->
    <mt-popup
      v-model="isShowLeagueList"
      class="popLeagueList"
      position="bottom">
      <div class="title">赛事筛选</div>
      <div class="mTabs">
        <div class="list">
          <a class="item" :class="{cur:leagueListChoose.length == leagueList.length}" @click="leagueChooseAll()">全选</a>
          <a class="item" :class="{cur:isLeagueChooseBack && leagueListChoose.length != leagueList.length}" @click="leagueChooseBack()">反选</a>
        </div>
      </div>
      <div class="leagueListBox">
        <div class="item" :class="{cur:leagueListChoose.indexOf(item.id) >= 0}"
             @click="leagueChoose(item)"
             v-for="(item,index) in leagueList" :key="index">
          {{item.name}}
        </div>
      </div>
      <div class="mBtnBox">
        <a class="btn cancel" @click="leagueChooseCancel()">取消</a>
        <a class="btn submit" @click="leagueChooseSubmit()">确认</a>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'footBallMatchPage',
  created(){
    this.getData();
  },
  data() {
    return {
      params: {
        date: this.formatDate(new Date().getTime()), // 日期
        game: 0, // 赛事类型
        leagueIdList: [], // 联赛id列表
        asiaList: null, // 亚盘
        bigsmallList: null, // 大小
        oddsCompany: 0, // 赔率
        qtMatchIdList: [], // 球探ID列表
        pageNo: 0, // 页码
        pageSize: 10, // 每页条数
      },              // 接口查询参数
      maxPageNo: '', // 页数最大值
      dateArr: [], // 日期列表数据
      date: '', // 当前日期
      leagueList: [], // 赛事联赛筛选列表
      leagueListChoose: [], // 弹窗临时选中的赛事ID列表
      isShowLeagueList: false, //赛事联赛筛选列表 显示/隐藏
      isLeagueChooseBack: false, // 反选
      matchList: [], // 赛事列表
      loading: false, // loadMore
      isLoading: false, // 显示/隐藏 下啦加载提示

    };
  },
  methods: {
    // 数据初始化
    resetData(){
      this.params = {
        date: this.formatDate(new Date().getTime()), // 日期
        game: 0, // 赛事类型
        leagueIdList: [], // 联赛id列表
        asiaList: null, // 亚盘
        bigsmallList: null, // 大小
        oddsCompany: 0, // 赔率
        qtMatchIdList: [], // 球探ID列表
        pageNo: 0, // 页码
        pageSize: 10, // 每页条数
      };
      this.maxPageNo = '';
      this.leagueList = [];
      this.matchList = [];
      this.loading = false;
      this.isLoading = false;
    },
    // 获取页面初始数据
    getData(type){
      this.$api.matchPageApi.footBall.matchList(this.params).then(data =>{
        this.dateArr = data.dateArr;
        this.date = data.date;
        this.leagueList = (this.leagueList && this.leagueList.length > 0)?this.leagueList:data.leagueList;
        this.maxPageNo = data.totalPage;
        if(type == 'loadMore'){
          this.matchList = this.matchList.concat(data.matchList);
        }else{
          this.matchList = data.matchList;
        }
        this.isLoading = false;
        this.loading = false;
      });
    },
    // 获取今天是星期几
    getWeek(dateString) {
      var date;
      var today = new Date;
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      var months = (month < 10 ? "0" + month : month);
      var days = (day < 10 ? "0" + day : day);
      var mydate = (year.toString() + '-' + months.toString() + '-' + days);
      if (!dateString) {
        date = new Date();
      } else {
        var dateArray = dateString.split("-");
        let newDate = dateArray[1] - 1;
        date = new Date(dateArray[0], newDate, dateArray[2]);
      }
      if (dateString != mydate) {
        return "星期" + "日一二三四五六".charAt(date.getDay());
      } else {
        return "今天";
      }
    },
    // 彩种玩法切换
    changeGame(game){
      this.resetData();
      if(game == 401) this.params.date = '';
      else this.params.date = this.formatDate(new Date().getTime());
      this.params.game = game;
      this.getData();
    },
    // 日期切换
    changeDate(date){
      this.matchList = [];
      this.params.pageNo = 0;
      this.params.date = date;
      this.getData();
    },
    // 日期格式化
    formatDate(time) {
      var date = new Date(time);
      var year = date.getFullYear(),
          month = date.getMonth() + 1,//月份是从0开始的
          day = date.getDate();
      var newTime = year + '-' +
          (month < 10 ? '0' + month : month) + '-' +
          (day < 10 ? '0' + day : day);
      return newTime;
    },
    // 下啦加载数据
    loadMore(){
      this.loading = true;
      this.isLoading = true;
      this.params.pageNo += 1;
      console.log(this.params.pageNo);
      if(this.params.pageNo > this.maxPageNo){
        this.isLoading = false;
        this.loading = false;
        return false;
      }
      setTimeout(()=>{
        this.getData('loadMore');
      },1500)
    },
    // 赛事筛选弹窗 选中/删除
    leagueChoose(item){
      if(this.leagueListChoose.indexOf(item.id) >= 0){
        this.leagueListChoose.splice(this.leagueListChoose.indexOf(item.id),1);
      }else{
        this.leagueListChoose.push(item.id);
      }
    },
    // 赛事筛选弹窗 全选
    leagueChooseAll(){
      this.leagueListChoose = [];
      this.isLeagueChooseBack = false;
      for(let k = 0; k < this.leagueList.length;k++){
        this.leagueListChoose.push(this.leagueList[k].id);
      }
    },
    // 赛事筛选弹窗 反选
    leagueChooseBack(){
      this.isLeagueChooseBack = true;
      for(let k = 0; k < this.leagueList.length;k++){
        if(this.leagueListChoose.indexOf(this.leagueList[k].id) >= 0){
          this.leagueListChoose.splice(this.leagueListChoose.indexOf(this.leagueList[k].id),1);
        }else{
          this.leagueListChoose.push(this.leagueList[k].id);
        }
      }
    },
    // 赛事筛选弹窗 取消
    leagueChooseCancel(){
      this.isShowLeagueList = false;
      this.leagueListChoose = [];
    },
    // 赛事筛选弹窗 确定
    leagueChooseSubmit(){
      this.resetData();
      this.params.leagueIdList = this.leagueListChoose;
      this.getData();
      this.isShowLeagueList = false;
    },
    // 滚动条位置
    scroll(event) {
      localStorage.setItem('matchPage',event.target.scrollTop);
    }
  }
}
</script>

<style>
</style>
