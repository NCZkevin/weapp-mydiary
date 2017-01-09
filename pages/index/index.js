//index.js
const AV = require('../../utils/av-weapp-min.js');
const Diary = require('../../model/diary')
var app = getApp()
Page({
  data: {
    diarys: [],
    num: 0,
    winWidth: 0,
    winHeight: 0,

  },
  loginAndFetchTodos: function () {
    return AV.Promise.resolve(AV.User.current()).then(user =>
      user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
    ).then(user =>
      user ? user : AV.User.loginWithWeapp()
      ).then((user) => {
        console.log('uid', user.id);
        return new AV.Query(Diary)
          .equalTo('user', AV.Object.createWithoutData('User', user.id))
          .descending('createdAt')
          .find()
          .then(this.setDiary)
          .catch(console.error);
      }).catch(error => console.error(error.message));
  },
  onReady: function () {
    console.log('page ready');
    this.loginAndFetchTodos();
  },
  onPullDownRefresh: function () {
    this.loginAndFetchTodos().then(wx.stopPullDownRefresh);
  },
  setDiary: function(diarys) {
    this.setData({
      diarys
    })
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /** 
   * 点击show diary
   */
  showDiary: function () {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
})
//获取应用实例
// var app = getApp()
// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {}
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     console.log('onLoad')
//     var that = this
//     //调用应用实例的方法获取全局数据
//     app.getUserInfo(function(userInfo){
//       //更新数据
//       that.setData({
//         userInfo:userInfo
//       })
//     })
//   }
// })
