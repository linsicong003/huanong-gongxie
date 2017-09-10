// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    r_text:'hello',
    r_show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const server = getApp().data.server;
    const that = this;
    try{
      if(typeof(wx.getStorageSync('userid'))!='underfined'){
        let openid = wx.getStorageSync('userid');
        wx.request({
          url: server+'search',
          data:{openid:openid},
          method:'POST',
          success:function(res){
            //如果有匹配
            if(res.data.length>0){
              wx.showModal({
                title: '匹配成功!',
                content: '查找到本机已匹配报名['+res.data[0].name+']，是否直接查看该报名结果？',
                confirmText:'查看',
                cancelText:'不查看',
                success:function(e){
                  if(e.confirm){
                    //使用该人结果
                    let r_text = that.parsecode(res.data[0].code);
                    that.setData({
                      s_name:res.data[0].name,
                      s_num :res.data[0].phonecall,
                      r_text:r_text,
                      r_show:true
                    })
                  }
                }
              })
            }
          }
        })
      }
    }
    catch(e){
      console.log(e)
    }
      
  },
  input:function(e){
    this.setData({
      [e.currentTarget.id]:e.detail.value
    })
  },
  parsecode:function(code){
    if(code == 1){
      return '您的报名已送达面试官手中~请保持通讯畅通，耐心等待面试通知 : )';
    }
    else if(code == 2){
      return '面试通知已发放，请检查通讯工具，若错过信息请联系相关工作人员！';
    }
    else if(code == 3){
      return '恭喜你！你已被正式录取成为公协大家庭的一员！赶紧找到你的部长和小伙伴们吧！ : )';
    }
    else if(code == 4){
      return '很遗憾通知你！你没能成为我们的一员。我们的缘分真的只差一点点 : ( 但是还请继续关注我们的后续活动吧~ '
    }else{
      return '信息状态异常！请联系工作人员确认！'
    }
  },
  gosearch:function(e){
    const server = getApp().data.server;
    const that = this;
    let s_name = that.data.s_name;
    let s_num  = that.data.s_num;

    // 加载动画
    if (typeof (wx.showLoading) != 'undefined') {
      wx.showLoading({
        title: '火速连接服务器...',
        mask: true
      })
    } else {
      wx.showToast({
        title: '请更新微信版本！！',
      })
    }

    if(s_name == ''||s_num == ''){
      wx.showModal({
        title: '提示',
        content: '姓名/号码不能为空',
        showCancel:false,
        confirmText:'我知道了',
        success:function(res){
          if(res.confirm){
            if (wx.hideLoading()) {
              wx.hideLoading();
            }
            return false;
          }
        }
      })
    }else{
      wx.request({
        url: server+'search',
        data:{name:s_name,num:s_num},
        method:'POST',
        success:function(res){
          if(res.data.length>0){
            that.setData({
              r_show:true,
              r_text:that.parsecode(res.data[0].code)
            })
          }else{
            that.setData({
              r_show:true,
              r_text:'该信息人尚未线上报名或者信息出现异常，请线上报名后重试或者联系工作人员 : )'
            })
          }
          if (wx.hideLoading()) {
            wx.hideLoading();
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