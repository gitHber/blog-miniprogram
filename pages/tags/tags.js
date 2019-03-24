const { fetch } = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    tags: [],
    host: ''
  },
  onLoad: function (options) {
    if (app.globalData.imgHost) {
      this.setData({ host: app.globalData.imgHost })
    }
    fetch.get('/tag/getList').then(res => {
      if(res) {
        console.log(res)
        this.setData({
          tags: res.list
        })
      }
    })
  },
  toTag: function(e) {
    wx.navigateTo({
      url: `/pages/tag/tag?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.name}`,
    })
  }
})