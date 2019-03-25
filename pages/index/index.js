const {
  fetch
} = require('../../utils/util.js')
const { hosts } = require('../../hosts.js')

Page({
  page: {
    start: 1,
    size: 10
  },
  carousel: {},
  data: {
    posts: [],
    posts_3: [],
    total: 0,
    loading: false,
    noMore: false,
    host: '',
    extraClass: '',
    carouselHeight: ''
  },
  onLoad: function() {
    if (hosts.imgHost){
      this.setData({ host: hosts.imgHost})
    }
    
    // 保存作为头部
    this.getData(this.page.start, this.page.size, (posts) => {
      this.setData({
        posts_3: posts.slice(0, 3)
      })
    })
  },
  onReady: function() {
    const query = wx.createSelectorQuery()
    query.select('.carousel').boundingClientRect(rect => {
      this.setData({
        carouselHeight: rect.height
      })
    }).exec()
  },
  getData: function(start = this.page.start, size = this.page.size, callback) {
    this.setData({
      loading: true
    }, () => {
      fetch.get('/post/getList', {
        start,
        size
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
          callback && callback(posts)
        } else {
          this.setData({
            loading: false
          })
        }
      })
    })

  },
  onSearch: function(e) {
    if (e.detail.value) {
      wx.navigateTo({
        url: `/pages/keyword/keyword?keyword=${e.detail.value}`
      })
    }
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