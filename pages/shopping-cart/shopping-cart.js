// pages/shopping-cart/shopping-cart.js
const app = getApp()
var call = require("../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    identification:0, /*弹窗控制按钮*/
    selected:'',//选中语言状态
    chinese:{
      market:"已售",
      buybutton:"立即购买",
      totaltext:"共计",
      selecttext:"请选择配送方式",
      picktext:"自提",
      takeouttext:"外卖",
      dollarsign: "¥",
    },//中文包

    english: {
      market: "Sold ",
      buybutton: "Buy Now",
      totaltext: "All",
      selecttext: "Pick up method",
      picktext: "Take Their",
      takeouttext: "Take Out",
      dollarsign: "£",
    },//英文包
    selectpackage:'',//当前选中的语言包
    goodslist:[],//商品列表
    shoppingnull:0,//判断购物车是否为空的变量
    allmoney:0//总金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },


  //立即购买方法
  buy(){
    if(this.data.allmoney==0){
      wx.showToast({
        title: "购物车没有东西",
        icon: 'none',
        duration: 1500
      })
    }else{
      this.setData({
        identification: 1
      })
    }
  },

  // 点击取消选择配送方式
  chanel(){
    this.setData({
      identification: 0
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
    console.log(app.globalData.language)
    this.setData({
      selected: app.globalData.language
    })
    this.selectLanguagePack();//语言包
    this.getproductlist();//获取购物车商品列表
    this.getallmoney();//获得商品总金额
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
  //获取商品列表 
  getproductlist(){
    var url ="appi/car/car_list";
    var data = {
      type:this.data.selected,
      id:1
    }
    call.request(url, data, this.getproductlistSuccess, this.getproductlistFail)
  },
  // 购物车商品列表请求成功回调函数
  getproductlistSuccess(res){
    if (res.code == 1) {
        console.log(this.data.goodslist)
        this.setData({
          shoppingnull: 1,
          goodslist: res.data
        });
    } else if(res.code==2){
      this.setData({
        shoppingnull: 0
      });
      wx.showToast({
        title: res.msg,
        icon: 'none',
        duration: 1500
      })
    }
    console.log(res);
  },
  // 购物车商品列表请求失败回调函数
  getproductlistFail(){

  },
  // 删减商品
  deleteGoods(e){
    var key = e.currentTarget.dataset.index//里层商品数组下标
    var data = this.data.goodslist;
    var flag=2;
    data[key].geshu -= 1;
    this.setData({
      goodslist: data
    });
    this.shoppingRequests(data[key].s_id, data[key].geshu, flag)
  },
  // 增加商品
  addGoods(e) {
    var key = e.currentTarget.dataset.index//里层商品数组下标
    var data = this.data.goodslist;
    var flag = 1;
    data[key].geshu += 1;
    this.setData({
      goodslist: data
    });
    this.shoppingRequests(data[key].s_id, data[key].geshu, flag)
  },

  //购物车数量增加减少后台请求接口
  shoppingRequests(id, num, state) {
    var url = "appi/index/sp_cart";
    var data = {
      s_id: id,
      state: state,
      shu: num,
      u_id: 1
    }
    call.request(url,data, this.shoppingSuccess, this.shoppingFail)
  },
  //购物车新增商品请求成功回调函数
  shoppingSuccess(res) {

    if(res.code==1){
      this.getallmoney();
      wx.showToast({
        title: res.msg,
        icon: 'none',
        duration: 1500
      })
    }else{
      wx.showToast({
        title: res.msg,
        icon: 'none',
        duration: 1500
      })
    }


  },
  //购物车新增商品请求失败回调函数
  shoppingFail() {

  },
  //得到总金额
  getallmoney(){
    var url ="appi/car/car_money"
    var data ={
      type:this.data.selected,
      id:1
    }
    call.request(url, data, this.getallmoneySuccess, this.getallmoneyFail)
  },
  //获取总金额请求成功回调 
  getallmoneySuccess(res){
    console.log(res)
    if(res.code==1){
      this.setData({
        allmoney: res.data.zong_ying_money
      })
    }else if(res.code==2){
      this.setData({
        allmoney: 0
      })
    }
  },
  //获取总金额请求失败回调 
  getallmoneyFail() {

  },
  // 跳转订单确认接口
  toconfirmorder(){
    var shoppingcart = this.data.goodslist
    var allmoney = this.data.allmoney
    console.log('***************')
    console.log(shoppingcart)
    console.log('***************')
    wx.navigateTo({
      url: '../confirm-order/confirm-order?allmoney=' + allmoney,
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