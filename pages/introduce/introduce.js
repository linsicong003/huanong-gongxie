// introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_introduce:[
      { 'name': '学术部', 'src':'http://littleapp-1252360401.cosgz.myqcloud.com/xsb.jpg'},
      { 'name': '办公室', 'src':'http://littleapp-1252360401.cosgz.myqcloud.com/bgs.jpg'},
      { 'name': '文娱部', 'src':'http://littleapp-1252360401.cosgz.myqcloud.com/wyb.jpg'},
      { 'name': '外联部', 'src':'http://littleapp-1252360401.cosgz.myqcloud.com/wlb.jpg'},
      { 'name': '人资部', 'src':'http://littleapp-1252360401.cosgz.myqcloud.com/rzb.jpg'},
      { 'name': '宣传部', 'src':'http://littleapp-1252360401.cosgz.myqcloud.com/xcb.jpg'}
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  goact:function(e){
    wx.redirectTo({
      url: '../activity/activity',
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