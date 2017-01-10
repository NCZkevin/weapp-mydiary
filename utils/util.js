function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function nowTime() {
    var time = new Object();
    var date = new Date();
    var weekCn = new Array('日', '一', '二', '三', '四', '五', '六');
    var monthCn = new Array('一', '二', '三', '四', '五', '六','七','八','九','十','十一','十二');
    time.month = monthCn[date.getMonth()];
    time.week = weekCn[date.getDay()];
    time.day = date.getDate();
    return time;
  }
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  nowTime: nowTime
}
