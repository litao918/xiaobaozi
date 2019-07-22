//index.js
//获取应用实例
const app = getApp()
var call = require("../../utils/api.js")
Page({
  data: {
    banner:{},//轮播图数据
    selsected:"",//选中当前语言状态
    classfiySelect: "",
    leftText: [],//商品分类字段
    rightData: [],//商品列表字段
    scrollTop:'',
    navid:'0',

  },

  navClick:function(e){
    console.log(e.detail)
    var id = e.currentTarget.dataset.id
    this.setData({
      navid:id
    })
  },

  onLoad: function () {
    // console.log("我是"+language)
  },
  onShow:function(){
   this.setData({
     selsected: app.globalData.language
   })
    this.getbanner();//获取banner图
    this.gettype();//获取商品分类
    this.getgoods();//获取商品列表
    // console.log(this.data.leftTex)

  },

  // 得到banner图
  getbanner(){
    var url ="appi/index/banner"
    var data ='';
    call.request(url,data,this.getbannerSuccess,this.getbannerFail)
  },

  // banner图请求成功回调函数
  getbannerSuccess(res){
    console.log(res)
    if(res.code==1){
      this.setData({
        banner:res.data
      })
    }else{
      wx.showToast({
        title: res.msg,
        icon: 'none',
        duration: 1500
      })
    }
  },
  // banner图请求失败回调函数
  getbannerFail() {
    wx.showToast({
      title: "轮播图请求失败",
      icon: 'none',
      duration: 1500
    })
  },

  // 获取商品分类
  gettype(){
    var url = "appi/index/sp_fenlei"
    var data ={
      type:this.data.selsected
    }
    call.request(url, data, this.gettypeSuccess, this.gettypeFail)
  },
  //商品分类请求成功回调函数
  gettypeSuccess(res){
    console.log(res)
    if (res.code == 1) {
      this.setData({
        leftText: res.data
      })
      this.setData({
        classfiySelect: this.data.leftText[0].id
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none',
        duration: 1500
      })
    }
  },

  //商品分类请求失败回调函数
  gettypeFail(){
    wx.showToast({
      title: "商品分类请求失败",
      icon: 'none',
      duration: 1500
    })
  },

  //获取商品列表
  getgoods() {
    var url = "appi/index/sp_list_one"
    var data = {
      type: this.data.selsected
    }
    
    call.request(url, data, this.getgoodsSuccess, this.getgoodsFail)
  },

  //商品列表请求成功回调函数
  getgoodsSuccess(res){
    console.log(res)
    if (res.code == 1) {
      res.data.map((item,index)=>{
        // console.log(item);
        item.shop.map((val,i)=>{
          console.log(val);
          val['num']=0;
        })
      })//在商品列表中添加购买数量属性
      console.log(res.data);
      this.setData({
        rightData:res.data
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none',
        duration: 1500
      })
    }
  },
  //商品列表请求失败回调函数
  getgoodsFail(){
    wx.showToast({
      title: res.msg,
      icon: 'none',
      duration: 1500
    })
  },
  // 增加购买数量
  add(e){
    var goodlist=this.data.rightData
    console.log(e);
    var flag=1 //减少商品标识
    var key1 = e.currentTarget.dataset.index2//外层商品列表
    var key2 = e.currentTarget.dataset.index1//里层商品详情
    var data = this.data.rightData;
    data[key1].shop[key2].num += 1;
    this.setData({
       rightData:data
    });
    console.log(this.data.rightData);
    this.shoppingRequests(data[key1].shop[key2].id, data[key1].shop[key2].num,flag)
  }, 
  //减少购买数量
  reduce(e){
    var key1 = e.currentTarget.dataset.index2//外层商品列表
    var key2 = e.currentTarget.dataset.index1//里层商品详情
    var data = this.data.rightData;
    data[key1].shop[key2].num -= 1;
    this.setData({
      rightData: data
    });
  },
  //购物车数量增加减少后台请求接口
  shoppingRequests(id,num,state){
    var url ="appi/index/sp_cart";
    var data ={
      s_id:id,
      state: state,
      shu:num,
      u_id:1
    }
    call.request(url, data, this.shoppingSuccess, this.shoppingFail)
  },
  //购物车新增商品请求成功回调函数
  shoppingSuccess(res){
      wx.showToast({
        title: res.msg,
        icon: 'none',
        duration: 1500
      })

  },
  //购物车新增商品请求失败回调函数
  shoppingFail(){

  },
  onPageScroll: function (e) {
    //console.log(e.scrollTop)
    var that = this
    that.setData({
      scrollTop: e.scrollTop
    })
  },

  //滚动触发
  scroll: function (e) {
    var scrollTop = e.detail.scrollTops
    var  h = 0;
    var classfiySelect="";
    var that = this;
    that.data.leftText.forEach(function (clssfiy, i) {
      console.log(clssfiy);
      var _h = 26 + that.length(clssfiy['id']) * 102;
      if (scrollTop >= h) {
        classfiySelect = clssfiy['id'];
      }
      h += _h;
      console.log(h);
    })
    that.setData({
      classfiySelect: classfiySelect,

    })
  },
  //求每一栏高度
  length: function (e) {
    var that = this;
    var rightData = that.data.rightData;
    for (var i = 0; i < rightData.length; i++) {
      if (rightData[i]['id'] == e) {
        return rightData[i]['frist'].length;

      }
    }
  },
  //点击左边事件
  left_list: function (e) {
    var that = this;
    var l_id = e.currentTarget.dataset.id;
    that.setData({
      rigId: l_id,
    })
  },
  //跳转详情界面
  particulars: function (e) {

  }



 
})
