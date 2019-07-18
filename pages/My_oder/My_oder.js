// pages/My_oder/My_oder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabrid:0,
    selected: '',//选中语言状态
    chinese: {
      category1:"全部",
      category2:"待提货",
      category3:"已完成",
      ordertime:"下单时间:",
      anotherlist:"再来一单"
    },//中文包

    english: {
      category1: "All",
      category2: "For pickup",
      category3: "Done",
      ordertime: "order time:  ",
      anotherlist: "Another list"
    },//英文包

    selectpackage: ''//当前选中的语言包
  },

  xuanxiangka: function (e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    this.setData({
      tabrid: id
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
        selectpackage: data
      })
    } else if (this.data.selected == 1) {
      var data = this.data.chinese
      this.setData({
        selectpackage: data
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