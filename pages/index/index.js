
Page({
  page: {
    start: 0,
    size: 10
  },
  data: {
    posts: [],
    posts_3: []
  },
  onLoad: function () {
    this.getData(this.page.start, this.page.size, (posts)=> {
      this.setData({
        posts_3: posts.slice(0, 3)
      })
    })
  },
  getData: function(start=this.page.start, size=this.page.size, callback) {
    wx.request({
      url: 'https://mock.likun.fun/mock/16/test/post/get',
      data: {
        start,
        size
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        const posts = [...this.data.posts, ...res.data.data]
        this.page.start = this.page.start + 1
        this.setData({
          posts
        })
        callback && callback(posts)
      }
    })
  },
  onSearch: function(value) {
    console.log(value)
  },
  loadMore: function(e) {
    this.getData()
  }
})
