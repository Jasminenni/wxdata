// pages/upload/upload.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath:"",
  },
  uploadClick:function(e){
    var that=this;
    //微信小程序提供的选择的方法
    wx.chooseImage({

      //选择的个数最多是9个
      count:1,
      //选择图片是原图还是压缩图
      sizeType:["compressed"],
      //选择来源：本地相册和相机
      sourceType:["album","camera"],

      success: function(res) {
        //选择的图片
        var tempPaths=res.tempFilePaths;
        console.log("选择本地图片:"+tempPaths);

        //显示出来
        that.setData({imagePath:tempPaths[0]});
        //把图片上传
        uploadFileImage(that,tempPaths[0]);
      },
    })

    //上传图片方法
    function uploadFileImage(page,path)
    {
      //弹出对话框
      wx.showToast({
        title: '正在上传...',
        icon:"loading",//图标的值是固定的
      })
      //开始进行图片上传
      wx.uploadFile({
        url: app.globalData.severurl +'/uploadfiles',
        filePath: path,
        //服务端是根据这个名字来获取上传图片
        name: 'fileimg',
        //二进制流来读取 post请求
        header:{"content-type":"multipart/form-data"},
        success:function(res){
          console.log(res.data);
        }
      })
    }

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