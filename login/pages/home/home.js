// pages/home/home.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studata:[]
  },
  phoneClick:function(e){
   console.log(e)
    var phone = e.currentTarget.dataset.ph;
    wx.makePhoneCall({
      phoneNumber: 'phone',
      success:function(even){
        console.log("拨打成功！")
      },
      fail:function(ev){
        console.log("拨打失败！")
      }
    })
  },
  emailClick:function(e){
    var email = e.currentTarget.dataset.email;
    // console.log(email);
    wx.navigateTo({
      url: '../email/email?mail='+email,

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: app.globalData.severurl +'/stuInfo',
      method:"get",
      header:{"content-type":"application/json"},
      success:function(res){
        console.log("---->"+res.data);  
        var stuDatas = res.data.stuData;
        that.setData({studata:stuDatas});
        console.log(that.data.studata)      
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