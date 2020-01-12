const db = wx.cloud.database();
const imgList = db.collection("imgList");
const _ = db.command;
// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: ""
  },
  /**
   * 跳转到发布页面
   */
  public() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  deleteImg(e) {
    // console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let fileID = e.currentTarget.dataset.imgurl;
    // console.log(e.currentTarget.dataset)
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success(res) {
        // console.log(res.confirm)
        if (res.confirm) {
          // 根据id查找云端数据并删除
          imgList.doc(id).remove({
            success(res) {
              // console.log("success", res);
              //删除存储数据
              that.deleteCloudFile(fileID);
              //更新列表
              that.getImgList();
            },
            fail(error) {
              console.log("fail", error);
            }
          })
        }
      }
    })
  },
  /**
   * 删除存储数据
   */
  deleteCloudFile(fileID) {
    wx.cloud.deleteFile({
      fileList: [fileID],
      success(res) {
        // console.log(res, "deleteCloudFile");
      },
      fail(error) {
        console.log("deleteCloudFileFail", error)
      }
    })
  },
  /**
   * 获取图片列表
   */
  getImgList() {
    let that = this;
    // 从云端数据库获取数据
    imgList.get({
      success(res) {
        // console.log(res.data)
        that.setData({
          dataList: res.data
        })
      }
    })

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
    this.getImgList();
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