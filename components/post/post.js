const {hosts} = require('../../hosts.js')
Component({
  properties: {
    postData: {
      type: Object,
      value: null
    },
    last: {
      type: Object
    },
    next: {
      type: Object
    }
  },
  data: {
    host:''
  },
  lifetimes: {
    attached() {
      if (hosts.imgHost) {
        this.setData({ host: hosts.imgHost })
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
