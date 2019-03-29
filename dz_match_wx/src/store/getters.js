const getters = {
  userCurrent: state => state.user.current,//获取当前登录
  accessArr: state => state.user.accessArr,//权限
  userType: state => state.user.userType,//用户类型
};
export default getters
