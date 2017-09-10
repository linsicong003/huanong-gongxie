// date.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add_img:'http://littleapp-1252360401.cosgz.myqcloud.com/%E6%B7%BB%E5%8A%A0%E6%B4%BB%E5%8A%A8.png',
    new_title:'',
    new_time:'',
    new_introduce:'',
    add:'',
    click:'no'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const server = getApp().data.server;
    wx.setNavigationBarTitle({
      title: '出去浪呗',
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

    //获取活动列表
    wx.request({
      url: server+'getdatelist',
      data:[],
      method:'GET',
      success:function(res){
        console.log(res);
        if(res.statusCode == '502'){
          wx.request({
            url: server +'getdatelist',
            data:[],
            method:'GET',
            success:function(res){
              if(res.statusCode == '502'){
                wx.showToast({
                  title: '网络错误！请稍后重试',
                })
              }else{
                let result =res.data;
                //生成状态码
                let mydate = new Date();
                let nowtime = mydate.toLocaleDateString().split('/')
                if (nowtime[1] < 10) {
                  nowtime[1] = '0' + nowtime[1].toString();
                }
                if (nowtime[2] < 10) {
                  nowtime[2] = '0' + nowtime[2].toString();
                }
                let thistime = nowtime.join('-');
                console.log(thistime);
                for (let k in result) {
                  if (result[k].finish > thistime) {
                    result[k].status = '进行中';
                  } else {
                    result[k].status = '已结束';
                  }
                }
                that.setData({
                  date: result
                })
                //获取已参加活动
                let name = wx.getStorageSync('name').substring(2);
                let info = { name: name }
                wx.request({
                  url: server + 'getdatelist',
                  method: 'POST',
                  data: info,
                  success: function (res) {
                    console.log(res);
                    if (res.statusCode == 502) {
                      wx.request({
                        url: server + 'getdatelist',
                        method: 'POST',
                        data: info,
                        success: function (res) {
                          console.log(res);
                          if (res.statusCode == 502) {
                            wx.showToast({
                              title: '网络异常',
                            })
                          }
                          else {
                            let result = that.data.date;
                            let join_num = res.data;
                            //判断是否参加
                            for (let j in result) {
                              for (let i in join_num) {
                                if (result[j].id == join_num[i].id) {
                                  result[j].join = 'yes';
                                  break;
                                }
                              }
                            }
                            that.setData({
                              date: result
                            })
                          }
                        }
                      })
                    } else {
                      let result = that.data.date;
                      let join_num = res.data;
                      //判断是否参加
                      for (let j in result) {
                        for (let i in join_num) {
                          if (result[j].id == join_num[i].id) {
                            result[j].join = 'yes';
                            break;
                          }
                        }
                      }
                      that.setData({
                        date: result
                      })
                      console.log(that.data.date);
                    }
                  }
                })
              }
            }
          })
        }else{
          let result = res.data;
          //生成状态码
          let mydate = new Date();
          let nowtime = mydate.toLocaleDateString().split('/')
          if(nowtime[1] <10){
            nowtime[1] = '0'+nowtime[1].toString();
          }
          if (nowtime[2] < 10) {
            nowtime[2] = '0' + nowtime[2].toString();
          }
          let thistime = nowtime.join('-');
          console.log(thistime);
          for (let k in result) {
            if (result[k].finish > thistime) {
              result[k].status = '进行中';
            } else {
              result[k].status = '已结束';
            }
          }
          that.setData({
            date: result
          })
          //获取已参加活动
          let name = wx.getStorageSync('name').substring(2);
          let info = { name: name }
          wx.request({
            url: server + 'getdatelist',
            method: 'POST',
            data: info,
            success: function (res) {
              console.log(res);
              if (res.statusCode == 502) {
                wx.request({
                  url: server + 'getdatelist',
                  method: 'POST',
                  data: info,
                  success: function (res) {
                    console.log(res);
                    if (res.statusCode == 502) {
                      wx.showToast({
                        title: '网络异常',
                      })
                    }
                    else {
                      let result = that.data.date;
                      let join_num = res.data;
                      //判断是否参加
                      for (let j in result) {
                        for (let i in join_num) {
                          if (result[j].id == join_num[i].id) {
                            result[j].join = 'yes';
                            break;
                          }
                        }
                      }
                      that.setData({
                        date: result
                      })
                      console.log(that.data.date);
                    }
                  }
                })
              } else {
                let result = that.data.date;
                let join_num = res.data;
                //判断是否参加
                for (let j in result) {
                  for (let i in join_num) {
                    if (result[j].id == join_num[i].id) {
                      result[j].join = 'yes';
                      break;
                    }
                  }
                }
                that.setData({
                  date: result
                })
                console.log(that.data.date);
              }
            }
          })
        }
      }
    })
    if (wx.hideLoading()) {
      wx.hideLoading();
    }
  },
  //活动名输入
  titleinput:function(e){
      this.setData({
        new_title:e.detail.value
      })
  },
  timeinput:function(e){
    this.setData({
      new_time: e.detail.value
    })
  },
  introduceinput: function (e) {
    this.setData({
      new_introduce: e.detail.value
    })
  },
  addact:function(e){
    const that = this;
    const server = getApp().data.server;
    let title = that.data.new_title;
    let time = that.data.new_time;
    let introduce = that.data.new_introduce;
    let name = wx.getStorageSync('name').substring(2);
    let datetest = /^\d{4}-(0?[1-9]|1[0-2])-((0?[1-9])|((1|2)[0-9])|30|31)$/;

    if(title==''||time==''||introduce==''){
      wx.showModal({
        title: '内容不能留空！',
        showCancel:false,
        confirmText:'知道了'
      })
      return false;
    }
    else if(!datetest.test(time)){
      wx.showModal({
        title: '日期格式错误！',
        showCancel: false,
        confirmText: '知道了'
      })
      return false;
    }
    else{
      wx.showModal({
        title: '确认发布活动',
        content: '确认发布--' + title,
        success: function (res) {
          if (res.confirm) {
            let info = { title: title, finish: time, introduce: introduce, name: name };
            wx.request({
              url: server + 'addact',
              method: 'POST',
              data: info,
              success: function (res) {
                console.log(res);
                wx.showToast({
                  title: '发布活动成功！',
                  success:function(e){
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }
                })
              }
            })
          } else {
            //取消发布
            wx.showToast({
              title: '取消发布！',
              success:function(e){
                that.setData({
                  add: ''
                })
              }
            })
          }
        }
      })
    }
  },
  showadd:function(e){
    this.setData({
      add:'show'
    })
  },
  canceladd:function(e){
    this.setData({
      add:''
    })
  },
  join:function(e){
    const that = this;
    const op = e.currentTarget.dataset;
    const server = getApp().data.server;
    let name = wx.getStorageSync('name').substring(2);
    let d_id = op.d_id;

    if(that.data.click == 'no'){
      that.setData({
        click:'yes'
      })
      if (op.status == '已结束') {
        wx.showToast({
          title: '活动已结束',
          success:function(){
            that.setData({
              click:'no'
            })
          }
        })
        return false;
      } else if (op.join == 'yes') {
        wx.showToast({
          title: '您已参加！',
          success:function () {
            that.setData({
              click: 'no'
            })
          }
        })
        return false;
      }
      else {
        wx.showModal({
          title: '参加活动1',
          content: '尊敬的' + name + ',确定参加该活动吗？',
          cancelText: '不参加',
          confirmText: '参加',
          success: function (res) {
            if (res.confirm) {
              let info = { id: d_id, name: name };
              wx.request({
                url: server + 'join',
                data: info,
                method: 'POST',
                success: function (res) {
                  console.log(res);
                  if (res) {
                    wx.showToast({
                      title: '参加成功！',
                    })
                  }
                }
              })
            } else if(res.cancel) {
              wx.showToast({
                title: '取消成功!',
              })
            }
          }
        })
        that.setData({
          click:'no'
        })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '请不用频繁点击！',
        showCancel:false,
        confirmText:'我知道了'
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