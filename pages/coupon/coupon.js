// pages/coupon/coupon.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: '',//选中语言状态
    chinese: {
      full:"满£",
      usable:"可用",
      validity:"有效期:",
      use: "立即使用"
    },//中文包

    english: {
      full: "Full £",
      usable: " available",
      validity: "Valid ",
      use:"use"
    },//英文包

    selectpackage: '',//当前选中的语言包
    userid:1,//用户id
    there:false,//是否有优惠券
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        selected: app.globalData.language
    })
    this.getMerchandisecoupon()//获取商品优惠券
    this.getFullcutcoupons()//满减券
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
  // 获得商品优惠券
  getMerchandisecoupon() {
    var data = {
      id: this.data.userid,
      type: this.data.selected
    }
    var that = this
    wx.request({
      url: 'http://baoziwang.cqlink.club/appi/user/user_sp_list',
      data: data,
      method: 'POST',
      success: function (res) {
        console.log(res.data.code)
        if (res.data.code == 2) {
          that.setData({
            there: false
          })
        } else {
          that.setData({
            there: true
          })
        }

      }
    })
  },
  // 获得商品优惠券
  getFullcutcoupons(){
    var data = {
      id: this.data.userid,
      type: this.data.selected
    }
    var that = this
    wx.request({
      url: 'http://baoziwang.cqlink.club/appi/user/user_yhj_list',
      data: data,
      method: 'POST',
      success: function (res) {
        console.log(res.data.code)
        if (res.data.code == 2) {
          that.setData({
            there: false
          })
        } else {
          that.setData({
            there: true
          })
        }

      }
    })
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