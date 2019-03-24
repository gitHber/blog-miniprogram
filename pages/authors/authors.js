const {
  fetch
} = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    authors: [],
    host: ''
  },
  onLoad: function (options) {
    if (app.globalData.imgHost) {
      this.setData({ host: app.globalData.imgHost })
    }
    fetch.get('/author/getList').then(res => {
      if (res) {
        console.log(res)
        this.setData({
          authors: res.list
        })
      }
    })
  },
  toAuthor: function (e) {
    wx.navigateTo({
      url: `/pages/author/author?id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.name}`,
    })
  }
})