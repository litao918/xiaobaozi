// pages/confirm-order/confirm-order.js
const app = getApp()
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
        tostorepayment: '到点支付',
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
    //语言选中状态
    selected:"",
    //当前语言包
    languagepack:''
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
    this.setData({
      selected: app.globalData.language
    })
    this.selectLanguagePack()
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
      url: '../coupon/coupon',
    })
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