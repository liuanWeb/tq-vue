<template>
  <div class="jczqBetPage page">
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
                  <div class="flexBox" v-if="playType == 499 || playType == 411">
                    <div class="mPlayBox">
                      <div class="playItem green">
                        <div class="t">0</div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'411','3')}" @click="chooseItem(item2.race,'411','3',item2.spfSpArr[0])">胜 <span class="sp">{{item2.spfSpArr[0]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'411','1')}" @click="chooseItem(item2.race,'411','1',item2.spfSpArr[1])">平 <span class="sp">{{item2.spfSpArr[1]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'411','0')}" @click="chooseItem(item2.race,'411','0',item2.spfSpArr[2])">负 <span class="sp">{{item2.spfSpArr[2]}}</span></div>
                      </div>
                      <div class="playItem" :class="{orange: item2.concede > 0,blue: item2.concede < 0}">
                        <div class="t"><span v-if="item2.concede > 0">+</span>{{item2.concede}}</div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'412','3')}" @click="chooseItem(item2.race,'412','3',item2.rqspfSpArr[0])">胜 <span class="sp">{{item2.rqspfSpArr[0]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'412','1')}" @click="chooseItem(item2.race,'412','1',item2.rqspfSpArr[1])">平 <span class="sp">{{item2.rqspfSpArr[1]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'412','0')}" @click="chooseItem(item2.race,'412','0',item2.rqspfSpArr[2])">负 <span class="sp">{{item2.rqspfSpArr[2]}}</span></div>
                      </div>
                    </div>
<!--                混合投注采用更多玩法-->
                    <div class="more" @click="isShowMorePlayFn(item2)" v-if="playType == 499">
                      <span>更多玩法</span>
                    </div>
                  </div>
<!--              全场让分-->
                  <div class="flexBox" v-if="playType == 412">
                    <div class="mPlayBox" style="line-height: .8rem" @click="isShowMorePlayFn(item2)">
                      点击选择比分投注
                    </div>
                  </div>
<!--              总进球-->
                  <div class="flexBox" v-if="playType == 413">
                    <div class="mPlayBox">
                      <div class="playItem">
                        <div class="c" :class="{cur: addClassCur(item2.race,'414','0')}" @click="chooseItem(item2.race,'414','0',item2.zjqsSpArr[0])">0 <span class="sp">{{item2.zjqsSpArr[0]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'414','1')}" @click="chooseItem(item2.race,'414','1',item2.zjqsSpArr[1])">1 <span class="sp">{{item2.zjqsSpArr[1]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'414','2')}" @click="chooseItem(item2.race,'414','2',item2.zjqsSpArr[2])">2 <span class="sp">{{item2.zjqsSpArr[2]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'414','3')}" @click="chooseItem(item2.race,'414','3',item2.zjqsSpArr[3])">3 <span class="sp">{{item2.zjqsSpArr[3]}}</span></div>
                      </div>
                      <div class="playItem">
                        <div class="c" :class="{cur: addClassCur(item2.race,'414','4')}" @click="chooseItem(item2.race,'414','4',item2.zjqsSpArr[4])">4 <span class="sp">{{item2.zjqsSpArr[4]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'414','5')}" @click="chooseItem(item2.race,'414','5',item2.zjqsSpArr[5])">5 <span class="sp">{{item2.zjqsSpArr[5]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'414','6')}" @click="chooseItem(item2.race,'414','6',item2.zjqsSpArr[6])">6 <span class="sp">{{item2.zjqsSpArr[6]}}</span></div>
                        <div class="c" :class="{cur: addClassCur(item2.race,'414','7')}" @click="chooseItem(item2.race,'414','7',item2.zjqsSpArr[7])">7+ <span class="sp">{{item2.zjqsSpArr[7]}}</span></div>
                      </div>
                    </div>
                  </div>
<!--              半全场-->
                  <div class="flexBox" v-if="playType == 414">
                    <div class="mPlayBox">
                      <div class="playItem">
                        <div class="c">
                          <div class="playItem c">
                            <div class="c" :class="{cur: addClassCur(item2.race,'415','33')}" @click="chooseItem(item2.race,'415','33',item2.bqcSpArr[0])">胜胜 <span class="sp">{{item2.bqcSpArr[0]}}</span></div>
                            <div class="c" :class="{cur: addClassCur(item2.race,'415','31')}" @click="chooseItem(item2.race,'415','31',item2.bqcSpArr[1])">胜平 <span class="sp">{{item2.bqcSpArr[1]}}</span></div>
                            <div class="c" :class="{cur: addClassCur(item2.race,'415','30')}" @click="chooseItem(item2.race,'415','30',item2.bqcSpArr[2])">胜负 <span class="sp">{{item2.bqcSpArr[2]}}</span></div>
                            <div class="c" :class="{cur: addClassCur(item2.race,'415','13')}" @click="chooseItem(item2.race,'415','13',item2.bqcSpArr[3])">平胜 <span class="sp">{{item2.bqcSpArr[3]}}</span></div>
                          </div>
                          <div class="playItem c">
                            <div class="c" :class="{cur: addClassCur(item2.race,'415','10')}" @click="chooseItem(item2.race,'415','10',item2.bqcSpArr[5])">平负 <span class="sp">{{item2.bqcSpArr[5]}}</span></div>
                            <div class="c" :class="{cur: addClassCur(item2.race,'415','03')}" @click="chooseItem(item2.race,'415','03',item2.bqcSpArr[6])">负胜 <span class="sp">{{item2.bqcSpArr[6]}}</span></div>
                            <div class="c" :class="{cur: addClassCur(item2.race,'415','01')}" @click="chooseItem(item2.race,'415','01',item2.bqcSpArr[7])">负平 <span class="sp">{{item2.bqcSpArr[7]}}</span></div>
                            <div class="c" :class="{cur: addClassCur(item2.race,'415','00')}" @click="chooseItem(item2.race,'415','00',item2.bqcSpArr[8])">负负 <span class="sp">{{item2.bqcSpArr[8]}}</span></div>
                          </div>
                        </div>
                        <div class="row2" :class="{cur: addClassCur(item2.race,'415','11')}">
                          <div @click="chooseItem(item2.race,'415','11',item2.bqcSpArr[4])">平平 <span class="sp">{{item2.bqcSpArr[4]}}</span></div>
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
            <div class="playItem green">
              <div class="t ">0</div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'411','3')}" @click="chooseItem(morePlayData.race,'411','3',morePlayData.spfSpArr[0])">胜 <span class="sp">{{morePlayData.spfSpArr[0]}}</span></div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'411','1')}" @click="chooseItem(morePlayData.race,'411','1',morePlayData.spfSpArr[1])">平 <span class="sp">{{morePlayData.spfSpArr[1]}}</span></div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'411','0')}" @click="chooseItem(morePlayData.race,'411','0',morePlayData.spfSpArr[2])">负 <span class="sp">{{morePlayData.spfSpArr[2]}}</span></div>
            </div>
            <div class="playItem" :class="{orange: morePlayData.concede > 0,blue: morePlayData.concede < 0}">
              <div class="t"><span v-if="morePlayData.concede > 0">+</span>{{morePlayData.concede}}</div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'412','3')}" @click="chooseItem(morePlayData.race,'412','3',morePlayData.rqspfSpArr[0])">胜 <span class="sp">{{morePlayData.rqspfSpArr[0]}}</span></div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'412','1')}" @click="chooseItem(morePlayData.race,'412','1',morePlayData.rqspfSpArr[1])">平 <span class="sp">{{morePlayData.rqspfSpArr[1]}}</span></div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'412','0')}" @click="chooseItem(morePlayData.race,'412','0',morePlayData.rqspfSpArr[2])">负 <span class="sp">{{morePlayData.rqspfSpArr[2]}}</span></div>
            </div>
          </div>
          <div class="mPlayBox">
            <div class="playItem red">
              <div class="t">胜</div>
              <div class="c">
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','10')}" @click="chooseItem(morePlayData.race,'413','10',morePlayData.bfSpArr[0])">1:0 <span class="sp">{{morePlayData.bfSpArr[0]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','20')}" @click="chooseItem(morePlayData.race,'413','20',morePlayData.bfSpArr[1])">2:0 <span class="sp">{{morePlayData.bfSpArr[1]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','21')}" @click="chooseItem(morePlayData.race,'413','21',morePlayData.bfSpArr[2])">2:1 <span class="sp">{{morePlayData.bfSpArr[2]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','30')}" @click="chooseItem(morePlayData.race,'413','30',morePlayData.bfSpArr[3])">3:0 <span class="sp">{{morePlayData.bfSpArr[3]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','31')}" @click="chooseItem(morePlayData.race,'413','31',morePlayData.bfSpArr[4])">3:1 <span class="sp">{{morePlayData.bfSpArr[4]}}</span></div>
                </div>
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','32')}" @click="chooseItem(morePlayData.race,'413','32',morePlayData.bfSpArr[5])">3:2 <span class="sp">{{morePlayData.bfSpArr[5]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','40')}" @click="chooseItem(morePlayData.race,'413','40',morePlayData.bfSpArr[6])">4:0 <span class="sp">{{morePlayData.bfSpArr[6]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','41')}" @click="chooseItem(morePlayData.race,'413','41',morePlayData.bfSpArr[7])">4:1 <span class="sp">{{morePlayData.bfSpArr[7]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','42')}" @click="chooseItem(morePlayData.race,'413','42',morePlayData.bfSpArr[8])">4:2 <span class="sp">{{morePlayData.bfSpArr[8]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','50')}" @click="chooseItem(morePlayData.race,'413','50',morePlayData.bfSpArr[9])">5:0 <span class="sp">{{morePlayData.bfSpArr[9]}}</span></div>
                </div>
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','51')}" @click="chooseItem(morePlayData.race,'413','51',morePlayData.bfSpArr[10])">5:1 <span class="sp">{{morePlayData.bfSpArr[10]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','52')}" @click="chooseItem(morePlayData.race,'413','52',morePlayData.bfSpArr[11])">5:2 <span class="sp">{{morePlayData.bfSpArr[11]}}</span></div>
                  <div class="c f3" :class="{cur: addClassCur(morePlayData.race,'413','90')}" @click="chooseItem(morePlayData.race,'413','90',morePlayData.bfSpArr[12])">胜其他 <span class="sp">{{morePlayData.bfSpArr[12]}}</span></div>
                </div>
              </div>
            </div>
            <div class="playItem green">
              <div class="t">平</div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','00')}" @click="chooseItem(morePlayData.race,'413','00',morePlayData.bfSpArr[13])">0:0 <span class="sp">{{morePlayData.bfSpArr[13]}}</span></div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','11')}" @click="chooseItem(morePlayData.race,'413','11',morePlayData.bfSpArr[14])">1:1 <span class="sp">{{morePlayData.bfSpArr[14]}}</span></div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','22')}" @click="chooseItem(morePlayData.race,'413','22',morePlayData.bfSpArr[15])">2:2 <span class="sp">{{morePlayData.bfSpArr[15]}}</span></div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','33')}" @click="chooseItem(morePlayData.race,'413','33',morePlayData.bfSpArr[16])">3:3 <span class="sp">{{morePlayData.bfSpArr[16]}}</span></div>
              <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','99')}" @click="chooseItem(morePlayData.race,'413','99',morePlayData.bfSpArr[17])">平其他 <span class="sp">{{morePlayData.bfSpArr[17]}}</span></div>
            </div>
            <div class="playItem blue">
              <div class="t">负</div>
              <div class="c">
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','01')}" @click="chooseItem(morePlayData.race,'413','01',morePlayData.bfSpArr[18])">0:1 <span class="sp">{{morePlayData.bfSpArr[18]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','02')}" @click="chooseItem(morePlayData.race,'413','02',morePlayData.bfSpArr[19])">0:2 <span class="sp">{{morePlayData.bfSpArr[19]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','12')}" @click="chooseItem(morePlayData.race,'413','12',morePlayData.bfSpArr[20])">1:2 <span class="sp">{{morePlayData.bfSpArr[20]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','03')}" @click="chooseItem(morePlayData.race,'413','03',morePlayData.bfSpArr[21])">0:3 <span class="sp">{{morePlayData.bfSpArr[21]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','13')}" @click="chooseItem(morePlayData.race,'413','13',morePlayData.bfSpArr[22])">1:3 <span class="sp">{{morePlayData.bfSpArr[22]}}</span></div>
                </div>
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','23')}" @click="chooseItem(morePlayData.race,'413','23',morePlayData.bfSpArr[23])">2:3 <span class="sp">{{morePlayData.bfSpArr[23]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','04')}" @click="chooseItem(morePlayData.race,'413','04',morePlayData.bfSpArr[24])">0:4 <span class="sp">{{morePlayData.bfSpArr[24]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','14')}" @click="chooseItem(morePlayData.race,'413','14',morePlayData.bfSpArr[25])">1:4 <span class="sp">{{morePlayData.bfSpArr[25]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','24')}" @click="chooseItem(morePlayData.race,'413','24',morePlayData.bfSpArr[26])">2:4 <span class="sp">{{morePlayData.bfSpArr[26]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','05')}" @click="chooseItem(morePlayData.race,'413','05',morePlayData.bfSpArr[27])">0:5 <span class="sp">{{morePlayData.bfSpArr[27]}}</span></div>
                </div>
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','15')}" @click="chooseItem(morePlayData.race,'413','15',morePlayData.bfSpArr[28])">1:5 <span class="sp">{{morePlayData.bfSpArr[28]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'413','25')}" @click="chooseItem(morePlayData.race,'413','25',morePlayData.bfSpArr[29])">2:5 <span class="sp">{{morePlayData.bfSpArr[29]}}</span></div>
                  <div class="c f3" :class="{cur: addClassCur(morePlayData.race,'413','09')}" @click="chooseItem(morePlayData.race,'413','09',morePlayData.bfSpArr[30])">负其他 <span class="sp">{{morePlayData.bfSpArr[30]}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="mPlayBox" v-if="playType == 499">
            <div class="playItem red">
              <div class="t f3">总进球</div>
              <div class="c">
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'414','0')}" @click="chooseItem(morePlayData.race,'414','0',morePlayData.zjqsSpArr[0])">0 <span class="sp">{{morePlayData.zjqsSpArr[0]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'414','1')}" @click="chooseItem(morePlayData.race,'414','1',morePlayData.zjqsSpArr[1])">1 <span class="sp">{{morePlayData.zjqsSpArr[1]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'414','2')}" @click="chooseItem(morePlayData.race,'414','2',morePlayData.zjqsSpArr[2])">2 <span class="sp">{{morePlayData.zjqsSpArr[2]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'414','3')}" @click="chooseItem(morePlayData.race,'414','3',morePlayData.zjqsSpArr[3])">3 <span class="sp">{{morePlayData.zjqsSpArr[3]}}</span></div>
                </div>
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'414','4')}" @click="chooseItem(morePlayData.race,'414','4',morePlayData.zjqsSpArr[4])">4 <span class="sp">{{morePlayData.zjqsSpArr[4]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'414','5')}" @click="chooseItem(morePlayData.race,'414','5',morePlayData.zjqsSpArr[5])">5 <span class="sp">{{morePlayData.zjqsSpArr[5]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'414','6')}" @click="chooseItem(morePlayData.race,'414','6',morePlayData.zjqsSpArr[6])">6 <span class="sp">{{morePlayData.zjqsSpArr[6]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'414','7')}" @click="chooseItem(morePlayData.race,'414','7',morePlayData.zjqsSpArr[7])">7+ <span class="sp">{{morePlayData.zjqsSpArr[7]}}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="mPlayBox" v-if="playType == 499">
            <div class="playItem red">
              <div class="t f3">半全场</div>
              <div class="c">
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','33')}" @click="chooseItem(morePlayData.race,'415','33',morePlayData.bqcSpArr[0])">胜胜 <span class="sp">{{morePlayData.bqcSpArr[0]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','31')}" @click="chooseItem(morePlayData.race,'415','31',morePlayData.bqcSpArr[1])">胜平 <span class="sp">{{morePlayData.bqcSpArr[1]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','30')}" @click="chooseItem(morePlayData.race,'415','30',morePlayData.bqcSpArr[2])">胜负 <span class="sp">{{morePlayData.bqcSpArr[2]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','13')}" @click="chooseItem(morePlayData.race,'415','13',morePlayData.bqcSpArr[3])">平胜 <span class="sp">{{morePlayData.bqcSpArr[3]}}</span></div>
                </div>
                <div class="playItem c">
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','10')}" @click="chooseItem(morePlayData.race,'415','10',morePlayData.bqcSpArr[5])">平负 <span class="sp">{{morePlayData.bqcSpArr[5]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','03')}" @click="chooseItem(morePlayData.race,'415','03',morePlayData.bqcSpArr[6])">负胜 <span class="sp">{{morePlayData.bqcSpArr[6]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','01')}" @click="chooseItem(morePlayData.race,'415','01',morePlayData.bqcSpArr[7])">负平 <span class="sp">{{morePlayData.bqcSpArr[7]}}</span></div>
                  <div class="c" :class="{cur: addClassCur(morePlayData.race,'415','00')}" @click="chooseItem(morePlayData.race,'415','00',morePlayData.bqcSpArr[8])">负负 <span class="sp">{{morePlayData.bqcSpArr[8]}}</span></div>
                </div>
              </div>
              <div class="row2" :class="{cur: addClassCur(morePlayData.race,'415','11')}">
                <div  @click="chooseItem(morePlayData.race,'415','11',morePlayData.bqcSpArr[4])">平平 <span class="sp">{{morePlayData.bqcSpArr[4]}}</span></div>
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
  name: 'jczqBetPage',
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
          title: '胜平负(让)',
          type: 411
        },
        {
          title: '全场比分',
          type: 412
        },
        {
          title: '总进球',
          type: 413
        },
        {
          title: '半全场',
          type: 414
        },
        {
          title: '单场决胜',
          type: 415
        },
      ],
      isShowBetListPop: false, // 头部下啦弹窗
      lotteryType: 407, // 彩种
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
      this.$api.betPageApi.jczq.getRace({playType: this.playType}).then(data=>{
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
      localStorage.setItem('jczqBetPage',event.target.scrollTop);
    },
  }
}
</script>

<style>
</style>
