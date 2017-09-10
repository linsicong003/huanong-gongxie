// showdata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { value: 'all', name: '全部' },
      { value: '学术部', name: '学术部' },
      { value: '办公室', name: '办公室' },
      { value: '外联部', name: '外联部' },
      { value: '文娱部', name: '文娱部' },
      { value: '宣传部', name: '宣传部' },
      { value: '人资部', name: '人资部' }
    ],
    high_items:[
      {value:'all',name:'不限'},
      {value:'采访队',name:'采访队'},
      {value:'辩论队',name:'辩论队'},
      {value:'舞队',name:'舞队'},
      {value:'主持队',name:'主持队'},
      {value:'礼仪队',name:'礼仪队'},
      { value: '表演队', name: '表演队' },
      {value: '推广中心', name: '推广中心' }
    ],
    codes_items:[
      {value:'all',name:'不限'},
      {value:'1',name:'待处理'},
      {value:'2',name:'已通知'},
      {value:'3',name:'已录取'},
      {value:'4',name:'已回绝'}
    ],
    codes:[
      {value:'已通知',name:'已通知'},
      {value:'已录取',name:'已录取'},
      {value:'已回绝',name:'已回绝'}
    ],
    r_check: 'all',
    s_check: 'all',
    c_check: 'all',
    result:'',
    tip_num:'',
    complete:'',
    detail:'noshow',
    status_select:'',
    note:'',
    s_name:'',
    s_first:'',
    s_sec:'',
    change:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  com_show:function(e){
    let group = wx.getStorageSync('group');
    let f_group = this.data.s_first;
    let s_group = this.data.s_sec;

    if(group == f_group || group == s_group ||group == '会长'){
      this.setData({
        change: !this.data.change
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '只有志愿是本部门的人或者是会长团才可以进行相关操作哦~',
        showCancel: false,
        confirmText: '我知道了',
        success: function (res) {
        }
      })
    }
  },
  onLoad: function (options) {
    let that = this; 
    const server = getApp().data.server;
    wx.setNavigationBarTitle({
      title: '查看新生报名',
    })

    wx.removeStorage({
      key: 'new_list',
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
      url: server+'getfill',
      method:'GET',
      data:[],
      success:function(res){
        console.log(res);
        if(res.statusCode == 502){
          wx.request({
            url: server+'getfill',
            method:'GET',
            data:[],
            success:function(res){
              if(res.statusCode == 502){
                wx.showToast({
                  title: '网络错误！请稍后重试！',
                })
              }else{
                that.setData({
                  result: res.data,
                  tip_num:res.data.length,
                  complete: res.data[0]
                })
                if (wx.hideLoading()) {
                  wx.hideLoading();
                }
                wx.setStorage({
                  key: 'new_list',
                  data: res.data                })
              }
            }
          })
        }else{
          that.setData({
            result: res.data,
            tip_num:res.data.length,
            complete: res.data[0]

          })
          if (wx.hideLoading()) {
            wx.hideLoading();
          }
          wx.setStorage({
            key: 'new_list',
            data: res.data,
          })
        }      }
    })
  
  },
  doselect:function(e){
    const that = this;
    const gd   = that.data;
    const server = getApp().data.server;

    that.setData({
      status_select:e.detail.value
    })
  },
  note:function(e){
    this.setData({
      note:e.detail.value
    })
  },
  //提交状态更改
  submit:function(e){
    const that = this;
    const gd = that.data;
    const server = getApp().data.server;
    const user =  wx.getStorageSync('name').substring(2);
    let   info = {name:gd.s_name,first:gd.s_first,status:gd.status_select,note:gd.note,last:user};

    // 加载动画
    if (typeof (wx.showLoading) != 'undefined') {
      wx.showLoading({
        title: '火速连接服务器..',
        mask: true
      })
    } else {
      wx.showToast({
        title: '请更新微信版本！！',
      })
    }

    if(gd.s_status_select==''||gd.note==''){
        wx.showModal({
          title: '提示',
          content: '状态跟备忘录缺一不可哦~',
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
      //开始提交
      wx.request({
        url: server+'charge',
        data:info,
        method:'POST',
        success:function(res){
          if(res.data == 'success'){
            wx.showToast({
              title: '修改成功！',
            })
            if (wx.hideLoading()) {
              wx.hideLoading();
            }
            wx.redirectTo({
              url: '../showdata/showdata',
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '修改失败！请联系管理员',
              showCancel: false,
              confirmText: '我知道了',
              success: function (res) {
                if (res.confirm) {
                  if (wx.hideLoading()) {
                    wx.hideLoading();
                  }
                  return false;
                }
              }
            })
          }
        }
      })
    }
  },
  doradio:function(e){
    let that = this;
    let gd = that.data;
    console.log(e);
    // 判断点击的是部门选项还是队伍选项
    if(e.currentTarget.dataset.type == 'group'){
      that.setData({
        r_check:e.detail.value
      });
    }else if(e.currentTarget.dataset.type == 'team'){
      that.setData({
        s_check:e.detail.value
      })
    } else if (e.currentTarget.dataset.type == 'code'){
      that.setData({
        c_check:e.detail.value
      })
    }

    // 点击事件判断及对应响应事件
    let a = wx.getStorageSync('new_list');
    let b = [];

    //筛选
    for(let i in a){
      //部门
      let c1 = a[i].first==gd.r_check||gd.r_check=='all';
      // //队伍
      // let c2;
      // let choose_team = a[i].team.split(' ');
      // for (let k in choose_team){
      //   if(choose_team[k] == gd.s_check){
      //     c2 =true;
      //   }
      // }
      // c2 = c2||gd.s_check == 'all';
      //状态
      let c3 = a[i].code==gd.c_check||gd.c_check=='all';
      if(c1&&c3){
        b.push(a[i]);
      }
    }

    that.setData({
      result:b,
      tip_num:b.length
    })

    // // 都为全部
    // if(gd.r_check == 'all' && gd.s_check == 'all'){
    //   that.setData({
    //     result: a,
    //     tip_num: a.length
    //   })
    // }
    // // 部门全部筛选队伍
    // else if(gd.r_check == 'all' && gd.s_check != 'all'){
    //   for(let i in a){
    //     let choose_team = a[i].team.split(' ');
    //     for (let n in choose_team){
    //       if(choose_team[n] == gd.s_check){
    //         b.push(a[i])
    //       }
    //     }
    //   }
    //   that.setData({
    //     result:b,
    //     tip_num:b.length
    //   })
    // }
    // // 队伍不限筛选部门
    // else if(gd.s_check == 'all' && gd.r_check != 'all'){
    //   for(let k in a){
    //     if(a[k].first == gd.r_check){
    //       b.push(a[k]);
    //     }
    //   }
    //   that.setData({
    //     result: b,
    //     tip_num: b.length
    //   })
    // }
    // // 两个条件一起筛选
    // else{
    //   for(let j in a){
    //     let choose_team = a[j].team.split(' ');
    //     for(let n in choose_team){
    //       if (a[j].first == gd.r_check && choose_team[n] == gd.s_check) {
    //         b.push(a[j]);
    //       }
    //     }
    //   }
    //   that.setData({
    //     result: b,
    //     tip_num: b.length
    //   })
    // }
  },
  showdetail:function(e){
    console.log(e);
    let a = wx.getStorageSync('new_list');
    for(let i in a){
      if(a[i].name == e.currentTarget.dataset.name && a[i].phonecall == e.currentTarget.dataset.phone){
        a[i].code = e.currentTarget.dataset.code;
        this.setData({
          s_name:a[i].name,
          s_first:a[i].first,
          s_sec:a[i].second,
          complete:a[i],
          detail:''
        })
        break;
      }
    }
  },
  hideit:function(){
    this.setData({
      detail:'noshow'
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