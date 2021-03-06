//index.js
//获取应用实例
var app = getApp();
const main_url = 'http://littleapp-1252360401.cosgz.myqcloud.com/logo.png';
Page({
  title:"SCAUgongxie",
  data: {
    vipshow:'noshow',
    viploginshow:'',
    main_img:'http://littleapp-1252360401.cosgz.myqcloud.com/header1.jpg',
    //功能
    introduce_img:'http://littleapp-1252360401.cosgz.myqcloud.com/but1.jpg',
    chat_img: 'http://littleapp-1252360401.cosgz.myqcloud.com/but2.jpg',
    weather_img: 'http://littleapp-1252360401.cosgz.myqcloud.com/but3.jpg',
    viplogin_img: 'http://littleapp-1252360401.cosgz.myqcloud.com/but4.jpg',
    call_img: 'http://littleapp-1252360401.cosgz.myqcloud.com/but5.jpg',
    date_img: 'http://littleapp-1252360401.cosgz.myqcloud.com/but6.jpg',
    new_img: 'http://littleapp-1252360401.cosgz.myqcloud.com/but7.jpg',
    control_img: 'http://littleapp-1252360401.cosgz.myqcloud.com/but8.jpg',
    video_img: 'http://littleapp-1252360401.cosgz.myqcloud.com/but9.jpg',
    login_img:main_url,
    userInfo:{},
    //功能信息
    introduce:"协会简介",
    fill:"活动报名",
    call:"查下号码",
    login:"约去浪呗",
    weather:"天气预报",
    viplogin:'我是会员',
    date:'约去浪吧',
    showdata:'查看新生',
    video:'一点视频',
    changeaccount:'账户管理',
    //滑块配置
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad:function(){
    console.log('onload');
    var that = this;
    wx.setNavigationBarTitle({
      title: '华农公协',
    })

  },
  introduce:function(){
    wx.navigateTo({
      url: '../introduce/introduce',
    });
  },
  viplogin:function(e){
    wx.navigateTo({
      url: '../viplogin/viplogin',
    });
    console.log('click login');
  },
  shownum:function(){
    wx.navigateTo({
      url: '../number/number',
    })
  },
  goweather:function(){
    wx.navigateTo({
      url: '../weather/weather',
    })
  },
  gofill:function(){
    wx.navigateTo({
      url: '../activity/activity',
    })
  },
  govideo:function(){
    wx.navigateTo({
      url: '../video/video',
    })
  },
  showdate:function(){
    wx.navigateTo({
      url: '../date/date',
    })
  },
  showfill:function(){
    wx.navigateTo({
      url: '../showdata/showdata',
    })
  },
  changeaccount:function(){
    wx.navigateTo({
      url: '../c_account/c_account',
    })
  },
  //在显示的时候判断是否是会员
  onShow: function () {
    if (wx.getStorageSync('viplogin')=='yes'){
        this.setData({
          vipshow:'',
          viploginshow:'noshow'
        })
    }else{
      this.setData({
          vipshow: 'noshow',
          viploginshow: ''
      })
    }
  }
})
