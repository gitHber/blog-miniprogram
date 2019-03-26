const { host } = require("../../ghost-config.js");
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
    host: ""
  },
  lifetimes: {
    attached() {
      this.setData({
        host
      });
    }
  },
  methods: {
    toDetail: function(e) {
      wx.navigateTo({
        url: `/pages/post/post?id=${this.properties.postData.id}&title=${
          this.properties.postData.title
        }`
      });
    },
    toAuthor: function(e) {
      if (this.properties.postData.primary_author.id) {
        wx.navigateTo({
          url: `/pages/author/author?id=${
            this.properties.postData.primary_author.id
          }&title=${this.properties.postData.primary_author.name}`
        });
      }
    },
    toTag: function(e) {
      wx.navigateTo({
        url: `/pages/tag/tag?id=${e.detail.id}&title=${e.detail.name}`
      });
    }
  }
});
