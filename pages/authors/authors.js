const {
  fetch
} = require('../../utils/util.js')

Page({
  data: {
    authors: []
  },
  onLoad: function (options) {
    fetch.get('http://mock.likun.fun/mock/21/test/author/getList').then(res => {
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