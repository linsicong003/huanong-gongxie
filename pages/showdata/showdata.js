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
    r_check: 'all',
    s_check: 'all',
    result:'',
    tip_num:'',
    complete:'',
    detail:'noshow'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
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
      url: 'https://www.linsicong.cn/getfill',
      method:'GET',
      data:[],
      success:function(res){
        console.log(res);
        if(res.statusCode == 502){
          wx.request({
            url: 'https://www.linsicong.cn/getfill',
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
    }

    // 点击事件判断及对应响应事件
    let a = wx.getStorageSync('new_list');
    let b = [];

    // 都为全部
    if(gd.r_check == 'all' && gd.s_check == 'all'){
      that.setData({
        result: a,
        tip_num: a.length
      })
    }
    // 部门全部筛选队伍
    else if(gd.r_check == 'all' && gd.s_check != 'all'){
      for(let i in a){
        let choose_team = a[i].team.split(' ');
        for (let n in choose_team){
          if(choose_team[n] == gd.s_check){
            b.push(a[i])
          }
        }
      }
      that.setData({
        result:b,
        tip_num:b.length
      })
    }
    // 队伍不限筛选部门
    else if(gd.s_check == 'all' && gd.r_check != 'all'){
      for(let k in a){
        if(a[k].first == gd.r_check){
          b.push(a[k]);
        }
      }
      that.setData({
        result: b,
        tip_num: b.length
      })
    }
    // 两个条件一起筛选
    else{
      for(let j in a){
        let choose_team = a[j].team.split(' ');
        for(let n in choose_team){
          if (a[j].first == gd.r_check && choose_team[n] == gd.s_check) {
            b.push(a[j]);
          }
        }
      }
      that.setData({
        result: b,
        tip_num: b.length
      })
    }
  },
  showdetail:function(e){
    console.log(e);
    let a = wx.getStorageSync('new_list');
    for(let i in a){
      if(a[i].name == e.currentTarget.dataset.name && a[i].phonecall == e.currentTarget.dataset.phone){
        this.setData({
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