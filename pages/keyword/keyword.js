const {
  fetch
} = require('../../utils/util.js')

Page({
  page: {
    start: 0,
    size: 10,
    tag_id: ''
  },
  data: {
    posts: [],
    posts_3: [],
    total: 0,
    loading: false,
    noMore: false,
    keyword: ''
  },
  onLoad: function(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.keyword,
    })
    this.setData({ keyword: options.keyword })
    this.getData(this.page.start, this.page.size, options.keyword)
  },

  getData: function(start = this.page.start, size = this.page.size, keyword = this.data.keyword) {
    this.setData({
      loading: true
    }, () => {
      fetch.get('https://mock.likun.fun/mock/21/test/post/getList', {
        start,
        size,
        keyword
      }).then(data => {
        if (data) {
          const {
            list,
            total
          } = data
          let noMore = false
          const posts = [...this.data.posts, ...list]
          this.page.start = this.page.start + 1
          if (posts.length >= total) {
            noMore = true
          }
          this.setData({
            posts,
            total,
            noMore,
            loading: false
          })
        } else {
          this.setData({
            loading: false
          })
        }
      })
    })

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