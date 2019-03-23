const {fetch} = require('../../utils/util.js')

Page({
  page: {
    start: 0,
    size: 10,
    author_id: ''
  },
  data: {
    posts: [],
    total: 0,
    loading: false,
    noMore: false,
    id: '',
    name: '',
    profile_image: '',
    cover_image: '',
    email: '',
    bio: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    // 获取作者详情
    fetch.get('http://mock.likun.fun/mock/21/test/author/get', { id: options.id}).then(res => {
      if (res) {
        const {
          id,
          name,
          profile_image,
          cover_image,
          email,
          bio
        } = res.data
        this.setData({
          id,
          name,
          profile_image,
          cover_image,
          email,
          bio
        })
      }
    })
    this.page.author_id = options.id
    this.getData(this.page.start, this.page.size, options.id)
  },
  getData: function (start = this.page.start, size = this.page.size, author_id = this.page.author_id) {
    this.setData({
      loading: true
    }, () => {
      fetch.get('https://mock.likun.fun/mock/21/test/post/getList', {
        start,
        size,
        author_id
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