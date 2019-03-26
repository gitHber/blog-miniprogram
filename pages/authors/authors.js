const { fetch } = require("../../utils/util.js");
const { host } = require("../../ghost-config");

Page({
  data: {
    authors: [],
    host: ""
  },
  onLoad: function(options) {
    this.setData({ host });
    fetch
      .get("/users/", {
        limit: "all",
        include: "count.posts"
      })
      .then(res => {
        if (res) {
          this.setData({
            authors: res.users
          });
        }
      });
  },
  toAuthor: function(e) {
    wx.navigateTo({
      url: `/pages/author/author?id=${e.currentTarget.dataset.id}&title=${
        e.currentTarget.dataset.name
      }`
    });
  }
});
