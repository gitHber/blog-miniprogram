// components/post/post.js
const app = getApp()
Component({
  properties: {
    postData: {
      type: Object,
      value: null
    }
  },
  data: {
    host:''
  },
  lifetimes: {
    attached() {
      if (app.globalData.imgHost) {
        this.setData({ host: app.globalData.imgHost })
      }
    }
  },
  methods: {
    toDetail: function(e) {
      wx.navigateTo({
        url: `/pages/post/post?id=${this.properties.postData.id}&title=${this.properties.postData.title}`,
      })
    },
    toAuthor: function(e) {
      wx.navigateTo({
        url: `/pages/author/author?id=${this.properties.postData.author_id}&title=${this.properties.postData.author_name}`,
      })
    }
  }
})
