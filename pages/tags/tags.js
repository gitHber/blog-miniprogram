const { fetch } = require("../../utils/util.js");
const { host } = require("../../ghost-config");

Page({
  data: {
    tags: [],
    host: ""
  },
  onLoad: function(options) {
    this.setData({ host });

    fetch
      .get("/tags/", {
        limit: "all",
        include: "count.posts"
      })
      .then(res => {
        if (res) {
          this.setData({
            tags: res.tags
          });
        }
      });
  },
  toTag: function(e) {
    wx.navigateTo({
      url: `/pages/tag/tag?id=${e.currentTarget.dataset.id}&title=${
        e.currentTarget.dataset.name
      }`
    });
  }
});
