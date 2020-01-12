const db = wx.cloud.database();
const imgList = db.collection("imgList");
const _ = db.command;

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "",
    showImg: true
  },
  /**
   * 上传图片
   */
  upload() {
    let that = this;
    wx.chooseImage({
      count: 2,
      success: function(res) {
        wx.showLoading({
          title: '上传中...'
        })

        // 多图片处理
        res.tempFilePaths.forEach((res, item) => {

          // 定义云存储名称
          let imgName = Math.random() * 100 + ".png";
          // 云存储
          wx.cloud.uploadFile({
            cloudPath: imgName,
            filePath: res,
            success(res) {
              // 隐藏
              wx.hideLoading();
              that.setData({
                imgUrl: res.fileID,
                showImg: false
              })
              // 插入数据库
              that.addImgList(res.fileID)

            },
            fail: console.error
          })
        })
      },
    })
  },
  /**
   * 添加图片列表
   */
  addImgList(imgUrl) {
   
    let data = {
      name: "$$",
      imgUrl: imgUrl,
      time: this.getNowDate()
    }
    
    imgList.add({
      data,
      success(res) {
        // console.log(res)
        wx.showToast({
          title: '上传成功',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/list/list'
          })
        }, 1000)

      },
      fail(error) {
        console.log("error", error)
      },
      complete(res) {
      }
    })
  },
  // 获取时间
  getNowDate() {
    let date = new Date();
    let month = (date.getMonth() + 1 + "").padStart(2, "0");
    let day = (date.getDate() + "").padStart(2, "0");
    let hour = (date.getHours() + "").padStart(2, "0");
    let minute = (date.getMinutes() + "").padStart(2, "0");
    let second = (date.getSeconds() + "").padStart(2, "0");
    let currentDate = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return currentDate;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})