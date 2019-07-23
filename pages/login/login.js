const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })

    var userInfo = wx.getStorageInfoSync('userInfo')
    var that = this;
    // var openid = wx.getStorageSync('openid')
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              // 用户已经授权过
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          });
        } else {
          that.setData({
            isHide: true
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      var code = wx.getStorageSync('code')
      var userInfo = e.detail.userInfo
      var avatarUrl = userInfo.avatarUrl
      var nickName = userInfo.nickName
      wx.setStorageSync('userInfo', userInfo)
      wx.request({
        url: 'http://baoziwang.cqlink.club/login/login',
        data: {
          code: code,
          name: nickName,
          imager: avatarUrl
        },
        method: 'POST',
        success: function (res) {
          console.log(res)


          //授权成功后，跳转进入小程序首页
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },

  onShow: function () {
    wx.hideLoading()
  },



})
