// weather.js
Page({

  data: {
    weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    showday: ['今天', '明天', '']

  },
  //当页面加载完成
  onLoad: function () {
    var that = this;
    var date = new Date();
    date.setDate(date.getDate() + 2);
    this.setData({
      'showday[2]': this.data.weekday[date.getDay()]
    });
    console.log(this.data.showday);

    //获得经纬度
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        var lat = res.latitude;//纬度
        var lng = res.longitude;//经度
        console.log(lat + "-----" + lng);
        that.getCity(lat, lng);//调用自己写的函数获得城市
      },
    })
  },
  //获得城市
  getCity: function (lat, lng) {
    var that = this;
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var param = {
      ak: 'QgDjg59KnbdsL14plwnoP5rUAGKyDYPe',//地图api的ak
      location: lat + "," + lng,//纬经度
      output: 'json'//返回的数据格式
    };
    //发出请求获取数据
    wx.request({
      url: url,
      data: param,
      success: function (res) {
        console.log(res);
        console.log(param);
        var city = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;
        that.setData({//设置数据
          city: city,
          street: street
        });

        //调用自定义的函数获取天气信息
        city = city.substring(0, city.length - 1);//截掉最后一个字
        that.getWeather(city);
      }
    })
  },
  //获取天气信息函数
  getWeather: function (city) {
    var that = this;
    var url = "https://free-api.heweather.com/v5/weather";
    var param = {
      key: "2aa8697712b642e8acf7a5717b60f30b",
      city: city
    };
    //发出请求
    wx.request({
      url: url,
      data: param,
      success: function (res) {
        console.log(res);
        that.setData({
          now: res.data.HeWeather5["0"].now,
          forecast: res.data.HeWeather5["0"].daily_forecast
        });
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