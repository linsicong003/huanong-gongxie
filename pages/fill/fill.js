// fill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wanted:['学术部','办公室','文娱部','外联部','宣传部','人资部'],
    // t_select:['采访队','辩论队','快闪队','主持队','礼仪队'],
    t_select: [
      { name: '采访队', value: '采访队',check:'' },
      { name: '辩论队', value: '辩论队', check: '' },
      { name: '舞队', value: '舞队', check: ''  },
      { name: '主持队', value: '主持队', check: ''  },
      { name: '礼仪队', value: '礼仪队', check: ''  },
      { name: '表演队', value: '表演队', check: '' },
      { name: '推广中心', value: '推广中心', check: '' }
    ],
    select_arr:'',
    first:0,
    second:1,
    team:0,
    introduce:'',
    name:'',
    cell_num:'',
    college:'',
    major:'',
    sex:'',
    dorm:'',
    job:'',
    like:'',
    favor:'',
    mail:'',
    click:'no'
      },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const server = getApp().data.server;
    let u_id = wx.getStorageSync('userid');

    //获取是否已经报名
    wx.request({
      url: server + 'newfill',
      method: 'GET',
      data: { 'openid': u_id },
      success: function (e) {
        console.log(e);
        if (e.data.length > 0) {
          wx.setStorageSync('newfill', 'yes');
        } else {
          wx.setStorageSync('newfill', 'no');
        }
      }
    });
  wx.setNavigationBarTitle({
      title: '',
    })
  },
  firstselect:function(e){
    this.setData({
      first:e.detail.value
    })
  },
  secondselect:function(e){
    this.setData({
      second:e.detail.value
    })
  },
  teamselect:function(e){
    this.setData({
      team:e.detail.value
    })
  },
  input:function(e){
    let setdata = e.currentTarget.id;
    this.setData({
      [setdata]:e.detail.value
    })
  },
  sexselect:function(e){
    if(e.detail.value){
      this.setData({
        'sex':'女'
      })
    }else{
      this.setData({
        'sex':'男'
      })
    }
  },
  //选队伍
  checkboxchange:function(e){
    let that = this;
    let arr = e.detail.value;
    //为空时全清空
    if(arr.length == '0'){
        let brr = that.data.t_select;
        for(let j in brr){
          brr[j].check = '';
        }
        that.setData({
          t_select: brr
        })
    }

    //选中效果
    let list = that.data.t_select;
    for (let j in list) {
      list[j].check = '';
    }
    for(let k in arr){
      for(let i in list){
        if(arr[k] == list[i].value){
          list[i].check = 'checked';
          console.log('gou');
          that.setData({
            t_select : list
          })
          break;
        }
      }
    }

    that.setData({
      select_arr:arr
    })
    console.log(e);
    console.log(that.data.select_arr);
  },
  //提交
  submit:function(e){
    const that = this;
    const server = getApp().data.server;
    let u_id = wx.getStorageSync('userid');
    if(this.data.click == 'no'){
      that.setData({
        click:'yes'
      })
      // 加载动画
      if (typeof (wx.showLoading) != 'undefined') {
        wx.showLoading({
          title: '火速连接服务器',
          mask: true
        })
      } else {
        wx.showToast({
          title: '请更新微信版本！！',
        })
      }
      let sel_team = this.data.select_arr.toString().split(',');
      let info = { 'openid': wx.getStorageSync('userid'), 
                  'name': this.data.name,             
                  'sex': this.data.sex, 
                  'cell': this.data.cell_num, 
                  'college': this.data.college, 
                  'major': this.data.major, 
                  'first': this.data.wanted[this.data.first], 
                  'second': this.data.wanted[this.data.second], 
                  'introduce': this.data.introduce,
                  'dorm':this.data.dorm,
                  'job':this.data.job,
                  'like':this.data.like,
                  'favor':this.data.favor,
                  'mail':this.data.mail 
                  };
      console.log(info);
      wx.setStorageSync('newf', '0');
      if (wx.getStorageSync('newfill') == 'yes') {
        if (wx.hideLoading()) {
          wx.hideLoading();
        }
        wx.showModal({
          title: '您已报名！',
          content: '您已经完成报名！如需更改点击更改重新填写',
          cancelColor: '#1296db',
          confirmText: '更改',
          confirmColor: '#ff0033',
          success: function (res) {
            if (res.confirm) {
              that.setData({
                click: 'no'
              })
              //更改报名信息
              wx.request({
                url: server + 'updatefill',
                method: 'POST',
                data: info,
                success: function (res) {
                  if (res.statusCode == 502) {
                    wx.showToast({
                      title: '修改成功!',
                    })
                    wx.switchTab({
                      url: '../index/index',
                    })
                  } else if (res.data == 'success') {
                    wx.showToast({
                      title: '修改成功!',
                    })
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }
                }
              })
            } else if (res.cancel) {
              that.setData({
                click: 'no'
              })
              console.log('cancel');
            }
          }
        })
      } else {
        console.log(info);
        for (let k in info) {
          if (!info[k]) {
            if (wx.hideLoading()) {
              wx.hideLoading();
            }
            wx.setStorageSync('newf', '1');
            wx.showModal({
              title: '检查',
              content: '信息输入不完全，请完整输入',
              showCancel: false,
              confirmText: '我知道了',
              confirmColor: '#1296db',
              success: function (res) {
                if (res.confirm) {
                  return false;
                }else if(res.cancel){
                }
                that.setData({
                  click: 'no'
                })
              }
            })
            console.log('不完全');
          }
        }
        console.log(wx.getStorageSync('newf'));
        if (wx.getStorageSync('newf') == '0') {
          wx.request({
            url: server + 'newfill',
            method: 'POST',
            data: info,
            success: function (res) {
              console.log(res);
              if (res.statusCode == '502') {
                that.setData({
                  click: 'no'
                })
                wx.setStorageSync('newfill', 'yes');
                wx.showToast({
                  title: '报名成功！',
                  mask: true,
                  success: function () {
                    setTimeout(function () {
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }, 2000)
                  }
                })
              } else if (res.data == 'success') {
                that.setData({
                  click: 'no'
                })
                wx.setStorageSync('newfill', 'yes');
                wx.showToast({
                  title: '报名成功！',
                  mask: true,
                  success: function () {
                    setTimeout(function () {
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }, 2000)
                  }
                })
              }
            }
          })
        }
      }
    }else{
      return false;
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
    this.setData({
      'sex':'男'
    })
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