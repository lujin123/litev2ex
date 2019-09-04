const app = getApp()
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const user = app.globalData.currentUser

    wx.setNavigationBarTitle({
      title: `${user.username} - 个人资料`
    })

    user.created = utils.formatTime(new Date(user.created * 1000))
    this.setData({
      user: user
    })
  },
})