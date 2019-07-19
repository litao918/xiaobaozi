var app = getApp();
var host = 'http://baoziwang.cqlink.club/';
function request(url, postData, doSuccess, doFail) {
  wx.request({
    url: host + url,
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function () {
      doFail();
    },
  })
}

//GET请求，不需传参，直接URL调用，
function getData(url, doSuccess, doFail) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function (res) {
      doSuccess(res.data);
    },
    fail: function () {
      doFail();
    },
  })
}

module.exports.request = request;
module.exports.getData = getData;
