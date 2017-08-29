// number.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {value:'huizhang',name:'会长团'},
      {value:'xueshubu',name:'学术部'},
      {value:'bangongshi',name:'办公室'},
      {value:'wailianbu',name:'外联部'},
      {value:'wenyubu',name:'文娱部'},
      {value:'xuanchuanbu',name:'宣传部'},
      {value:'renzibu',name:'人资部'}
    ],
    r_check:'huizhang'
  },
  //选择部门处理事件
  doradio:function(e){
    let that = this;
    const server = getApp().data.server;
    that.setData({
      r_check:e.detail.value
    });
    let info = {'type':e.detail.value};
    //如果没有数据那么请求
    if(!wx.getStorageSync(e.detail.value)){
      // 加载动画
      if (typeof (wx.showLoading) != 'undefined'){
        wx.showLoading({
          title: '努力加载中',
          mask:true
        })
      }else{
        wx.showToast({
          title: '请更新微信版本！！',
        })
      }
      //如果点击项没有获取过
      //访问接口获取对应数据
      wx.request({
        url: server+'phonecall',
        data:info,
        method:'POST',
        success: function (res) {
          console.log(res);
          if (res.statusCode == '502') {
            //502错误处理
            wx.request({
              url: server+'phonecall',
              data: info,
              method: 'POST',
              success: function (res) {
                if (res.statusCode == '502') {
                  alert('网络错误！请刷新重试！');
                } else {
                  wx.setStorageSync(e.detail.value, res.data);
                  that.setData({
                    result: res.data
                  })
                  if(wx.hideLoading()){
                    wx.hideLoading();
                  }
                }
              }
            })
          } else {
            wx.setStorageSync(e.detail.value, res.data);
            that.setData({
              result: res.data
            })
            if (wx.hideLoading()) {
              wx.hideLoading();
            }
          }
        }
      })
    }
    //如果有数据直接本地取
    else{
      that.setData({
        result:wx.getStorageSync(e.detail.value)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let info = {'type':'huizhang'};
    const server = getApp().data.server;
    wx.removeStorage({ key: 'huizhang'});
    wx.removeStorage({ key: 'xueshubu' });
    wx.removeStorage({ key: 'bangongshi' });
    wx.removeStorage({ key: 'wailianbu' });
    wx.removeStorage({ key: 'wenyubu' });
    wx.removeStorage({ key: 'renzibu' });
    wx.removeStorage({ key: 'xuanchuanbu' });
    wx.setNavigationBarTitle({
      title: '通讯录',
    })
    // 加载动画
    if (typeof(wx.showLoading )!= 'undefined') {
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
      url: server+'phonecall',
      data: info,
      method: 'POST',
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == '502') {
          //502错误处理
          wx.request({
            url: server+'phonecall',
            data: info,
            method: 'POST',
            header: {
              'Content-type': 'application/json'
            },
            success: function (res) {
              if (res.statusCode == '502') {
                alert('网络错误！请刷新重试！');
              } else {
                wx.setStorageSync('huizhang', res.data);
                that.setData({
                  result: res.data
                })
                if (wx.hideLoading()) {
                  wx.hideLoading();
                }
              }
            }
          })
        } else {
          wx.setStorageSync('huizhang', res.data);
          that.setData({
            result:res.data
          })
          if (wx.hideLoading()) {
            wx.hideLoading();
          }
        }
      }
    })
  },
  //拨打长号
  makelong:function(e){
    let that = this;
    let lnum = that.data.r_check;
    let ind = e.currentTarget.dataset.long;
    let playnum = wx.getStorageSync(lnum);
    wx.makePhoneCall({
      phoneNumber: playnum[ind].longnum
    })
  },
  //拨打短号
  makeshort:function(e){
    let that = this;
    let snum = that.data.r_check;
    let ind = e.currentTarget.dataset.short;
    let playnum = wx.getStorageSync(snum);
    wx.makePhoneCall({
      phoneNumber: playnum[ind].shortnum
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

