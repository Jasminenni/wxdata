// pages/email/email.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email:"",
    etitle:"",
    econtent:"",
  },
  titleInput:function(event){
    // console.log(event)
    var title=event.detail.value;
    // console.log(title)
    var that=this;
    that.setData({etitle:title});
  },
  conText:function(e){
    var content = e.detail.value;
    var that=this;
    that.setData({econtent:content})
  },
  submitClick:function(e){
    wx.request({
      url: app.globalData.severurl+'/queryMail',
      data:{"email":this.data.email,"etitle":this.data.etitle,"econtent":this.data.econtent},
      method:"get",
      header:{"content-type":"application/json"},
      success:function(res){
        console.log(res.data.flag)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    console.log(options.mail);
    var email=options.mail;
    var that=this;
    that.setData({email:email});

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