const {
  fetch
} = require('../../utils/util.js')
const app = getApp()

Page({
  page: {
    start: 0,
    size: 10,
    tag_id: ''
  },
  data: {
    posts: [],
    total: 0,
    noMore: false,
    keyword: ''
  },
  onLoad: function(options) {
    const {keyword} = options
    
    let posts = app.globalData.allPosts.filter(item => {
      return item.title.includes(keyword) || item.html.includes(keyword) || item.published_at.includes(keyword) || item.primary_author.name.includes(keyword)
    })
    this.setData({posts, total: posts.length, keyword})
  },

  loadMore: function(e) {
    if (this.data.posts.length >= this.data.total) {
      this.setData({
        noMore: true
      })
    } else {
      this.getData()
    }
  }
})