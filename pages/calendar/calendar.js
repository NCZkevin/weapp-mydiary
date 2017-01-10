// pages/calendar/calendar.js
const Util = require('../../utils/util.js');
Page({
  data:{
    time: {}
  },
  nowTime: function() {
    var time = Util.nowTime();
    this.setData({
      time: time
    });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.nowTime();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})