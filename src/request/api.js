// 统一管理接口
import QS from 'qs';
import { get, post } from './http';


// 接口域名
const baseUrl = {
  v_1: '/api/apis_v1', // 默认请求路径
  v_2: '/api/apis_v2'   // 比分数据请求接口路径
}


// 首页接口
const homePageApi = {
  template (params) {
    return post(baseUrl.v_1 + '/rest?method=ifeng.template&v=1.0&type=1', params);
  }
};

// 投注面板
const betPageApi = {
  // 竞彩足球 投注面板列表数据
  jczq:{
    getRace(params){
      return post(baseUrl.v_1 + '/rest?method=ifeng.sports.jc.race.get&v=1.0&type=1', params);
    }
  },
  jclq:{
    getRace(params){
      return post(baseUrl.v_1 + '/rest?method=ifeng.sports.lc.race.get&v=1.0&type=1', params);
    }
  },
  // 胜负彩 任选九 投注面板列表数据
  sfcRxj:{
    getRace(params){
      return post(baseUrl.v_1 + '/rest?method=ifeng.sports.zc.race.get&v=1.0&type=1', params);
    }
  },
  // 投注确认页面数据
  pay:{
    // 获取账户余额
    getBalance(params){
      return post(baseUrl.v_1 + '/rest?method=ifeng.member.wallet.get&v=1.0&type=1', params);
    },
    // 支付
    toPay:{
      // 竞彩足球 支付
      jczq(params){
        return post(baseUrl.v_1 + '/rest?method=ifeng.bet.jczq.create&v=1.0&type=1', params);
      },
      // 胜负彩 任选九 支付
      jjc(params){
        return post(baseUrl.v_1 + '/rest?method=ifeng.bet.jjc.create&v=1.0&type=1', params);
      }
    }
  }
}

// 比分数据
const matchPageApi = {
  footBall: {
    matchList(params){
      params.apiName = "getMatchListByDate";
      return post(baseUrl.v_2, {data: JSON.stringify(params)});
    }
  }
}


// 登录中心
const loginPageApi = {
  // 获取用户头像
  getUHeadImg(params){
    return post(baseUrl.v_1 + '/rest?method=ifeng.member.usericon.get&v=1.0', params);
  },
  // 登录
  login(params){
    return post(baseUrl.v_1 + '/rest?method=ifeng.member.phone_login_pwd&v=1.0', params);
  }
}

export default {
  homePageApi,
  betPageApi,
  loginPageApi,
  matchPageApi
}

