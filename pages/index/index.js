const {fetch} = require('../../utils/util.js')

Page({
  page: {
    start: 0,
    size: 10
  },
  data: {
    posts: [],
    posts_3: [],
    total: 0,
    loading: false,
    noMore: false
  },
  onLoad: function() {
    // 保存作为头部
    this.getData(this.page.start, this.page.size, (posts) => {
      this.setData({
        posts_3: posts.slice(0, 3)
      })
    })
  },
  getData: function(start = this.page.start, size = this.page.size, callback) {
    this.setData({
      loading: true
    }, () => {
      fetch.get('https://mock.likun.fun/mock/16/test/post/getList', {
        start,
        size
      }).then(data => {
        if(data){
          const { list, total } = data
          let noMore = false
          const posts = [...this.data.posts, ...list]
          this.page.start = this.page.start + 1
          if(posts.length >= total){
            noMore = true
          }
          this.setData({
            posts,
            total,
            noMore,
            loading: false
          })
          callback && callback(posts)
        }else{
          this.setData({
            loading: false
          })
        }
      })
    })

  },
  onSearch: function(value) {
    console.log(value)
  },
  loadMore: function(e) {
    if (this.data.posts.length >= this.data.total) {
      this.setData({noMore: true})
    }else{
      this.getData()
    }
  }
})