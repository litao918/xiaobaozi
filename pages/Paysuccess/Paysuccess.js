// pages/Paysuccess/Paysuccess.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Chinese: {
      paysuccess: '下单成功',
      prompt:"请尽快前往商家支付提取美食",
      finish: '完成',
      backhomepage: '返回首页',
    },
    English: {
      paysuccess: 'Pay for success',
      prompt: "Please pay to pick up food as soon as possible",
      finish: 'Finish',
      backhomepage: 'back homepage',
    },
    selectpackage: ''//当前选中的语言包
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
    const language = app.globalData.language
    if (language == 1) {
      this.setData({
        selectpackage: this.data.Chinese
      })
    } else {
      this.setData({
        selectpackage: this.data.English
      })
    }
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