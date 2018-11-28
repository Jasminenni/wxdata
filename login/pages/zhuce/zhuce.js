// pages/zhuce/zhuce.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempPath:"",
    name:"",
    pwd:"",
    text:"",
    state:"1",
    // ImgPath:"",
    sex:"",
 
  },
  addImg:function(e){
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType:["compressed"],
      sourceType:["album","camera"],

      success: function(res) {
        var tempPaths=res.tempFilePaths;
        that.setData({tempPath:tempPaths[0]});
        onloadImgPath(that,tempPaths[0]);
      },
    })
    function onloadImgPath(page,path){
      wx.showToast({
        title: '正在上传...',
        icon:"loading",
      })
      wx.uploadFile({
        url: app.globalData.severurl +'/uploadfiles',
        filePath: path,
        name: 'fileimg',
        header: { "content-type":"multipart/form-data"},
        success:function(res){
          // console.log(res+"........");
          // console.log("*******"+res.data.ImgPath);
          // var img = res.data.ImgPath;
          // that.setData({ImgPath:img});
          // console.log("-----》"+that.data.ImgPath);
        }
      })
    }
  },
  nameInput:function(e){
    // console.log(e)
    var name=e.detail.value;
    var that=this;
    that.setData({name:name})
    // console.log(that.data.name)
  },
  nameblur:function(e){
    var that=this;
    var sqlname=that.data.name;
    wx.request({
      url:app.globalData.severurl +'/name',
      data:{"sqlname":sqlname},
      header:{"content-type":"application/json"},
      success:function(res){
        console.log(res.data);
        var resu = res.data.resqlname;
        if(resu==1){
          var txt = "您输的名字已注册，请重新输入！"
          that.setData({ text: txt })
        }
        else{
        }
      }
    })
  },
  pwdInput:function(e){
    var pwd = e.detail.value;
    var that = this;
    that.setData({ pwd:pwd })
    // console.log(that.data.pwd)
  },
  radiosex:function(r){
    console.log(r.detail.value);
    var sex = r.detail.value;
    var that=this;
    that.setData({sex:sex});
    // console.log(that.data.sex);
  },
  
  zhuceClick:function(e){
    var that = this;
    var name = that.data.name;
    var pwd = that.data.pwd;
    var sex = that.data.sex;
    var state = that.data.state;
  console.log("--------")
    console.log(name, pwd, sex, state);
    wx.request({
      url: app.globalData.severurl + '/zhuce',
      data: { "sqlname": name, "sqlpwd": pwd, "sex": sex, "state": state },//"image": ImgPath,
      header:{"content-type":"application/json"},
      success:function(res){
        console.log(res.data)
        var data=res.data;
        if(data==1)
        {
          var txt = "您已成功注册！"
          that.setData({ text: txt })
          
        }
        else{
          var txt = "注册失败！！"
          that.setData({ text: txt })
          
         
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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