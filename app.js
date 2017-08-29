//app.js
App({
  data:{
    server:'https://www.linsicong.cn/'
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    let server = 'https://www.linsicong.cn/';

    wx.checkSession({
      success: function () {
        if (wx.getStorageSync('userid')) {
          console.log('you are already login');
        } else {
          //获取用户openid
          wx.login({
            success: function (res) {
              console.log(res);
              let info = { code: res.code, flag: '2' };
              wx.request({
                url: server+'wx_login',
                header: {
                  'Content-type': 'application/json'
                },
                data: info,
                method: 'POST',
                success: function (res) {
                  console.log(res);
                  wx.clearStorageSync();
                  wx.setStorageSync('userid', res.data.openid);
                  wx.setStorageSync('usersessionid', res.data.sessionid);
                },
                fail: function (msg) {
                  console.log(msg);
                }
              })
            }
          })
        }
        console.log(wx.getStorageSync('userid'));
        console.log(wx.getStorageSync('usersessionid'));

      },
      fail: function () {
        if (wx.getStorageSync('userid')) {
          wx.login({
            success: function (res) {
              let userid = wx.getStorageSync('userid');
              let sessionid = wx.getStorageSync('sessionid');
              let info = { code: res.code, flag: '1', openid: userid, sessionid: sessionid };
              wx.request({
                url: server+'wx_login',
                header: {
                  'Content-type': 'application/json'
                },
                data: info,
                method: 'POST',
                success: function (res) {
                  console.log('login success');
                  console.log(res);
                }
              })
            }
          })
        } else {
          wx.login({
            success: function (res) {
              console.log(res);
              let info = { code: res.code, flag: '2' };
              wx.request({
                url: server+'wx_login',
                header: {
                  'Content-type': 'application/json'
                },
                data: info,
                method: 'POST',
                success: function (res) {
                  console.log(res);
                  wx.clearStorageSync();
                  wx.setStorageSync('userid', res.data.openid);
                  wx.setStorageSync('usersessionid', res.data.sessionid);
                },
                fail: function (msg) {
                  console.log(msg);
                }
              })
            }
          })
        }
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
})