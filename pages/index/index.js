const { fetch } = require("../../utils/util.js");

const { host } = require("../../ghost-config");

Page({
  page: {
    page: 1,
    limit: 10
  },
  carousel: {},
  data: {
    posts: [],
    posts_3: [],
    total: 0,
    loading: false,
    noMore: false,
    host: "",
    extraClass: "",
    carouselHeight: ""
  },
  onLoad: function() {
    this.setData({ host });
    // 保存作为头部
    this.getData(this.page.page, this.page.limit, posts => {
      this.setData({
        posts_3: posts.slice(0, 3)
      });
    });
  },
  onReady: function() {
    const query = wx.createSelectorQuery();
    query
      .select(".carousel")
      .boundingClientRect(rect => {
        this.setData({
          carouselHeight: rect.height
        });
      })
      .exec();
  },
  getData: function(page = this.page.page, limit = this.page.limit, callback) {
    this.setData(
      {
        loading: true
      },
      () => {
        fetch
          .get("/posts/", {
            page,
            limit,
            include: "authors, tags"
          })
          .then(res => {
            if (res) {
              let {
                posts,
                meta: {
                  pagination: { total }
                }
              } = res;
              let noMore = false;
              posts = [...this.data.posts, ...posts];
              this.page.page = this.page.page + 1;
              if (posts.length >= total) {
                noMore = true;
              }
              this.setData({
                posts,
                total,
                noMore,
                loading: false
              });
              callback && callback(posts);
            } else {
              this.setData({
                loading: false
              });
            }
          });
      }
    );
  },
  onSearch: function(e) {
    if (e.detail.value) {
      wx.navigateTo({
        url: `/pages/keyword/keyword?keyword=${e.detail.value}`
      });
    }
  },
  loadMore: function(e) {
    if (this.data.posts.length >= this.data.total) {
      this.setData({
        noMore: true
      });
    } else {
      this.getData();
    }
  }
});
