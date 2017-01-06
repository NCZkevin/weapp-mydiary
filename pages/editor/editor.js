// pages/editor/editor.js
const AV = require('../../utils/av-weapp-min.js')
Page({
  data: {
    array: ['/images/ic_mood_happy.png', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '笑脸'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    date: '2016-09-01',
    time: '12:01',
    title: '',
    content: '',
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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
  saveDiary: function() {
    var Diary = AV.Object.extend('Diary');
    var diary = new Diary();
    var d_title = this.data.title;
    var d_content = this.data.content;
    console.log(d_content,d_title);
    diary.set('title', d_title);
    diary.set('content', d_content);
    diary.save().then(function(diary){
      console.log('ok');
    }, function (error) {
    // 异常处理
    console.error('Failed to create new object, with error message: ' + error.message);
  })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
