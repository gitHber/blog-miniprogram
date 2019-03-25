const { fetch } = require('../../utils/util.js')
const {hosts} = require('../../hosts.js')

Page({
  data: {
    tags: [],
    host: ''
  },
  onLoad: function (options) {
    if (hosts.imgHost) {
      this.setData({ host: hosts.imgHost })
    }
    fetch.get('/tag/getList').then(res => {
      if(res) {
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