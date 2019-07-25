// pages/ceshi/ceshi.js

const date = new Date()
const months = []
const days = []
const whens = []
const pointss = []
//获取当前年份
const currentYear = date.getFullYear()
//当前月份
const currentMonth = date.getMonth() + 1
//当前日
const currentDate= date.getDate()
//当前时
const currentHours = date.getHours()
//当前分
const currentMinutes = date.getMinutes()

//获取当前月份最大天数
var datesr =  function mGetDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var d = new Date(year, month, 0);
  return d.getDate();
}
var mixdate = (datesr())

//获取指定月份的天数
var monthmix   =   function getMonthDays(year, month) {
  var thisDate = new Date(year, month, 0); //当天数为0 js自动处理为上一月的最后一天
  return thisDate.getDate();
}


for (let i = currentMonth; i <= 12; i++) {
  months.push(i)
}

for (let i = currentDate; i <= mixdate; i++) {
  days.push(i)
}
for (let i = currentHours; i <= 24; i++) {
  if (i < 10) {
    i = '0' + i
  }
  whens.push(i)
}
for (let i = currentMinutes; i <= 60; i++) {
  if (i < 10) {
    i = '0' + i
  }
  pointss.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    months: months,
    month: currentMonth,
    days: days,
    day: currentDate,
    whens: whens,
    when: currentHours,
    pointss: pointss,
    points: currentMinutes,
    value: [0,0,0,0],
  },

   

  bindChange: function (e) {
    const val = e.detail.value

    var xiaoshi = this.data.whens[val[2]]
    var fenzhong = this.data.pointss[val[3]]


    //判断当前选择月份是否大于初始月份，如果大于当前月份则天数重置为选择月份的天数
    if (this.data.months[val[0]] == currentMonth ){//如果选择当前月份，重新赋值当前月日时分
    const date = new Date()
    //当前月份
    const currentMonth = date.getMonth() + 1
    //当前日
    const currentDate = date.getDate()
    //当前时
    const currentHours = date.getHours()
    //当前分
    const currentMinutes = date.getMinutes()
      var days = []
      var whens = []
      var pointss = []
      for (let i = currentDate; i <= mixdate; i++) {
        days.push(i)
      }
      for (let i = currentHours; i <= 24; i++) {
        if (i < 10) {
          i = '0' + i
        }
        whens.push(i)
      }
      for (let i = currentMinutes; i <= 60; i++) {
        if (i < 10) {
          i = '0' + i
        }
        pointss.push(i)
      }
      this.setData({
        days: days,
        whens: whens,
        pointss: pointss
      })
    } 
    
    if (this.data.months[val[0]] > currentMonth) {//如果选择月份大于当前月份，重新赋值当前月日时分
      const date = new Date()
      //当前月份
      const currentMonth = date.getMonth() + 1
      //当前日
      const currentDate = date.getDate()
      //当前时
      const currentHours = date.getHours()
      //当前分
      const currentMinutes = date.getMinutes()
      //获取选择月份的最大天数
      var yearmix = monthmix(currentYear, this.data.months[val[0]])
      var days = []
      var whens = []
      var pointss = []
      for (let i = 1; i <= yearmix; i++) {
        days.push(i)
      }
      for (let i = 1; i <= 24; i++) {
        if(i < 10){
          i = '0' + i
        }
        whens.push(i)
      }
      for (let i = 1; i <= 60; i++) {
        if (i < 10) {
          i = '0' + i
        }
        pointss.push(i)
      }
      this.setData({
        days: days,
        whens: whens,
        pointss: pointss
      })
    } 

    if (this.data.days[val[1]] > currentDate){//如果当前选择日大于当前日，重新赋值时分
      const date = new Date()
      //当前月份
      const currentMonth = date.getMonth() + 1
      //当前日
      const currentDate = date.getDate()
      //当前时
      const currentHours = date.getHours()
      //当前分
      const currentMinutes = date.getMinutes()
      var whens = []
      var pointss = []
      for (let i = 1; i <= 24; i++) {
        if (i < 10) {
          i = '0' + i
        }
        whens.push(i)
      }
      for (let i = 1; i <= 60; i++) {
        if (i < 10) {
          i = '0' + i
        }
        pointss.push(i)
      }
      this.setData({
        whens: whens,
        pointss: pointss
      })

    }
    
    if (this.data.days[val[1]] == currentDate) {//如果当前选择日等于当前日，重新赋值时分
      const date = new Date()
      //当前月份
      const currentMonth = date.getMonth() + 1
      //当前日
      const currentDate = date.getDate()
      //当前时
      const currentHours = date.getHours()
      //当前分
      const currentMinutes = date.getMinutes()
      var whens = []
      var pointss = []
      for (let i = currentHours; i <= 24; i++) {
        if (i < 10) {
          i = '0' + i
        }
        whens.push(i)
      }
      for (let i = currentMinutes; i <= 60; i++) {
        if (i < 10) {
          i = '0' + i
        }
        pointss.push(i)
      }
      this.setData({
        whens: whens,
        pointss: pointss
      })
    }
    
    if (this.data.whens[val[2]] > currentHours) {//如果当前选择时大于当前时，重新赋值时分
      const date = new Date()
      //当前月份
      const currentMonth = date.getMonth() + 1
      //当前日
      const currentDate = date.getDate()
      //当前时
      const currentHours = date.getHours()
      //当前分
      const currentMinutes = date.getMinutes()
      var pointss = []
      for (let i = 1; i <= 60; i++) {
        if (i < 10) {
          i = '0' + i
        }
        pointss.push(i)
      }
      this.setData({
        pointss: pointss
      })

    } 
    
    if (this.data.whens[val[2]] == currentHours) {//如果当前选择时等于当前时，重新赋值时分
    const date = new Date()
    //当前月份
    const currentMonth = date.getMonth() + 1
    //当前日
    const currentDate = date.getDate()
    //当前时
    const currentHours = date.getHours()
    //当前分
    const currentMinutes = date.getMinutes()
      var pointss = []
      for (let i = currentMinutes; i <= 60; i++) {
        if (i < 10) {
          i = '0' + i
        }
        pointss.push(i)
      }
      this.setData({
        pointss: pointss
      })
    }
  
      //滑动选择的日期赋值
      this.setData({
        month: this.data.months[val[0]],
        day: this.data.days[val[1]],
        when: xiaoshi,
        points: fenzhong
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})