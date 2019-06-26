<template>
  <div class="betPage page">
    <div class="header">
      <a title="返回" @click="goBack()" class="btnGoBack btn lf1"></a>
      <p class="title">投注确认</p>
    </div>
    <p class="stopTips">2019-01-15  10:45截止,请尽快提交投注</p>
    <div class="btnBox">
      <a title="添加比赛" @click="goBack()" class="btnAddMatch">+添加比赛 (已选<span class="fontRed"> {{chooseMap.length}} </span>场)</a>
    </div>
    <div class="content">
      <div class="list">
        <div class="item" v-for="(item,index) in chooseMap" v-if="chooseMap && chooseMap.length > 0" :key="index">
          <div class="left">
            <a title="删除" @click="del(item,index)" class="btnDel"></a>
          </div>
          <div class="right">
            <div class="hd">
              <div class="tit">
                <p class="teamName"><span>(主)</span>{{item.race.home_team}}</p>
                <p class="vs">VS</p>
                <p class="teamName">{{item.race.guest_team}}<span>(客)</span></p>
              </div>
              <span class="num">{{item.race.view_race_no}}</span>
            </div>
            <div class="cont">
              <div class="contItem" v-for="(item2,index2) in item.choose" v-if="item.choose" :key="index2">
<!--                {{item2}}-->
                <span v-if="item2[0] == '411'">胜平负</span>
                <span v-if="item2[0] == '412'">让球胜平负</span>
                <span v-if="item2[0] == '413'">全场比分</span>
                <span v-if="item2[0] == '414'">总进球数</span>
                <span v-if="item2[0] == '415'">半全场</span>
                <span v-if="item2[0] == '499'">混合投注</span>
                <span v-if="item2[0] == '401'">胜负彩</span>
                <span v-if="item2[0] == '402'">任选九</span>
                <p v-for="(item3,index3) in item2[1]" v-if="item2 && item2[1]" :key="index3">
                  <span class="fontRed">
                    <span v-if="item3[0] == '3' && playType != 414">主胜</span>
                    <span v-if="item3[0] == '1' && playType != 414">平</span>
                    <span v-if="item3[0] == '0' && playType != 414">客胜</span>
                    <span v-if="item3[0] == '10'">1:0</span>
                    <span v-if="item3[0] == '20'">2:0</span>
                    <span v-if="item3[0] == '21'">2:1</span>
                    <span v-if="item3[0] == '30'">3:0</span>
                    <span v-if="item3[0] == '31'">3:1</span>
                    <span v-if="item3[0] == '32'">3:2</span>
                    <span v-if="item3[0] == '40'">4:0</span>
                    <span v-if="item3[0] == '41'">4:1</span>
                    <span v-if="item3[0] == '42'">4:2</span>
                    <span v-if="item3[0] == '50'">5:0</span>
                    <span v-if="item3[0] == '51'">5:1</span>
                    <span v-if="item3[0] == '52'">5:2</span>
                    <span v-if="item3[0] == '90'">胜其他</span>
                    <span v-if="item3[0] == '00'">0:0</span>
                    <span v-if="item3[0] == '11'">1:1</span>
                    <span v-if="item3[0] == '22'">2:2</span>
                    <span v-if="item3[0] == '33'">3:3</span>
                    <span v-if="item3[0] == '01'">0:1</span>
                    <span v-if="item3[0] == '02'">0:2</span>
                    <span v-if="item3[0] == '12'">1:2</span>
                    <span v-if="item3[0] == '03'">0:3</span>
                    <span v-if="item3[0] == '13'">1:3</span>
                    <span v-if="item3[0] == '23'">2:3</span>
                    <span v-if="item3[0] == '04'">0:4</span>
                    <span v-if="item3[0] == '14'">1:4</span>
                    <span v-if="item3[0] == '24'">2:4</span>
                    <span v-if="item3[0] == '05'">0:5</span>
                    <span v-if="item3[0] == '15'">1:5</span>
                    <span v-if="item3[0] == '25'">2:5</span>
                    <span v-if="item3[0] == '09'">负其他</span>
                    <span v-if="item3[0] == '0' && playType == 414">0</span>
                    <span v-if="item3[0] == '1' && playType == 414">1</span>
                    <span v-if="item3[0] == '2' && playType == 414">2</span>
                    <span v-if="item3[0] == '3' && playType == 414">3</span>
                    <span v-if="item3[0] == '4' && playType == 414">4</span>
                    <span v-if="item3[0] == '5' && playType == 414">5</span>
                    <span v-if="item3[0] == '6' && playType == 414">6</span>
                    <span v-if="item3[0] == '7' && playType == 414">7+</span>
                  </span>
                  <span class="fontGray">({{item3[1]}})</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mBetSubmitBox">
      <a class="btnDel btnLeft" @click="delBetContent()">发单</a>
      <div class="txtBox">
        <p class="tit">已选 <span class="fontRed">{{notes}}</span> 注，金额 <span class="fontRed">{{notes * 2 * multiple}}</span> 元</p>
        <p class="tips" v-if="lotteryType == 407">
          预计奖金：
          <span class="fontRed" v-if="minCombina != maxCombina">{{minCombina.toFixed(2) * 2 * multiple}} ～ {{maxCombina.toFixed(2) * 2 * multiple}} 元</span>
          <span class="fontRed" v-if="minCombina == maxCombina">{{minCombina.toFixed(2) * 2 * multiple}} 元</span>
        </p>
        <p class="tips" v-if="lotteryType == 401 || lotteryType == 402">
          最高奖金：500万
        </p>
      </div>
      <a class="btnSubmit" @click="setDataType()">立即投注</a>
    </div>
  </div>
</template>

<script>
import mHead from '../../common/mHead'
export default {
  name: 'betPage',
  components:{
    mHead
  },
  activated(){
    this.deleteList = [];
    this.maxCombina = 1;
    this.minCombina = 1;
    this.multiple = 1;
    this.notes=1;
    this.content = this.$route.query.content;
    console.log(this.content);
    this.letballs = this.$route.query.letballs;
    this.chooseMap = JSON.parse(this.$route.query.chooseMap);
    this.playType = this.$route.query.playType;
    this.issueNo = this.$route.query.issueNo;
    this.lotteryType = this.$route.query.lotteryType;
    this.getNotes();
  },
  created(){
  },
  data() {
    return {
      content:'', // 组装数据
      letballs:'', // 让球
      chooseMap: [], // 已选赛事数据
      deleteList:[], // 删除 数据 id 列表
      notes: 1, // 注数
      multiple: 1, // 倍数
      maxCombina: 1,  // 最大赔率
      minCombina: 1, // 最小赔率
      issueNo: '', // 期号
      lotteryType: '', // 彩种
      playType: '', //玩法类型
      passType: '', // 过关方式
      returnUrl: '',
    };
  },
  beforeRouteEnter(to,from,next){
    next(vm => {
      // 通过 `vm` 访问组件实例,将值传入oldUrl
      vm.returnUrl = from.path
    })
  },
  methods: {
    // 删除
    del(item,index){
      this.deleteList.push(item.id);
      this.chooseMap.splice(index,1);
      console.log(this.chooseMap);
      this.getNotes();
    },
    // 返回
    goBack(){
      console.log(this.$router.history.current.path);
      this.$store.commit("setTransition", "turn-off");
      this.$router.push({path:this.returnUrl,query:{deleteList:this.deleteList,load:false}})
    },
    // 获取注数
    getNotes(){
      console.log(this.chooseMap.length,this.lotteryType);
      if(this.lotteryType == '407' || this.lotteryType == '401'){
        console.log('99999999999');
        for(let k = 0;k < this.chooseMap.length; k++){
          let maxTxt = [];
          for (let j = 0; j < this.chooseMap[k].choose.length; j++){
            for(let s = 0; s < this.chooseMap[k].choose[j][1].length; s++){
              maxTxt.push(this.chooseMap[k].choose[j][1][s][1]);
            }
            this.notes *=  this.chooseMap[k].choose[j][1].length;
          }
          let max = Math.max.apply(Math,maxTxt)?Math.max.apply(Math,maxTxt):1;
          let min = Math.min.apply(Math,maxTxt)?Math.min.apply(Math,maxTxt):1;
          // console.log(max,min);
          this.maxCombina *= max;
          this.minCombina *= min;
        }
      }
      else if(this.lotteryType == '402'){
        let pickList=[];
        this.chooseMap.forEach((v,k)=>{
          pickList.push(v.choose[0][1].length)
        });
        this.notes = this.getZhuShu([9], pickList, pickList.length);
      }
    },
    // 任选九 获取注数
    getZhuShu (passTypes, tuoLengthArray, tuoValueLength) {
      var zhushu = 0;
      var passTypesLength = passTypes.length;
      //去重做法
      for (var i = 0; i < passTypesLength; i++) {
        zhushu += this.combineTotalCount(tuoLengthArray, tuoValueLength, passTypes[i]);
      }
      return zhushu;
    },
    // 注数去重复
    combineTotalCount(str, n, m) {
      m = m > n ? n : m;
      var ret = 0;
      var order = [];
      for (var i = 0; i <= m; i++) {
        order[i] = i - 1;      // 注意这里order[0]=-1用来作为循环判断标识
      }
      // var count = 0;
      var k = m;
      var flag = true;          // 标志找到一个有效组合
      while (order[0] == -1) {
        if (flag)                   // 输出符合要求的组合
        {
          var sumCount = 1;
          for (var j = 1; j <= m; j++) {
            // count++;
            sumCount *= str[order[j]];
          }
          flag = false;
          ret += sumCount;
        }
        order[k]++;
        if (order[k] == n) {
          order[k--] = 0;
          continue;
        }
        if (k < m) {
          order[++k] = order[k - 1];
          continue;
        }
        if (k == m) {
          flag = true;
        }
      }
      return ret;
    },

    // 数据组装
    setDataType(){
      let content = ''; // 投注内容
      let letballs = ''; // 投注让球
      // 数据组装
      if(this.lotteryType == '407'){
        this.chooseMap.forEach((v,k)=>{
          let contentItem = '';
          let letballsItem = '';
          v.choose.forEach((s,j)=>{
            let contentItemItem = '';
            // console.log(s);
            s[1].forEach((q,w)=>{
              // console.log(q);
              contentItemItem += (`${q[0]}-${q[1]},`);
            });
            if(s[0] == '412'){
              contentItemItem = `${v.id}[${v.race.zcrace.concede}](${contentItemItem.substring(0,contentItemItem.length - 1)}){${s[0]}}~`;
              letballsItem = v.race.zcrace.concede;
            }else{
              contentItemItem = `${v.id}(${contentItemItem.substring(0,contentItemItem.length - 1)}){${s[0]}}~`;
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
      }
      else if(this.lotteryType == '401' || this.lotteryType == '402'){
        let list = ['_','_','_','_','_','_','_','_','_','_','_','_','_','_'];
        this.chooseMap.forEach((v,k)=>{
          let contentItem = '';
          let letballsItem = '';
          v.choose.forEach((s,j)=>{
            let contentItemItem = '';
            // console.log(s.size);
            s[1].forEach((q,w)=>{
              contentItemItem += `${q[0]},`;
            });
            contentItem += contentItemItem;
          });
          contentItem = contentItem.substring(0,contentItem.length - 1);
          list[v.race.m_index - 1] = contentItem;
        });
        content = list.join('|');
      }

      switch (this.chooseMap.length) {
        case 1:
          this.passType = 401;
          break;
        case 2:
          this.passType = 402;
          break;
        case 3:
          this.passType = 404;
          break;
        case 4:
          this.passType = 409;
          break;
        case 5:
          this.passType = 417;
          break;
        case 6:
          this.passType = 428;
          break;
        case 7:
          this.passType = 443;
          break;
        case 8:
          this.passType = 450;
          break;
        case 9:
          this.passType = 458;
          break;
        case 10:
          this.passType = 459;
          break;
        default:
          break;
      }
      let params = {
        content: content,
        letballs: letballs,
        multiple: this.multiple,
        amount:this.notes * 2 * this.multiple,
        lotteryType: this.lotteryType,
        issueNo: this.issueNo,
        playType: this.playType,
        passType: this.passType,
      };
      console.log(params);
      this.$navPush('payPage',params);
    }
  }
}
</script>

<style>
</style>
