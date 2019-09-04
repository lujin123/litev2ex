const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latestData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLatestData()
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getLatestData(resp => {
      wx.stopPullDownRefresh()
    })
  },

  getLatestData(callback){
    wx.request({
      url: 'https://www.v2ex.com/api/topics/latest.json',

      success: res => {
        console.log(res.data)
        this.setData({
          latestData: res.data.map(item => {
            item.last_modified = utils.formatCustomTime(item.last_modified)
            return item
          })
        })

        if (callback) {
          callback(res)
        }
      }
    })
  },
})