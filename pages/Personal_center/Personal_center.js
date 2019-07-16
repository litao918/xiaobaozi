// pages/Personal_center/Personal_center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 语言
    Chinese:{
      //
      Personalinformation:'个人信息不会透露给TA人',
      //我的订单
      myoder:'我的订单',
      //语言选择
      language:'语言选择',
      //我的优惠券
      coupons:'我的优惠券',
    },
    English: {
      //
      Personalinformation: 'Personal information will not be disclosed to them',
      //我的订单
      myoder: 'My Order',
      //语言选择
      language: 'language',
      //我的优惠券
      coupons: 'My coupons',
    },
    selection: false,
    language: '简体中文',
    languagebao:''

   
  
  },


  Languageselection:function () {
    var flg = !this.data.selection
      this.setData({
        selection:flg
      })
  },

  chinese:function(e){
    var language = e.currentTarget.dataset.type
    wx.setStorageSync('language', language)
    var Chinese = this.data.Chinese
    this.setData({
      language: language,
      selection:false,
      languagebao: Chinese
    })
    console.log(Chinese)
  },

  English: function (e) {
    var language = e.currentTarget.dataset.type
    var English = this.data.English 
    wx.setStorageSync('language', language)
    this.setData({
      language: language,
      selection: false,
      languagebao: English
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var language = wx.getStorageSync('language')
    var Chinese = this.data.Chinese
    var English = this.data.English

    this.setData({
      language: language
    })
    if (language == 'English'){
        this.setData({
          languagebao:English
        })
    }else{
      this.setData({
        languagebao: Chinese
      })
    }
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