const {fetch} = require('../../utils/util.js')
const WxParse = require('../../asset/lib/wxParse/wxParse.js')
Page({
  data: {
    title: '',
    author_name: '',
    feature_image: '',
    published_at: '',
    tags: []
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    // 获取文章详情
    fetch.get('https://mock.likun.fun/mock/16/test/post/get', {
      id: options.id
    }).then(res => {
      if(res){
        const { title, id, feature_image, published_at, author_id, author_name, tags } = res.data
        WxParse.wxParse('article', 'html', res.data.html, this)
        this.setData({
          title,
          author_name,
          feature_image,
          published_at,
          tags
        })
      }
    })
  },
  toTag: function(e) {
    wx.navigateTo({
      url: `/pages/tag/tag?id=${e.detail.id}`,
    })
  }
})