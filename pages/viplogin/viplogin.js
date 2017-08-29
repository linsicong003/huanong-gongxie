// viplogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    password:''
  },
  account_input:function(e){
    this.setData({
      account:e.detail.value
    })
  },
  pwd_input:function(e){
    this.setData({
      password:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

  
  },
  user_login:function(){
    const server = getApp().data.server;
    let that = this;
    let e_account = that.data.account;
    let e_password = that.data.password;
    let e_openid = wx.getStorageSync('userid');
    let post_mes = {account:e_account,password:e_password,openid:e_openid};

    console.log(post_mes);

    wx.request({
      url: server+'user_login',
      data:post_mes,
      method:'POST',
      header: {
        'Content-type': 'application/json'
      },
      success:function(res){
        //如果请求502
        if (res.statusCode == 502){
          wx.request({
            url: server+'user_login',
            data: post_mes,
            method: 'POST',
            header: {
              'Content-type': 'application/json'
            },
            success:function(res){
              //再次请求操作
              if (res.data == 'login1') {
                console.log('loginok');
                wx.setStorageSync('viplogin', 'yes');
                //提示登陆成功
                wx.showToast({
                  title: '登录成功',
                  mask: true,
                  complete: function () {
                    //两秒后隐藏提示框并自动跳转回首页
                    wx.setStorageSync('name', e_account);
                    wx.switchTab({
                      url: '../index/index',
                      success: function () {
                        console.log('nav');
                      }
                    })
                  }
                })
              }
              //登录失败
              else if (res.data == 'login2') {
                wx.showToast({
                  title: '账号/密码错误!',
                });
              }
            }
          })
        }else{
          if(res.data == 'login1'){
            console.log('loginok');
            wx.setStorageSync('viplogin','yes');
            //提示登陆成功
            wx.showToast({
              title: '登录成功',
              mask:true,
              complete:function(){
                //两秒后隐藏提示框并自动跳转回首页
                wx.setStorageSync('name', e_account);
                wx.switchTab({
                  url: '../index/index',
                  success: function () {
                    console.log('nav');
                  }
                })
              }
            })
          }
          //登录失败
          else if(res.data == 'login2'){
            wx.showToast({
              title: '账号/密码错误!',
            });
          }
        }
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