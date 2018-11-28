// pages/login/login.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navImg:[],
    codeValue:"",
    nameLog:"",
    pwdLog:"",
    codeLog:"",
    result:""

  },
  nameInput:function(e){
    console.log(e)
    var name = e.detail.value;
    var that=this;
    that.setData({"nameLog":name})
  },

  pwdinput:function(event){
    var pwd = event.detail.value;
    var that = this;
    that.setData({ "pwdLog": pwd });
    // console.log(that.data.pwdLog)
  },

  codeInput:function(e){
    var code=e.detail.value;
    var that=this;
    that.setData({codeLog:code});
  },

  recodeLog:function(e){
    //此处定义的this面向的是整个页面
    var that = this;
    wx.request({
      url: app.globalData.severurl+'/recode',
      header:{"content-type":"application/json"},
      success:function(res){
        // console.log(res.data);
        var reCode=res.data;

        //此处不能再定义this，若此处定义this代表的是这个成功函数的对象
        that.setData({codeValue:reCode});
        // console.log(that.data.codeValue)

      }
    })
  },
  submitClick:function(e){
    var that=this;
    var codeLog = that.data.codeLog;
    var codeValue=that.data.codeValue;
    if(codeLog==codeValue){
      console.log("提交验证登录！")
      wx.request({
        url: app.globalData.severurl +'/namePwd',
        data:{"name":that.data.nameLog,"pwd":that.data.pwdLog},
        method:"get",
        header:{"content-type":"application/json"},
        success:function(res){
          console.log(res);
          var result = res.data.checklog;

          if (result== "None")
          {
            var resultlog="经系统判断，并无此人，请注册！"
            // console.log("查无此人")
            that.setData({result:resultlog})
          }
          else if(result=="毕业"||result=="休学"){
            var resultlog="经系统判断，该同学已"+result
            // console.log(result)
            that.setData({ result: resultlog })
          }
          else{
            wx.navigateTo({
              url: '../home/home',
            })
          }
        }
      })
      
      }
    else {
      var resultlog="您输入的验证码不正确，请重新输入！"
      that.setData({ result: resultlog})
    }
  },
  zhuceClick:function(e){
    
    wx.navigateTo({
      url: '../zhuce/zhuce',
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: app.globalData.severurl +'/lunbo',
      method:"get",
      header:{"content-type":"application/json"},
      success:function(res){
        // console.log(res.data)
        // console.log(res.data.navImg);
        var naving = res.data.navImg;
        var codeVal = res.data.codeValue;
        that.setData({ navImg: naving, codeValue:codeVal})
        // console.log(that.data.navImg)
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