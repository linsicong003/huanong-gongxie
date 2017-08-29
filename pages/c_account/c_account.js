// c_account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    o_pw:'',
    n_pw:'',
    n_pw_test:'',
    tip_show:'',
    pw_show:'no'
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const that = this;
      let name = wx.getStorageSync('name').substring(2);

      that.setData({
        tip_name:name
      })
  },
  cancel:function(e){
      const that = this;
      wx.showModal({
        title: '注销登录',
        content: '您即将注销'+name+'的账号',
        cancelText:'放弃',
        confirmText:'确认注销',
        success:function(res){
            if(res.confirm){
              //确认注销
              wx.removeStorage({
                key: 'name'
              })
              wx.removeStorage({
                key: 'viplogin'
              })
              wx.switchTab({
                url: '../index/index',
              })
            }else{
              //放弃注销
              wx.showToast({
                title: '放弃注销',
              })
              return false;
            }
        }
      })
  },
  submit_change:function(){
    const that = this;
    let o_pw = that.data.o_pw;
    let n_pw1 = that.data.n_pw;
    let n_pw2 = that.data.n_pw_test;
    let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,9})$/;
    const server = getApp().data.server;

    console.log(reg.test(o_pw));

    if(o_pw==''||n_pw1==''||n_pw2==''){
      wx.showModal({
        title: '输入提示',
        content: '不能留空！',
        showCancel: false,
        confirmText: '我知道了'
      })
      return false;
    }
    else if(n_pw1 != n_pw2 ){
      wx.showModal({
        title: '输入提示',
        content: '两次输入新密码不一致！',
        showCancel:false,
        confirmText:'我知道了'
      })
      return false;
    }
    else if(!reg.test(o_pw)||!reg.test(n_pw1)||!reg.test(n_pw2)){
      wx.showModal({
        title: '输入提示',
        content: '新密码格式错误！',
        showCancel: false,
        confirmText: '我知道了'
      })
      return false;
    }else{
      let account = wx.getStorageSync('name');
      let info = {account:account,o_pw:o_pw,n_pw:n_pw1};
      wx.request({
        url: server +'setpw',
        method:'POST',
        data:info,
        success:function(res){
            if(res.statusCode == 502){
              wx.request({
                url: server +'setpw',
                method:'POST',
                data:info,
                success(res){
                  console.log(res);
                  if(res.statusCode == 502){
                    wx.showModal({
                      title: '网络提示',
                      content: '网络错误！请稍后重试！',
                      showCancel: false,
                      confirmText: '我知道了'
                    })
                  }else{
                    if(res.data == 'c_ok'){
                      wx.showToast({
                        title: '密码修改成功！请重新登录',
                        duration:1000,
                        mask:true,
                        success:function(){
                          wx.removeStorage({
                            key: 'name'
                          })
                          wx.removeStorage({
                            key: 'viplogin'
                          })
                          wx.redirectTo({
                            url: '../viplogin/viplogin',
                          })
                        }
                      })
                    }else{
                      wx.showModal({
                        title: '修改提示',
                        content: '原密码错误！',
                      })
                      return false;
                    }
                  }
                }
              })
            }else{
              console.log(res);
              if (res.data == 'c_ok') {
                wx.showToast({
                  title: '密码修改成功！请重新登录',
                  duration: 1000,
                  mask: true,
                  success: function () {
                    wx.removeStorage({
                      key: 'name'
                    })
                    wx.removeStorage({
                      key: 'viplogin'
                    })
                    wx.redirectTo({
                      url: '../viplogin/viplogin',
                    })
                  }
                })
              } else if(res.data == 'c_no'){
                wx.showModal({
                  title: '修改提示',
                  content: '账户异常或原密码错误！',
                })
                return false;
              }
            }
        }
      })
    }
  },
  oldinput:function(e){
    this.setData({
      o_pw:e.detail.value
    })
  },
  newinput1:function(e){
    this.setData({
      n_pw:e.detail.value
    })
  },
  newinput2:function(e){
    this.setData({
      n_pw_test:e.detail.value
    })
  },
  change:function(){
    this.setData({
      tip_show:'no',
      pw_show:''
    })
  },
  r_change: function () {
    this.setData({
      tip_show: '',
      pw_show: 'no'
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