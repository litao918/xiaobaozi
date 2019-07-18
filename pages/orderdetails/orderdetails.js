// pages/orderdetails/orderdetails.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Chinese: {
      showcode:'请向店家出示您的提货二维码',
      goodscode: '提货码',
      PoundBaozi: 'PoundBaozi',
      menu: '菜单',
      information: '订单信息',
      Serialnumber: '订单编号',
      contactphone: '联系电话',
      ordertime: '下单时间',
      Paymenttime: '支付时间',
      Purchasequantity: '购买数量',
      orderprice: '订单价格',
      Preferentialprice: '优惠价格',
      Actuallyprice: '实付价格',
    },
    English: {
      showcode: 'Please show your pick-up code to  the merchant',
      goodscode: 'Pick-up code',
      PoundBaozi: 'PoundBaozi',
      menu: 'Menu',
      information: 'Order information',
      Serialnumber: 'OrderID',
      contactphone: 'Tel',
      ordertime: 'order time',
      Paymenttime: 'paytime',
      Purchasequantity: 'payable',
      orderprice: 'account payable',
      Preferentialprice: 'preferential',
      Actuallyprice: 'total prices',
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