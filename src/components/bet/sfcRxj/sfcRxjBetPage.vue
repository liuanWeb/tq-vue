<template>
  <div class="sfcRxjBetPage page">
    <!--    头部-->
    <div class="header">
      <goBack class="lf1 btn" url="tabs"></goBack>
      <p class="title mBetTitle" @click="isShowBetListPop = !isShowBetListPop">
        <span v-for="(item,index) in betListArr" :key="index" v-if="item.type == lotteryType">{{item.title}}</span>
      </p>
    </div>
    <!--    头部下拉-->
    <mt-popup
      class="mBetListPop"
      v-model="isShowBetListPop"
      popup-transition="popup-fade"
      position="top"
    >
      <a @click="changeTab(item)" class="item" v-for="(item,index) in betListArr" :class="{cur:item.type == lotteryType}" :key="index">{{item.title}}</a>
    </mt-popup>
    <!--    顶不赛事筛选-->
    <div class="mMatchLeagueList">
      <div class="listBox">
        <div class="list">
          <div class="item" v-for="(item,index) in templateData.onSaleIssues" :class="{cur:issueNo == item.issueNo}" @click="changeNo(item.issueNo)">{{item.issueNo}}期({{item.status}})</div>
        </div>
      </div>
    </div>
<!--    截止时间-->
    <p class="endTime" v-if="templateData && templateData.current_issue">截止时间：{{templateData.current_issue.end_time}}</p>
    <!--    内容区 -->
    <div class="content" @scroll="scroll" id="tabsContent">
      <!--    赛事列表-->
      <div class="mJczqList" v-if="templateData.zcMatchList">
        <div class="item">
          <div class="itemList">
            <div class="itemItem" v-for="(item,index) in templateData.zcMatchList" :key="index">
              <div class="matchInfo">
                <div class="left">
                  <p class="fontRed num">{{item.m_index}}</p>
                  <p>{{item.league_name}}</p>
                  <p>{{(item.match_time).substring(10,16)}}开赛</p>
                </div>
                <div class="right" >
                  <p class="matchTitle">
                    <span><span>(主)</span>{{item.home_team}}</span>
                    <span>vs</span>
                    <span>{{item.guest_team}}<span>(客)</span></span>
                  </p>
                  <div class="flexBox">
                    <div class="mPlayBox">
                      <div class="playItem">
                        <div class="c" :class="{cur: addClassCur(item,lotteryType,'3')}" @click="chooseItem(item,lotteryType,'3',item.win_rate)">3 <span class="sp">胜({{item.win_rate}})</span></div>
                        <div class="c" :class="{cur: addClassCur(item,lotteryType,'1')}" @click="chooseItem(item,lotteryType,'1',item.deuce_rate)">1 <span class="sp">平({{item.deuce_rate}})</span></div>
                        <div class="c" :class="{cur: addClassCur(item,lotteryType,'0')}" @click="chooseItem(item,lotteryType,'0',item.lose_rate)">0 <span class="sp">负({{item.lose_rate}})</span></div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
<!--    机选按钮-->
    <a title="机选" @click="randomFn()" class="btnRandom">机</a>
    <!--    确认投注-->
    <div class="mBetSubmitBox">
      <a class="btnDel btnLeft" @click="delBetContent()"><i class="iconDel"></i>清空</a>
      <div class="txtBox">
        <p class="tit">已选 <span class="fontRed">{{chooseMap.size}}</span> 场</p>
        <p class="tips">请至少选择<span v-if="lotteryType == 401">14</span><span v-if="lotteryType == 402">9</span>场比赛</p>
      </div>
      <a class="btnSubmit" @click="toBet()">确定</a>
    </div>
  </div>
</template>

<script>
import goBack from '../../common/goBack'
export default {
  name: 'sfcRxjBetPage',
  activated(){
    this.deleteList = this.$route.query.deleteList;
    if(this.$route.query.load){
      // 刷新
      this.refresh();
    }else{
      // 是否在确认页有过删除操作 有就删除当前页面到 选中项
      if(this.deleteList && this.deleteList.length > 0){
        for(let k = 0; k < this.deleteList.length;k++){
          this.chooseMap.delete(this.deleteList[k]);
        }
        let m = this.chooseMap;
        this.chooseMap = new Map();
        this.chooseMap = m;
      }
    }
  },
  components:{
    goBack
  },
  created(){

  },
  data() {
    return {
      title:'胜负彩',
      betListArr:[ // 头部下拉弹窗内容
        {
          title: '胜负彩',
          type: '401'
        },
        {
          title: '任选九',
          type: '402'
        }
      ],
      isShowBetListPop: false, // 头部下啦弹窗
      lotteryType: '401', // 彩种
      playType: 1,
      issueNo: '', // 期号
      templateData: [], // 数据
      isShowMorePlay: false, // 更多玩法显示/隐藏
      morePlayData: [], // 更多玩法弹窗数据
      chooseMap: new Map(),  // 选中内容
      deleteList: [], // 投注确认页 返回的 已删除id
      leagueNames: [], // 联赛名称列表
    };
  },
  methods: {
    // 刷新
    refresh(){
      this.getRace();
      this.chooseMap = new Map();
      this.lotteryType = this.$route.query.lotteryType?this.$route.query.lotteryType:'401';
      this.leagueNames = [];
    },
    // 顶部玩法切换
    changeTab(item){
      if(this.playType != item.type){
        this.title = item.title;
        this.lotteryType = item.type;
        this.isShowBetListPop = false;
        // this.refresh();
      }
    },
    // 获取赛事数据
    getRace(){
      let params = {
        lotteryType: this.lotteryType,
        issueNo:this.issueNo
      }
      this.$api.betPageApi.sfcRxj.getRace(params).then(data=>{
        if(data.code == '0000'){
          this.templateData = data;
          this.issueNo = data.current_issue.issue_no;
        }
      });
    },
    // 设置页面数据
    setData(){
      let temp = this.templateData;
      this.templateData = '';
      this.templateData = temp;
    },
    // 选择投注内容
    chooseItem(race,playType,type,val){
      let id = race.match_id;
      if(!this.chooseMap.get(id)){
        // 没选过此赛事的 新增一个 key
        this.chooseMap.set(id,{
          id: id,
          race: race,
          choose: new Map().set(playType, new Map().set(type,val))
        });
      }else{
        // 选过 此赛事
        let list = this.chooseMap.get(id).choose;
        // 如果没选过此赛事的 该种 玩法
        if(!list.get(playType)){
          // 新增
          list.set(playType, new Map().set(type,val));
        }else{
          // 不存在该值 新增
          if(!list.get(playType).has(type)){
            list.get(playType).set(type,val);
          }else{
            // 存在该值 删除
            list.get(playType).delete(type);
            // 如果该玩法都没选中 删除该玩法
            if(list.get(playType).size==0){
              list.delete(playType);
            }
          }
        }
        if(list.size == 0){
          this.chooseMap.delete(id);
        }
      }
      let m = this.chooseMap;
      this.chooseMap = new Map();
      this.chooseMap = m;
    },
    // 添加选中 class
    addClassCur(race,playType,type){
      let race_no = this.chooseMap.get(race.match_id);
      return race_no && race_no.choose && race_no.choose.has(playType) && race_no.choose.get(playType).has(type);
    },
    // 清空已选项
    delBetContent(){
      if(this.chooseMap.size > 0){
        this.$messagebox.confirm('确定要清空已选择的赛事吗？').then(action =>{
          // 确定删除
          this.$toast(`已成功删除您刚选择的${this.chooseMap.size}场赛事～`);
          this.chooseMap = new Map();

        }).catch(err => {
        });
      }else{
        this.$toast(`暂无选中赛事～`);
      }
    },
    // 确认投注
    toBet(){
      if((this.lotteryType == '401' && this.chooseMap.size < 14)){
        this.$toast('请至少选择14场比赛')
      }else if(this.lotteryType == '402' && this.chooseMap.size < 9){
        this.$toast('请至少选择1场单关比赛')
      }else{
        let content = ''; // 投注内容
        let letballs = ''; // 投注让球
        let raceList = []; // map 转为 array 传递到 确认页
        // 数据组装
        let list = ['_','_','_','_','_','_','_','_','_','_','_','_','_','_'];
        this.chooseMap.forEach((v,k)=>{
          let contentItem = '';
          let letballsItem = '';
          raceList.push(v);
          v.choose.forEach((s,j)=>{
            let contentItemItem = '';
            // console.log(s.size);
            s.forEach((q,w)=>{
              contentItemItem += `${w},`;
            });
            contentItem += contentItemItem;
          });
          contentItem = contentItem.substring(0,contentItem.length - 1);
          list[v.race.m_index - 1] = contentItem;
        });
        content = list.join('|');
        let params = {
          content: content,
          letballs: '',
          chooseMap: JSON.stringify(raceList),
          lotteryType: this.lotteryType,
          playType: this.playType,
          issueNo: this.issueNo
        };
        console.log(raceList);
        this.$navPush('betPage',params);
      }
    },
    // 滚动监听
    scroll(event) {
      localStorage.setItem('sfcRxjBetPage',event.target.scrollTop);
    },
    // 机选
    randomFn(){
      this.chooseMap = new Map();
      let length = this.lotteryType=='401'?14:9;
      for(let k = 0; k < length;k++){
        let arr = ['3','1','0'];
        let type = parseInt(Math.random() * 3),
            val;
        switch (arr[type]) {
          case '3':
            val = this.templateData.zcMatchList[k].win_rate;
            break;
          case '1':
            val = this.templateData.zcMatchList[k].deuce_rate;
            break;
          case '0':
            val = this.templateData.zcMatchList[k].lose_rate;
            break;
          default:
            break;
        }
        this.chooseItem(this.templateData.zcMatchList[k],this.lotteryType,arr[type],val);
      }
      console.log(this.chooseMap);
    },
    // 期数切换
    changeNo(no){
      this.issueNo = no;
      this.getRace();
    }

  }
}
</script>

<style>
</style>
