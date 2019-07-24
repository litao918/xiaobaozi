// pages/confirm-order/confirm-order.js
const app = getApp()
var call = require("../../utils/api.js")
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
    // 电话弹窗控制变量
    identification:0,
    // 联系电话变量
    phone:"",
    // 电话规则变量
    phonerule:1,
    // 电话中间变量
    phonecopy:"",
    //应付价格
    souldprice:"",
    //提货地址ID
    addressid:''

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
        languagepack: data,
        phone:"Request Filling"
      })
    } else if (this.data.selected == 1) {
      var data = this.data.chinese
      this.setData({
        languagepack: data,
        phone: "请填写"
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
  // 填写电话弹窗调用
  getphone(){
    this.setData({
      identification:1
    })
  },
  // 单击弹窗模板背景影藏弹窗
  chanel(){
    if(this.data.selected){
      this.setData({
        identification: 0,
      })
    }else{
      this.setData({
        identification: 0,
      })
    }



  },
  // 启用弹窗后模板背景不可滑动
  filterViewMove(){

  },
  // 设置电话号码
  setphone(e){
    var data = e.detail.value
    if ((/^1[3456789]\d{9}$/.test(data))){
      this.setData({
        phonecopy: e.detail.value,
        phonerule:1
      })
    }else{
      this.setData({
        phonecopy: e.detail.value,
        phonerule: 0
      })
    }
  },
  // 弹窗确定按钮
  confirm(){
    if(this.data.phonecopy==""){
      wx.showToast({
        title: "电话不能为空",
        icon: 'none',
        duration: 1500
      })
    } else if (this.data.phonerule){
      this.setData({
        phone:this.data.phonecopy,
        identification:0
      })
    }else{
      wx.showToast({
        title: "电话格式有误",
        icon: 'none',
        duration: 1500
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