const EVENTBASEURL="event-api/api/"
const LTBASEURL="lt-api/api/"

let baseURL='';
if(process.env.NODE_ENV === 'development'){
   baseURL ='http://192.168.3.132:8080/';  //开发环境
}else if (process.env.NODE_ENV === 'production'){
   baseURL =''; //生产环境
}


const NEWEVENTBASEURL="event-api"
const URL={
  //EVENTBASEURL
  getStation:EVENTBASEURL+'listSubstation',

  getSelect:EVENTBASEURL+'findMatches',


  //ITBASEURL
  getTypes:LTBASEURL+'listLevelCategory',
  getClass:LTBASEURL+'listTestLevel',
  searchPlayer:LTBASEURL+'queryPerson',
  getPayList:LTBASEURL+'listRegistrationInfoByOrg',        //获取订单

  countMoney:LTBASEURL+'conutOrderMoney',
  saveMoney:LTBASEURL+'addPayOrder',

  savePlayer:LTBASEURL+'putRegistrationInfo',


  /*toRegister:'/auth-api/sports-auth/public/register',   //去注册*/
  dologin:'/auth-api/sports-auth/public/dologin',   //登录
  /* getUserInfo:'/person/getPersonInfo',*/   //获取用户信息

  //个人完善
  savePerson:'/uc-api/sports-uc/platform/completionPersonInfo',   //保存个人

  discern:baseURL+'/uc-api/sports-uc/platform/uploadIdCard',   //识别

  saveOrgan: 'uc-api/sports-uc/platform/completionOrgInfo',// 保存组织
  /*doLogout:'/auth-api/sports-auth/public/logout', //退出*/

  getPersonMsg: '/person/getPersonInfo',//获取个人用户信息
  //getOrganMsg: '/person/getPersonInfo',//获取组织信息

  getAllPayList:'/sports-lt/api/listRegistrationInfo',         //获取所有订单

  saveMoney1:'/sports-lt/api/addPayOrder',         //个人信息点击缴费
  deletePlay:`${LTBASEURL}/deleteRegistrationInfo`,         //个人信息点击删除

/*  getAllOrderList:'/sports-lt/api/queryOrder',         //获取待支付详情*/
  deleteOrderStatus:  `${LTBASEURL}/deleteOrderStatus`,         //删除订单
  // 修改密码
  updatePwd: '/auth-api/sports-auth/public/updatePassword',
  // 检查密码
  checkPwd: '/auth-api/sports-auth/public/checkOldPassword',

  // 重置密码
  resetPwd: '/auth-api/sports-auth/public/resetPassword',
  // 找回密码短信验证接口
  sendVcodeForPwd: '/auth-api/sports-auth/public/sendVcodeForPwd',
  judgeFull: '/uc-api/sports-uc/platform/checkIsCompletionInfo',   //判断是否信息完整


  //新赛事
  personLogin :'uc-api/system/personLogin',        //登录
  doLogout :'uc-api/system/logout',        //登出
  loginStatus :'uc-api/system/loginStatus',        //判断登录
  submitOrganForm:'uc-api/person/completeInfo',     //完善信息
  toRegister:'uc-api/system/register',
  getCode:'uc-api/system/sendVcodeForRegister',   //获取验证码


  getEventlist :NEWEVENTBASEURL+'/public/pageEventsList',
  listEventsByEnroll :NEWEVENTBASEURL+'/public/listEventsByEnroll',
  eventdetail :NEWEVENTBASEURL+'/public/eventdetail',
  eventnoticelist :NEWEVENTBASEURL+'/public/eventnoticelist',     //公告列表
  eventfilelist:NEWEVENTBASEURL+'/public/eventfilelist',     //公告详情
  eventnoticedetail:NEWEVENTBASEURL+'/public/eventnoticedetail',     //通知详情
  getEventGroupList:NEWEVENTBASEURL+'/public/getEventGroupList',     //获取组别
  getEventColumnList:NEWEVENTBASEURL+'/public/getEventColumnList',     //获取组别
  saveEnrollInfo:NEWEVENTBASEURL+'/public/saveEnrollInfo',     //保存
  conutOrderMoney:NEWEVENTBASEURL+'/api/conutOrderMoney',     //计算金额
  addPayOrder:NEWEVENTBASEURL+'/api/addPayOrder',     //点击支付，生成订单
  getAllOrderList:NEWEVENTBASEURL+'/api/queryOrder',     //获取订单列表信息
  listEventLog:NEWEVENTBASEURL+'/eventLog/listEventLog',     //运动生涯list
  eventLogDetails:NEWEVENTBASEURL+'/eventLogPublic/eventLogDetails',     //运动生涯list

  mapUrl:baseURL+NEWEVENTBASEURL+'/static/preview.html',   //地图页面路径

  //报名信息
  getApplyList:NEWEVENTBASEURL+'/enroll/listEnroll'
}

module.exports = URL;
