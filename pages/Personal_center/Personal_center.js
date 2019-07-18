// pages/Personal_center/Personal_center.js
const app = getApp()
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

  // 我的订单
  myorder:function(){
    wx.navigateTo({
      url: '../My_oder/My_oder',
    })
  },

  //显示语言选择弹窗
  Languageselection:function () {
    var flg = !this.data.selection
      this.setData({
        selection:flg
      })
  },

  //点击语言按钮中英文切换
  switch:function(e){
    console.log(e.currentTarget.dataset.type);
    var copylanguage=e.currentTarget.dataset.type
    if(copylanguage=="简体中文"){
      app.globalData.language = 1
      console.log("改变后的" + app.globalData.language);
      var Chinese = this.data.Chinese
      this.setData({
        selection: false,
        languagebao: Chinese
      })
    } else if (copylanguage =="English"){
      app.globalData.language = 0
      console.log("改变后的" + app.globalData.language);
      var English = this.data.English
      this.setData({
        selection: false,
        languagebao: English
      })
    }
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
    const language = app.globalData.language
    console.log("我是"+language)
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