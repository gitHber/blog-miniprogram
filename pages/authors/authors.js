const {
  fetch
} = require('../../utils/util.js')
const {hosts} = require('../../hosts.js')

Page({
  data: {
    authors: [],
    host: ''
  },
  onLoad: function (options) {
    if (hosts.imgHost) {
      this.setData({ host: hosts.imgHost })
    }
    fetch.get('/author/getList').then(res => {
      if (res) {
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