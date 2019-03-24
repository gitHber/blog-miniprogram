const {fetch} = require('../../utils/util.js')
const WxParse = require('../../asset/lib/wxParse/wxParse.js')
const app = getApp()
Page({
  data: {
    title: '',
    author_name: '',
    feature_image: '',
    published_at: '',
    tags: [],
    last: null,
    next: null,
    host: ''
  },

  onLoad: function (options) {
    if(app.globalData.imgHost){
      this.setData({ host: app.globalData.imgHost })
    }
    wx.setNavigationBarTitle({
      title: options.title,
    })
    // 获取文章详情
    fetch.get('/post/get', {
      id: options.id
    }).then(res => {
      if(res){
        const { title, id, feature_image, published_at, author_id, author_name, tags, last, next } = res.data
        WxParse.wxParse('article', 'html', res.data.html, this)
        this.setData({
          title,
          author_name,
          feature_image,
          published_at,
          tags,
          last,
          next
        })
      }
    })
  },
  toTag: function(e) {
    wx.navigateTo({
      url: `/pages/tag/tag?id=${e.detail.id}&title=${e.detail.name}`,
    })
  }
})