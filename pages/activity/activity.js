// activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  fill:function(e){
      console.log(e.currentTarget.dataset.select);
      if(e.currentTarget.dataset.status == '已结束'){
        wx.showToast({
          title: '您选中的报名已结束！',
        });
      }else if(e.currentTarget.dataset.select == '新生报名'){
        wx.setStorageSync('filltext', e.currentTarget.dataset.select);
        wx.navigateTo({
          url: '../fill/fill',
        })
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: '报名',
    })
    wx.request({
      url: 'https://www.linsicong.cn/fill_list',
      method:'GET',
      success:function(res){
        if (res.statusCode == '502'){
          wx.request({
            url: 'https://www.linsicong.cn/fill_list',
            method:'GET',
            success:function(res){
              if(res.statusCode == '502'){
                wx.showToast({
                  title: '网络错误',
                })
              }else{
                that.setData({
                  activity: res.data
                })
              }
            }
          })
        }else{
          that.setData({
            activity: res.data
          })
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