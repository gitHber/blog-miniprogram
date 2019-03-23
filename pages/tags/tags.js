const { fetch } = require('../../utils/util.js')

Page({
  data: {
    tags: []
  },
  onLoad: function (options) {
    fetch.get('http://mock.likun.fun/mock/21/test/tag/getList').then(res => {
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