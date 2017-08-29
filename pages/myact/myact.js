// myact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act:{title:'无'}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const that = this;
      const server = getApp().data.server;
      let name = wx.getStorageSync('name').substring(2);

      wx.request({
        url: server+'addact',
        method:'GET',
        data:{name:name},
        success:function(res){
          if(res.statusCode == 502){
            wx.request({
              url: server+'addact',
              method:'GET',
              data:{name:name},
              success:function(res){
                console.log(res);
                if(res.statusCode == 502){
                  wx.showToast({
                    title: '网络异常！',
                  })
                }else{
                  let op = res.data;
                  let arr = [];
                  let brr = [];
                  for(let i in op){
                    let flag = 0;
                    for(let k in arr){
                      if(op[i].id == arr[k].id){
                        flag = 1;
                        break;
                      }
                    }
                    if(flag == 0){
                      arr.push({id:op[i].id,title:op[i].title});
                    }
                  }
                  for(let j in arr){
                    arr[j].member = [];
                    for(let n in op){
                      if(op[n].id == arr[j].id){
                        arr[j].member.push(op[n].join_name);
                      }
                    }
                  }
                  console.log(arr);
                  that.setData({
                    act:arr
                  })
                }
              }
            })
          }
            console.log(res);
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