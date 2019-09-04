//index.js
//获取应用实例
const utils = require('../../utils/util.js')

Page({
  data: {
    hotData: []
  },
  
  onLoad: function () {
    this.getHotData()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getHotData(resp =>{
      wx.stopPullDownRefresh()
    })
  },

  getHotData: function (callback) {
    wx.request({
      url: 'https://www.v2ex.com/api/topics/hot.json',

      success: res => {
        console.log(res.data)
        this.setData({
          hotData: res.data.map(item => {
            item.last_modified = utils.formatCustomTime(item.last_modified)
            return item
          })
        })
        if(callback){
          callback(res)
        }
      }
    })
  }
})
