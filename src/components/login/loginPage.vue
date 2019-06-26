<template>
  <div class="loginPage page">
    <mHead title="登录"></mHead>
    <div class="content">
      <div class="loginBox">
<!--        登录框-->
        <div class="main">
          <div class="headImg imgBox">
            <img :src="headImg" alt="" onerror="this.src='static/img/test.jpg'">
          </div>
          <div class="iptBox">
            <div class="item" style="z-index: 9">
              <i class="icon iconName"></i>
              <input type="tel"  v-model="account" class="ipt iptName" placeholder="请输入您的手机号码..." maxlength="11">
              <a title="显示/隐藏手机号码记录" class="btn btnShowList" @click="isShowAccountListFn"></a>
              <div class="accountList" v-show="isShowAccountList && (accountList && accountList.length > 0)">
                <div class="accountItem" v-for="(item,index) in accountList" :key="index">
                  <p class="num" @click="chooseAccount(item)">{{item}}</p>
                  <a title="删除" class="btnDel" @click="deleteAccount(item)">x</a>
                </div>
              </div>
            </div>
            <div class="item" v-show="!isShowAccountList">
              <i class="icon iconPwd"></i>
              <input type="password" v-model="password" class="ipt iptPwd" placeholder="请输入您的登录密码..." maxlength="16">
              <a title="显示/隐藏密码" class="btn btnShowPwd show"></a>
            </div>
            <a title="登录" v-show="!isShowAccountList" @click="login" class="btnLogin mBtn" :class="{noBg:btnAddClass}"><span>{{loginText}}</span></a>
            <div class="ovh linkBox" v-show="!isShowAccountList">
              <a class="fl">短信登录</a>
              <a class="fr">忘记密码</a>
            </div>
          </div>
        </div>
<!--        第三方登录-->
        <div class="otherLogin">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mHead from '../common/mHead'
export default {
  name: 'loginPage',
  components:{ mHead},
  created(){
    let list = localStorage.getItem('accountList');
    if(list) this.accountList = JSON.parse(list);
    this.returnUrl = this.$route.query.path;
  },
  data() {
    return {
      account: '',  // s手机号码
      password: '', // 密码
      headImg: 'static/img/test.jpg', // 头像
      accountList:[], // 账号历史记录
      isShowAccountList:false, // 显示/隐藏历史记录
      btnAddClass: true,
      loginText: '立即登录', // 登录按钮文案
      returnUrl: '', // 返回上一个页面的路径
    }
  },
  methods: {
    // 登录
    login(){
      if(!this.account || !this.password){
        return;
      }
      if(this.account.length < 11 || this.password < 6){
        this.$toast('请输入正确的用户名/密码！');
        return;
      }
      let params = {
        account: this.account,  // s手机号码
        password: this.password, // 密码
        headImg: this.headImg
      };
      this.loginText = '登录ing....'
      this.$api.loginPageApi.login(params).then(data=>{
        if(data.code == '0000'){
          localStorage.setItem('sid',data.sessionId);
          console.log(typeof this.accountList);
          if(this.accountList && this.accountList.indexOf(this.account) != -1){
            this.accountList.splice(this.accountList.indexOf(this.account),1)
          }
          this.accountList.unshift(this.account);
          localStorage.setItem('accountList',JSON.stringify(this.accountList));
          this.loginText = '登录成功！';
          setTimeout(()=>{
            this.$store.commit("setTransition", "turn-off");
            this.$router.push({path:this.returnUrl});
          },500)

        }
      });
    },
    // 显示/隐藏历史记录
    isShowAccountListFn(){
      if(this.accountList && this.accountList.length > 0){
        this.isShowAccountList = !this.isShowAccountList;
      }
    },
    // 选中历史记录
    chooseAccount(item){
      this.account = item;
      this.isShowAccountList = false;
    },
    // 删除历史记录
    deleteAccount(item){
      this.accountList.splice(this.accountList.indexOf(item),1);
      localStorage.setItem('accountList',JSON.stringify(this.accountList));
      this.isShowAccountList = false;
    }
  },
  watch: {
    // 手机号码输入 11 位数后自动获取头像
    account(newVal,oldVal){
      if(newVal.length == 11){
        this.$api.loginPageApi.getUHeadImg({'account':this.account}).then( data =>{
            if(data.code == '0000'){
              this.headImg = data.result.icon;
            }else{
              setTimeout(()=>{
                this.account = '';
              },300)
            }
        })
      }
      if(newVal.length < 11){
        this.password = '';
      }
    },
    // 手机号码以输入成功 且 密码长度大于5 才可以登录
    password(newVal,oldVal){
      if(newVal.length >= 6 && this.account.length == 11){
        this.btnAddClass = false;
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>

</style>
