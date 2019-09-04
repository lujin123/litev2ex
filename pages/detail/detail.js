const app = getApp()
const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    content: "",
    allReplyData: [],
    replies: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const detail = app.globalData.currentDetail
    wx.setNavigationBarTitle({
      title: detail.title
    })
    detail.content_rendered = detail.content_rendered.replace(/<img/g, '<img style="max-width:100%;height:auto"')
    console.log(detail)
    
    this.setData({
      detail: detail,
      content: detail.content_rendered
    })

    this.getReplies(id, this.data.replies.length)
  },

  onReachBottom(){
    const page = this.data.page + 1
    this.setData({
      page: page,
      replies: this.data.allReplyData.slice(0, page * 20)
    })
  },

  getReplies(topicId, offset, pageSize=20){
    // mmp哦，v2ex回复接口不能分页...参数无效了...
    const page = offset / pageSize + 1
    wx.request({
      url: 'https://www.v2ex.com/api/replies/show.json',
      data: {
        topic_id: topicId,
        page: page,
        page_size	: pageSize
      },
      success: res => {
        console.log(res.data)
        this.setData({
          allReplyData: res.data.map(item => {
            item.created = utils.formatCustomTime(item.created)
            return item
          }),
          replies: res.data.slice(0, 20)
        })
      }
    })
  },
  tapAvatar(event) {
    const id = event.currentTarget.dataset.id
    console.log('id ==>', id)
    this.data.replies.map(item => {
      if (item.id === id) {
        app.globalData.currentUser = item.member
      }
    })
    wx.navigateTo({
      url: `/pages/user/user?id=${id}`
    })
  }
})