// pages/confirm-order/confirm-order.js
const app = getApp()
var call = require("../../utils/api.js")


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
const currentDate = date.getDate()
//当前时
const currentHours = date.getHours()
//当前分
const currentMinutes = date.getMinutes()

//获取当前月份最大天数
var datesr = function mGetDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var d = new Date(year, month, 0);
  return d.getDate();
}
var mixdate = (datesr())

//获取指定月份的天数
var monthmix = function getMonthDays(year, month) {
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
    // 语言
    chinese: {
        pickupaddress:'提货地址',
        takestime:'自提时间',
        phonenumber:'联系电话',
        goodsnumber:'商品数量',
        pieces:'件',
        accountpayable:'优惠券',
        cardavailable:'张可用',
        copewith:'应付',
        preferential:'优惠',
        totalprice:'总价',
        immediatePayment:'线上支付',
        tostorepayment: '到店支付',
    },
    english: {
      pickupaddress: 'Pick up address',
      takestime: 'Takes time',
      phonenumber: 'phone number',
      goodsnumber: 'Quantity of Commodity',
      pieces: ' pieces',
      accountpayable: 'account payable',
      cardavailable: 'card available',
      copewith: 'account payable',
      preferential: 'preferential',
      totalprice: 'total prices',
      immediatePayment: 'immediate Payment',
      tostorepayment: 'To store payment',
    },
    // 时间选择数据
    months: months,
    month: currentMonth,
    days: days,
    day: currentDate,
    whens: whens,
    when: currentHours,
    pointss: pointss,
    points: currentMinutes,
    value: [0, 0, 0, 0],

    //语言选中状态
    selected:"",
    //当前语言包
    languagepack:'',
    //自提地址
    address:'',
    //用户id
    userid:1,
    //购物车商品id数组
    goods:[],
    //购物车商品数组
    goodslist:'',
    //总价
    allmoney:'',
    //商品总数
    goodsnum:'',
    //商品提交数组
    goodsarry:[],
    //应付价格
    souldprice:"",
    //提货地址ID
    addressid:'',
    //控制时间选择器
    timeswitch:false

  },

  // 支付提交
  since_payment:function(e){
    console.log(e.currentTarget.dataset.id)
    //支付方式
    var fangshi = e.currentTarget.dataset.id 
    //中英文类型
    var type = app.globalData.language
    //地址
    var tihuotime = this.data.address
    //用户ID
    var u_id = this.data.userid
    //商品数组
    var goodsarry = this.data.goodsarry
    //商品总数
    var goodsnum = this.data.goodsnum

  },

 

  // 滑动选择时间函数
  bindChange: function (e) {
    const val = e.detail.value

    var xiaoshi = this.data.whens[val[2]]
    var fenzhong = this.data.pointss[val[3]]


    //判断当前选择月份是否大于初始月份，如果大于当前月份则天数重置为选择月份的天数
    if (this.data.months[val[0]] == currentMonth) {//如果选择当前月份，重新赋值当前月日时分
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
        days: days,
        whens: whens,
        pointss: pointss
      })
    }

    if (this.data.days[val[1]] > currentDate) {//如果当前选择日大于当前日，重新赋值时分
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
      when: this.data.whens[val[2]],
      points: this.data.pointss[val[3]]
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var allmoney = options.allmoney
    this.setData({
      allmoney: allmoney,
      souldprice: allmoney
    })

    var type = app.globalData.language
    var that= this
    // 自提地址
    wx.request({
      url: 'http://baoziwang.cqlink.club/appi/order/dizhi',
      data: {
        type: type
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.msg)
        that.setData({
          address: res.data.data[0].dizhi,
          addressid: res.data.data[0].id
        })
      }
    })

  },

  shutdowntime:function(){
    var flg = this.data.timeswitch
    this.setData({
      timeswitch: !flg
    })
  },

  choosetime: function () {
    var flg = this.data.timeswitch
    this.setData({
      timeswitch: !flg
    })
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
    this.setData({
      selected: app.globalData.language
    })
    this.selectLanguagePack();//语言包选择
    this.getproductlist();//商品列表
  },

  //语言包的选择
  selectLanguagePack() {
    if (this.data.selected == 0) {
      var data = this.data.english
      this.setData({
        languagepack: data
      })
    } else if (this.data.selected == 1) {
      var data = this.data.chinese
      this.setData({
        languagepack: data
      })
    }
  },

  //跳转优惠券页面
  tocoupon(){
    wx.navigateTo({
      url: '../coupon/coupon?id=1'
    })
  },

  //获取商品列表 
  getproductlist() {
    var url = "appi/car/car_list";
    var data = {
      type: this.data.selected,
      id: 1
    }
    call.request(url, data, this.getproductlistSuccess, this.getproductlistFail)
  },
  // 购物车商品列表请求成功回调函数
  getproductlistSuccess(res) {
    var type = app.globalData.language
    var u_id = this.data.userid
    if (res.code == 1) {
      var goodsarr = res.data
      var  goods = []
      var goodsnum = 0
      var goodsarry = [];
      for (let i in goodsarr) {
        goods.push(goodsarr[i].s_id)
        var num = parseInt(goodsarr[i].geshu)
        goodsnum = goodsnum + num
        goodsarry[i] = new Object
        goodsarry[i].sp_id = goodsarr[i].s_id
        goodsarry[i].sp_shuliang = goodsarr[i].geshu
        goodsarry[i].jiage = goodsarr[i].money
      } 
      console.log('-----------------------------------')
      console.log(goodsarry)
      console.log('-----------------------------------')
      this.setData({
          goodslist: res.data, 
          goodsnum: goodsnum,  
          goodsarry: goodsarry
      })
      // 请求优惠券
      wx.request({
        url: 'http://baoziwang.cqlink.club/appi/order/shop_yhj',
        data:{
          s_id: goods,
          type:type,
          u_id: u_id
        },
        method:'POST',
        success:function(res){
          console.log(res)
        }
      })
     
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none',
        duration: 1500
      })
    }
  },
  // 购物车商品列表请求失败回调函数
  getproductlistFail() {

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