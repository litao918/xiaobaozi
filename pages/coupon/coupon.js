// pages/coupon/coupon.js
const app = getApp()
Page({

  /**
  * 页面的初始数据
  */
  data: {
    selected: '',//选中语言状态
    chinese: {
      full: "满¥",
      usable: "可用",
      validity: "有效期:",
      use: "立即使用",
      character:'¥',
    },//中文包

    english: {
      full: "Full £",
      usable: " available",
      validity: "Valid ",
      use: "use",
      character:'£',
    },//英文包

    selectpackage: '',//当前选中的语言包
    userid: 1,//用户id
    there: false,//是否有优惠券
    couponid:0,//优惠券请求接口状态，默认为0
    reductiondata:'',//满减数据
    preferentialdata: '',//优惠数据

  },

  // 使用优惠券
  couponsclick:function(e){
    console.log(e.currentTarget.dataset)
    if(e.currentTarget.dataset.id == null){
      console.log(555555)
      wx.switchTab({
        url: '../index/index'
      })

    }else{
     wx.navigateTo({
       url: '../confirm-order/confirm-order',
     })
    }
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    var data1 = this.data.chinese
    var data2 = this.data.english
    var userid = this.data.userid
    var type = app.globalData.language
    var shpingid = app.globalData.shopingid
    var couponid = options.id
    var allmoney = options.allmoney
    var userid = wx.getStorageSync('userid')
    var that = this
  
    // 订单页面可用优惠券
    var urlmanjian = 'http://baoziwang.cqlink.club/appi/order/manjian_yhj'
    var urlyouhui = 'http://baoziwang.cqlink.club/appi/order/shop_yhj'
    // 普通查看所有优惠券
    var urlmanjian1 = 'http://baoziwang.cqlink.club/appi/user/user_yhj_list'
    var urlyouhui1 = 'http://baoziwang.cqlink.club/appi/user/user_sp_list'
     

    this.setData({
      selected: type,
      userid:userid
    })
    //判定语言状态，更换语言包
    if (app.globalData.language == 0){
          this.setData({
            selectpackage: data2
          })
      }else{
        this.setData({
          selectpackage: data1
        })
      }
    
    //判定是否从订单页面进入，分别请求优惠券接口  
    if (couponid == 1){
      // 获取满减优惠券
      wx.request({
        url: urlmanjian,
        data: {
          u_id: userid,
          type:type,
          allmoney:allmoney
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == 1) {
            var arr = res.data.data
            console.log(arr)

             arr.splice(0, 1)
            console.log('ooooooooooooo')
            console.log(arr)


            that.setData({
              reductiondata: arr,
              there: true
            })
          } else {
            console.log('请求失败')
          }

        }
      })
      // 获取商品优惠券
      wx.request({
        url: urlyouhui,
        data: {
          u_id: userid,
          type: type,
          s_id: shpingid
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              preferentialdata: res.data.data,
              there: true
            })
          } else {
            console.log('请求失败')
          }

        }
      })

    }else{
       // 获取满减优惠券
      wx.request({
        url: urlmanjian1,
        data: {
          id: userid,
          type: type
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data.data)
          console.log('888888888888888')
         if(res.data.code == 1){
           that.setData({
             reductiondata: res.data.data,
             there:true
           })
         }else{
           console.log('请求失败')
         }

        }
      })
      // 获取商品优惠券
      wx.request({
        url: urlyouhui1,
        data: {
          id: userid,
          type: type
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == 1) {
            that.setData({
              preferentialdata: res.data.data,
              there: true
            })
          }
        }
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