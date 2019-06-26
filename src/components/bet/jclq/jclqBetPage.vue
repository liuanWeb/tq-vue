<template>
  <div class="jclqBetPage page">
<!--    头部-->
    <div class="header">
      <goBack class="lf1 btn" url="tabs"></goBack>
      <p class="title mBetTitle" @click="isShowBetListPop = !isShowBetListPop">{{title}}</p>
    </div>
<!--    头部下拉-->
    <mt-popup
      class="mBetListPop"
      v-model="isShowBetListPop"
      popup-transition="popup-fade"
      position="top"
      >
      <a @click="changeTab(item)" class="item" v-for="(item,index) in betListArr" :class="{cur:item.title == title}" :key="index">{{item.title}}</a>
    </mt-popup>
<!--    顶不赛事筛选-->
    <div class="mMatchLeagueList">
      <a title="全部" @click="screenLeague(0,1)" class="btnAll btnScreen" :class="{cur:leagueNamesIsAll}">全部</a>
      <div class="listBox">
        <div class="list">
          <div class="item" v-for="(item,index) in templateData.leagueNames" :class="{cur:leagueNames.indexOf(item) >= 0}" @click="screenLeague(item)">{{item}}</div>
        </div>
      </div>
    </div>
<!--    内容区 -->
    <div class="content" @scroll="scroll" id="tabsContent">
<!--    赛事列表-->
      <div class="mJczqList" v-if="templateData.dayRaceVoList">
        <div class="item" v-for="(item,index) in templateData.dayRaceVoList" :key="index" >
          <p class="title" :class="{off:item.isShowMore}" @click="isShowMatchMore(item)">{{item.areaDate}} {{item.week}} <span class="fontRed">{{item.raceVoList.length}}</span>场比赛可选</p>
          <div class="itemList" v-show="item.isShowMore">
            <div class="itemItem" v-for="(item2,index2) in item.raceVoList" :key="index2" v-if="leagueNames.indexOf(item2.race.league_name) >= 0 || leagueNames.length == '0'">
              <div class="matchInfo">
                <div class="isDan" v-if="playType != 499 && playType != 411">单关</div>
                <div class="left" @click="isShowMatchMore(item2)">
                  <p class="fontRed num">{{item2.race.subRaceNo}}</p>
                  <p>{{item2.race.league_name}}</p>
                  <p>{{(item2.race.sell_stop_time).substring(10,16)}}截止</p>
                </div>
                <div class="right" >
                  <p class="matchTitle">
                    <span><span>(主)</span>{{item2.race.home_team}}</span>
                    <span>vs</span>
                    <span>{{item2.race.guest_team}}<span>(客)</span></span>
                  </p>
<!--              混合投注 + 胜平负(让)-->
                  <div class="flexBox" v-if="playType == 499">
                    <div class="mPlayBox">
                      <div class="playItem green">
                        <div class="t">让分</div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'422','0')}" @click="chooseItem(item2.race,'422','0',item2.rfsfSpArr[0])">客胜 <span class="sp">{{item2.rfsfSpArr[0]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'422','3')}" @click="chooseItem(item2.race,'422','3',item2.rfsfSpArr[1])">主胜 <span class="sp">(<span class="fontGreen">{{item2.concede}}</span>){{item2.rfsfSpArr[1]}}</span></div>
                      </div>
                      <div class="playItem" :class="{orange: item2.concede > 0,blue: item2.concede < 0}">
                        <div class="t f3">大小分</div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'424','1')}" @click="chooseItem(item2.race,'424','1',item2.dxfSpArr[0])">大于{{item2.advanced_concede}} <span class="sp">{{item2.dxfSpArr[0]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'424','0')}" @click="chooseItem(item2.race,'424','0',item2.dxfSpArr[1])">小于{{item2.advanced_concede}} <span class="sp">{{item2.dxfSpArr[1]}}</span></div>
                      </div>
                    </div>
                    <div class="more" @click="isShowMorePlayFn(item2)">
                      <span>更多玩法</span>
                    </div>
                  </div>
<!--              胜负+让分-->
                  <div class="flexBox" v-if="playType == 422">
                    <div class="mPlayBox" style="line-height: .8rem">
                      <div class="playItem green">
                        <div class="t">胜负</div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'421','0')}" @click="chooseItem(item2.race,'421','0',item2.sfSpArr[0])">客胜 <span class="sp">{{item2.sfSpArr[0]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'421','3')}" @click="chooseItem(item2.race,'421','3',item2.sfSpArr[1])">主胜 <span class="sp">{{item2.sfSpArr[1]}}</span></div>
                      </div>
                      <div class="playItem blue">
                        <div class="t" >让分</div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'422','0')}" @click="chooseItem(item2.race,'422','0',item2.rfsfSpArr[0])">客胜 <span class="sp">{{item2.rfsfSpArr[0]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'422','3')}" @click="chooseItem(item2.race,'422','3',item2.rfsfSpArr[1])">主胜 <span class="sp">(<span class="fontGreen">{{item2.concede}}</span>){{item2.rfsfSpArr[1]}}</span></div>
                      </div>
                    </div>
                  </div>
<!--              大小分-->
                  <div class="flexBox" v-if="playType == 424">
                    <div class="mPlayBox">
                      <div class="playItem">
                        <div class="c" :class="{cur: addClassCur(item2.race,'424','1')}" @click="chooseItem(item2.race,'424','1',item2.dxfSpArr[0])">大于{{item2.advanced_concede}} <span class="sp">{{item2.dxfSpArr[0]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'424','0')}" @click="chooseItem(item2.race,'424','0',item2.dxfSpArr[1])">小于{{item2.advanced_concede}} <span class="sp">{{item2.dxfSpArr[1]}}</span></div>
                      </div>
                    </div>
                  </div>
<!--              胜分差-->
                  <div class="flexBox" v-if="playType == 423">
                    <div class="mPlayBox">
                      <div class="playItem">
                        <div class="c">
                          <div class="playItem c" @click="isShowMorePlayFn()">
                            <div class="c" style="line-height: .7rem">请选择胜分差</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="matchMoreInfo" v-show="item2.isShowMore">
                <div class="hd">
                  <p class="tit">赛事分析</p>
                  <a href="" class="more">详细></a>
                </div>
                <div class="infoItem">
                  <p class="tit">历史交锋</p>
                  <p class="txt">近 <span class="fontRed">1</span>次交战，<span class="fontRed">国王</span>胜利 <span class="fontRed">3</span> 胜 <span class="fontGreen">1</span> 平 <span class="fontBlue">0</span> 负</p>
                </div>
                <div class="infoItem">
                  <p class="tit">近期战绩</p>
                  <p class="txt">
                    主队:<span class="fontRed">3</span> 胜 <span class="fontGreen">1</span> 平 <span class="fontBlue">0</span> 负
                    客队:<span class="fontRed">3</span> 胜 <span class="fontGreen">1</span> 平 <span class="fontBlue">0</span> 负
                  </p>
                </div>
                <div class="infoItem">
                  <p class="tit">平均欧赔</p>
                  <p class="txt"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    确认投注-->
    <div class="mBetSubmitBox">
      <a class="btnDel btnLeft" @click="delBetContent()"><i class="iconDel"></i>清空</a>
      <div class="txtBox">
        <p class="tit">已选 <span class="fontRed">{{chooseMap.size}}</span> 场</p>
        <p class="tips">至少选1场单关或任意2场比赛</p>
      </div>
      <a class="btnSubmit" @click="toBet()">确定</a>
    </div>
<!--   更多玩法-->
    <mt-popup
      class="morePlayPop"
      v-model="isShowMorePlay"
      popup-transition="popup-fade"
      position="center"
    >
      <div class="hd" v-if="morePlayData && isShowMorePlay">
        <span>{{morePlayData.race.home_team}}</span><span>VS</span><span>{{morePlayData.race.guest_team}}</span>
      </div>
      <p class="tips">胜平负、让球胜平负不支持单关</p>
      <div class="playListBox">
        <div class="item" v-if="morePlayData && isShowMorePlay">
          <div class="mPlayBox" v-if="playType == 499">
            <div class="playItem  blue">
              <div class="t">胜负</div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'421','0')}" @click="chooseItem(morePlayData.race,'421','0',morePlayData.sfSpArr[0])">客胜 <span class="sp">{{morePlayData.sfSpArr[0]}}</span></div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'421','3')}" @click="chooseItem(morePlayData.race,'421','3',morePlayData.sfSpArr[1])">主胜 <span class="sp">{{morePlayData.sfSpArr[1]}}</span></div>
            </div>
            <div class="playItem green">
              <div class="t" >让分</div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'422','0')}" @click="chooseItem(morePlayData.race,'422','0',morePlayData.rfsfSpArr[0])">客胜 <span class="sp">{{morePlayData.rfsfSpArr[0]}}</span></div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'422','3')}" @click="chooseItem(morePlayData.race,'422','3',morePlayData.rfsfSpArr[1])">主胜 <span class="sp">(<span class="fontGreen">{{morePlayData.concede}}</span>){{morePlayData.rfsfSpArr[1]}}</span></div>
            </div>
          </div>
          <div class="mPlayBox">
            <div class="playItem blue">
              <div class="t f3" >大小分</div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'424','1')}" @click="chooseItem(morePlayData.race,'424','1',morePlayData.dxfSpArr[0])">大于{{morePlayData.advanced_concede}} <span class="sp">{{morePlayData.dxfSpArr[0]}}</span></div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'424','0')}" @click="chooseItem(morePlayData.race,'424','0',morePlayData.dxfSpArr[1])">小于{{morePlayData.advanced_concede}} <span class="sp">{{morePlayData.dxfSpArr[1]}}</span></div>
            </div>
          </div>
          <div class="mPlayBox" v-if="playType == 499">
            <div class="playItem red">
              <div class="t f3">客胜分差</div>
              <div class="c">
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'423','0')}" @click="chooseItem(morePlayData.race,'423','0',morePlayData.sfcSpArr[0])">1-5 <span class="sp">{{morePlayData.sfcSpArr[0]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'423','1')}" @click="chooseItem(morePlayData.race,'423','1',morePlayData.sfcSpArr[1])">6-10 <span class="sp">{{morePlayData.sfcSpArr[1]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'423','2')}" @click="chooseItem(morePlayData.race,'423','2',morePlayData.sfcSpArr[2])">11-15 <span class="sp">{{morePlayData.sfcSpArr[2]}}</span></div>
                </div>
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'423','3')}" @click="chooseItem(morePlayData.race,'423','3',morePlayData.sfcSpArr[3])">16-20 <span class="sp">{{morePlayData.sfcSpArr[3]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'423','4')}" @click="chooseItem(morePlayData.race,'423','4',morePlayData.sfcSpArr[4])">21-25 <span class="sp">{{morePlayData.sfcSpArr[4]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'423','5')}" @click="chooseItem(morePlayData.race,'423','5',morePlayData.sfcSpArr[5])">26+ <span class="sp">{{morePlayData.sfcSpArr[5]}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="mPlayBox" v-if="playType == 499">
            <div class="playItem red">
              <div class="t f3">主胜分差</div>
              <div class="c">
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','33')}" @click="chooseItem(morePlayData.race,'415','33',morePlayData.sfcSpArr[6
                  ])">1-5 <span class="sp">{{morePlayData.sfcSpArr[6]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','31')}" @click="chooseItem(morePlayData.race,'415','31',morePlayData.sfcSpArr[7])">6-10 <span class="sp">{{morePlayData.sfcSpArr[7]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','30')}" @click="chooseItem(morePlayData.race,'415','30',morePlayData.sfcSpArr[8])">11-15 <span class="sp">{{morePlayData.sfcSpArr[8]}}</span></div>
                </div>
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','10')}" @click="chooseItem(morePlayData.race,'415','10',morePlayData.sfcSpArr[9])">16-20 <span class="sp">{{morePlayData.sfcSpArr[9]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','03')}" @click="chooseItem(morePlayData.race,'415','03',morePlayData.sfcSpArr[10])">21-25 <span class="sp">{{morePlayData.sfcSpArr[10]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','01')}" @click="chooseItem(morePlayData.race,'415','01',morePlayData.sfcSpArr[11])">26+ <span class="sp">{{morePlayData.sfcSpArr[11]}}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import goBack from '../../common/goBack'
export default {
  name: 'jclqBetPage',
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
      title:'混合投注',
      betListArr:[ // 头部下拉弹窗内容
        {
          title: '混合投注',
          type: 499
        },
        {
          title: '胜负(让)',
          type: 422
        },
        {
          title: '大小分',
          type: 424
        },
        {
          title: '胜分差',
          type: 423
        }
      ],
      isShowBetListPop: false, // 头部下啦弹窗
      lotteryType: 406, // 彩种
      playType: 499, //彩种类型
      issueNo: '', // 期号
      templateData: [], // 数据
      isShowMorePlay: false, // 更多玩法显示/隐藏
      morePlayData: [], // 更多玩法弹窗数据
      chooseMap: new Map(),  // 选中内容
      deleteList: [], // 投注确认页 返回的 已删除id
      leagueNames: [], // 联赛名称列表
      leagueNamesIsAll: true, // 筛选 是否 全部
    };
  },
  methods: {
    // 刷新
    refresh(){
      this.getRace();
      this.chooseMap = new Map();
      this.leagueNames = [];
      this.leagueNamesIsAll = true;
    },
    // 顶部玩法切换
    changeTab(item){
      if(this.playType != item.type){
        this.title = item.title;
        this.playType = item.type;
        this.isShowBetListPop = false;
        this.refresh();
      }
    },
    // 获取赛事数据
    getRace(){
      this.$api.betPageApi.jclq.getRace({playType: this.playType}).then(data=>{
        if(data.code == '0000'){
          this.templateData = data;
          this.templateData.dayRaceVoList.forEach((v,k)=>{
            v.isShowMore = (k==0);
            v.raceVoList.forEach((s,j)=>{
              if(j == 0) this.issueNo = s.race.issue_no;
              s.isShowMore = false;
            })
          })
          console.log(this.templateData);
        }
      });
    },
    // 赛事筛选
    screenLeague(item,all){
      if(all){
        this.leagueNamesIsAll = true;
        this.leagueNames = [];
      }else{
        this.leagueNamesIsAll = false;
        if(this.leagueNames.indexOf(item)>=0){
          this.leagueNames.splice(this.leagueNames.indexOf(item),1);
          if(this.leagueNames.length == 0){ // 如果为空 则视为 全部
            this.leagueNamesIsAll = true;
          }
        }else{
          this.leagueNames.push(item);
        }
      }
      this.setData()
    },
    // 显示/隐藏下啦内容
    isShowMatchMore(item){
      item.isShowMore = !item.isShowMore;
      this.setData();
    },
    // 设置页面数据
    setData(){
      let temp = this.templateData;
      this.templateData = '';
      this.templateData = temp;
    },
    // 显示/隐藏 更多玩法弹窗
    isShowMorePlayFn(item){
      this.isShowMorePlay = !this.isShowMorePlay;
      this.morePlayData = item;
      console.log(this.morePlayData);
    },
    // 选择投注内容
    chooseItem(race,playType,type,val){
      let id = race.race_no;
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
          if(!list.get(playType).get(type)){
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
      let race_no = this.chooseMap.get(race.race_no);
      return race_no && race_no.choose && race_no.choose.get(playType) && race_no.choose.get(playType).get(type);
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
      if((this.playType == '499' || this.playType == '411') && this.chooseMap.size <= 1){
        this.$toast('请至少选择1场单关或者任意两场比赛')
      }else if(this.chooseMap.size < 1){
        this.$toast('请至少选择1场单关比赛')
      }else{
        let content = ''; // 投注内容
        let letballs = ''; // 投注让球
        let raceList = []; // map 转为 array 传递到 确认页
        // 数据组装
        this.chooseMap.forEach((v,k)=>{
          let contentItem = '';
          let letballsItem = '';
          raceList.push(v);
          // console.log(v);
          v.choose.forEach((s,j)=>{
            let contentItemItem = '';
            s.forEach((q,w)=>{
              contentItemItem += (`${w}-${q},`);
            });
            if(j == '412'){
              contentItemItem = `${k}[${v.race.zcrace.concede}](${contentItemItem.substring(0,contentItemItem.length - 1)}){${j}}~`;
              letballsItem = v.race.zcrace.concede;
            }else{
              contentItemItem = `${k}(${contentItemItem.substring(0,contentItemItem.length - 1)}){${j}}~`;
              letballsItem = '0';
            }
            contentItem += contentItemItem;
          });
          contentItem = contentItem.substring(0,contentItem.length - 1);
          content += `${contentItem}|`;
          letballs += (`${letballsItem}|`)
        });
        content = content.substring(0,content.length - 1);
        letballs = letballs.substring(0,letballs.length - 1);
        // console.log(content,letballs);
        let params = {
          content: content,
          letballs: letballs,
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
      localStorage.setItem('jclqBetPage',event.target.scrollTop);
    },
  }
}
</script>

<style>
</style>
