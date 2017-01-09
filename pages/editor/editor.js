// pages/editor/editor.js
const AV = require('../../utils/av-weapp-min.js');
const Diary = require('../../model/diary');
Page({
  data: {
    array: ['/images/ic_mood_happy.png', '/images/ic_mood_soso.png', '/images/ic_mood_unhappy.png'],
    textArray: ['开心', '一般', '不开心'],
    weatherArray: ['晴', '阴', '雾', '雨', '雪', '风'],
    wiconArray: ['/images/ic_weather_sunny.png', '/images/ic_weather_cloud.png', '/images/ic_weather_foggy.png', '/images/ic_weather_rainy.png', '/images/ic_weather_snowy.png', '/images/ic_weather_windy.png',],
    // objectArray: [
    //   {
    //     id: 0,
    //     name: '开心'
    //   },
    //   {
    //     id: 1,
    //     name: '一般'
    //   },
    //   {
    //     id: 2,
    //     name: '不开心'
    //   }
    // ],
    index: 0,
    w_index: 0,
    date: '2016-09-01',
    time: {},
    title: '',
    content: '',
    saveStatus: '发布'
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindWeatherChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      w_index: e.detail.value
    })
  },
  updateTitle: function ({
    detail: {
      value
    }
  }) {
    if (!value) return;
    this.setData({
      title: value
    });
  },
  updateContent: function ({
    detail: {
      value
    }
  }) {
    if (!value) return;
    this.setData({
      content: value
    });
  },
  saveDiary: function () {
    // var Diary = AV.Object.extend('Diary');
    // var diary = new Diary();
    var d_title = this.data.title;
    var d_content = this.data.content;
    var index = this.data.index;
    var w_index = this.data.w_index;
    var icon = this.data.array[index];
    var we_icon = this.data.wiconArray[index];
    var time = this.nowDate();
    var acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(AV.User.current(), true);
    acl.setWriteAccess(AV.User.current(), true);
    new Diary({
      title: d_title,
      content: d_content,
      user: AV.User.current(),
      icon: icon,
      we_icon: we_icon,
      day: time.day,
      month: time.month,
      week: time.week
    }).setACL(acl).save().then(wx.navigateTo({
      url: '../index/index',
    })).catch(console.error);
  },
changeStatus: function () {
  this.setData({
    saveStatus: '已经保存'
  })
},
nowDate: function () {
  var time = new Object();
  var date = new Date();
  var weekCn = new Array('日', '一', '二', '三', '四', '五', '六');
  time.month = date.getMonth() + 1;
  time.week = weekCn[date.getDay()];
  time.day = date.getDate();
  return time;
},
onLoad: function (options) {
  // 页面初始化 options为页面跳转所带来的参数
},
onReady: function () {
  // 页面渲染完成
},
onShow: function () {
  // 页面显示
},
onHide: function () {
  // 页面隐藏
},
onUnload: function () {
  // 页面关闭
}
})
