const { fetch } = require("../../utils/util.js");
const WxParse = require("../../asset/lib/wxParse/wxParse.js");
const { host } = require("../../ghost-config");
Page({
  data: {
    title: "",
    author_name: "",
    feature_image: "",
    published_at: "",
    tags: [],
    last: null,
    next: null,
    host: ""
  },

  onLoad: function(options) {
    this.setData({ host });
    wx.setNavigationBarTitle({
      title: options.title
    });
    // 获取文章详情
    fetch
      .get(`/posts/${options.id}`, {
        include: "authors, tags"
      })
      .then(res => {
        if (res) {
          const data = res.posts[0];
          const {
            title,
            id,
            feature_image,
            published_at,
            primary_author,
            tags
          } = data;
          const author_id = primary_author.id;
          const author_name = primary_author.name;
          WxParse.wxParse("article", "html", data.html, this);
          this.setData({
            title,
            author_id,
            author_name,
            feature_image,
            published_at,
            tags
          });
        }
      });
  },
  toTag: function(e) {
    wx.navigateTo({
      url: `/pages/tag/tag?id=${e.detail.id}&title=${e.detail.name}`
    });
  },
  toAuthor: function(e) {
    wx.navigateTo({
      url: `/pages/author/author?id=${this.data.author_id}&title=${
        this.data.author_name
      }`
    });
  }
});
