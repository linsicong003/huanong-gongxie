// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    v_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const that = this;
      const server = getApp().data.server;
      wx.setNavigationBarTitle({
        title: '公协视频',
      })
      // 加载动画
      if (typeof (wx.showLoading) != 'undefined') {
        wx.showLoading({
          title: '努力加载中',
          mask: true
        })
      } else {
        wx.showToast({
          title: '请更新微信版本！！',
        })
      }
      wx.request({
        url: server+'getvideo',
        data:[],
        method:'GET',
        success:function(res){
          console.log(res);
          that.setData({
            result:res.data
          })
          if (wx.hideLoading()) {
            wx.hideLoading();
          }
        }
      })

  
  },
  play:function(e){
    console.log(e);
    const that = this;

    that.videoContext = wx.createVideoContext(e.currentTarget.id);
    // 加载动画
    console.log(that.videoContext);
    that.videoContext.requestFullScreen();
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