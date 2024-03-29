// pages/My_oder/My_oder.js
const app = getApp()
var call = require("../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabrid:1,
    // 语言类型ID
    selected:"",//语言包变量
    orderlist:[],//订单列表
    orderflag:0,//判断订单是否为空
    chinese: {
      category1: "未支付",
      category2: "已支付",
      category3: "已完成",
      category4: "未取货",
      ordertime: "下单时间:",
      anotherlist: "再来一单",
      payment: "支付",
      orderdetail: "订单详情",
    },//中文包

    english: {
      category1: "Not Paid",
      category2: "Paid",
      category3: "Done",
      category4: "NOT Take Stock",
      ordertime: "order time:  ",
      anotherlist: "Another list",
      payment: "Pay",
      orderdetail: "OrderDetail"
    },//英文包

    selectpackage: '',//当前选中的语言包
    zhifuzhuangtai:'未支付'
  },

  xuanxiangka: function (e) {
    console.log(e.currentTarget.dataset.id)
    var ztid = e.currentTarget.dataset.id

    if (ztid == 1){
      this.setData({
        zhifuzhuangtai:'未支付'
      })
    } else if (ztid == 2){
      this.setData({
        zhifuzhuangtai: '已支付'
      })
    } else if (ztid == 3) {
      this.setData({
        zhifuzhuangtai: '已完成'
      })
    } else if (ztid == 4) {
      this.setData({
        zhifuzhuangtai: '未取货'
      })
    }




    var id = e.currentTarget.dataset.id
    this.setData({
      tabrid: id
    })
    this.getorder()//获取订单
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
    this.selectLanguagePack(),//语言包切换函数
    this.getorder()//获取订单
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
  //获得订单
  getorder(){
    var url ="appi/user/user_order_list_shaixuan";
    var data={
      type:this.data.selected,
      id:1,
      state:this.data.tabrid
    }
    call.request(url, data, this.getorderSuccess, this.getorderFail)
  },
  // 获得订单请求成功回调
  getorderSuccess(res){
    console.log(res);
    if(res.code==1){
      this.setData({
        orderlist:res.data,
        orderflag:1
      })
    }else if(res.code==2){
      this.setData({
        orderflag: 0
      })
    }
  },
  // 获得订单请求失败回调
  getorderFail() {

  },
  //跳转订单详情页面
  toorderdetail(e){
    console.log(e);
    var orderid = e.currentTarget.dataset.id;
    wx:wx.navigateTo({
      url: '../orderdetails/orderdetails?orderid='+orderid,
    })
  },
  // 再来一单跳转首页
  again(){
    wx:wx.switchTab({
      url: '../index/index',
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