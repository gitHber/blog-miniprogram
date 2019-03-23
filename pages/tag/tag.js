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
    id: '',
    name: '',
    feature_image: '',
    description: ''
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    // 获取标签详情
    fetch.get('http://mock.likun.fun/mock/21/test/tag/get',{id: options.id}).then(res => {
      if (res) {
        const {
          id,
          name,
          feature_image,
          description
        } = res.data
        this.setData({
          id,
          name,
          feature_image,
          description
        })
      }
    })
    this.page.tag_id = options.id
    this.getData(this.page.start, this.page.size, options.id)
  },

  getData: function(start = this.page.start, size = this.page.size, tag_id = this.page.tag_id) {
    this.setData({
      loading: true
    }, () => {
      fetch.get('https://mock.likun.fun/mock/21/test/post/getList', {
        start,
        size,
        tag_id
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