// components/list/list.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTitle(event) {
      const id = event.currentTarget.dataset.id
      console.log('click title =>', id)
      this.data.listData.map(item => {
        if (item.id === id) {
          app.globalData.currentDetail = item
        }
      })
      wx.navigateTo({
        url: `../detail/detail?id=${id}`
      })
    },

    tapAvatar(event){
      const id = event.currentTarget.dataset.id
      console.log('id ==>', id)
      this.data.listData.map(item => {
        if (item.id === id) {
          app.globalData.currentUser = item.member
        }
      })
      wx.navigateTo({
        url: `/pages/user/user?id=${id}`
      })
    }
    
  }
})
