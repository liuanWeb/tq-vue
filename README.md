# vue-tq
- tuiqiu app vue
- Liu An 
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

### 注意事项
- 页面css全写在app.scss文件 使用sass 每个页面以该页面名称作为根class
- 通用组建css写在该组建内

### src目录
- asset：静态资源
  * scss:
  * img:
  * js:
- components: 组建
  * tabs: tab页面
    * tabs: 底部导航页面容器
  * common: 公共组建
    * goBack: 返回按钮
    * newList：资讯列表
    * followList：跟单列表
    * mHead: 通用头部 带返回按钮+标题
  * home: 首页
  * bet：投注面板
    * jjzq：竞彩足球
    * sfc： 胜负彩
    * bjdc：北京单场
    * pls： 排列三
  * login：
    * loginPage: 登录页面
  * mtach：比分-资料库
    * matchCenter: 比分
      * footBall：足球赛事
      * basketBall： 篮球赛事
    * mtachData: 资料库
  * news： 资讯
  * user： 个人中心
- request: 请求文件
  * http: axios封装
  * api：http接口管理
  * store：缓存处理
