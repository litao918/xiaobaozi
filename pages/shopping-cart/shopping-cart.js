// pages/shopping-cart/shopping-cart.js
const app = getApp()
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
      takeouttext:"外卖"
    },//中文包

    english: {
      market: "Sold",
      buybutton: "Buy now",
      totaltext: "All",
      selecttext: "Pick up method",
      picktext: "Take their",
      takeouttext: "take out"
    },//英文包

    selectpackage:'',//当前选中的语言包
     type: 0,
     // 用户ID
     id: 1,
     //是否显示购物车为空
     shoppingnull:true,
  },

  //点击加一
  Reduction:function(){
      
  },

  //点击减一
  add: function () {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log('-------------')
    wx.request({
      url: 'http://baoziwang.cqlink.club/appi/car/car_list',
      data: {
        type: this.data.type,
        id: this.data.id
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.data == null){
          that.setData({
            shoppingnull:true
          })
        }else{
          that.setData({
            shoppingnull: false
          })
        }
      }
    })
  },


  //立即购买方法
  buy(){
   this.setData({
     identification:1
   })
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

  // 跳转订单确认接口
  toconfirmorder(){
    wx.navigateTo({
      url: '../confirm-order/confirm-order',
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