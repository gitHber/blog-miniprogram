const { fetch } = require("../../utils/util.js");
const { host } = require("../../ghost-config");

Page({
  page: {
    page: 1,
    limit: 10,
    tag_id: ""
  },
  data: {
    posts: [],
    posts_3: [],
    total: 0,
    loading: false,
    noMore: false,
    id: "",
    name: "",
    feature_image: "",
    description: "",
    host: ""
  },
  onLoad: function(options) {
    this.setData({ host });

    wx.setNavigationBarTitle({
      title: options.title
    });
    // 获取标签详情
    fetch.get(`/tags/${options.id}`, { include: "count.posts" }).then(res => {
      if (res) {
        const { id, name, feature_image, description, count } = res.tags[0];
        this.setData({
          id,
          name,
          feature_image,
          description
        });
      }
    });
    this.page.tag_id = options.id;
    this.getData(this.page.page, this.page.limit, options.id);
  },

  getData: function(
    page = this.page.page,
    limit = this.page.limit,
    tag_id = this.page.tag_id,
    callback
  ) {
    this.setData(
      {
        loading: true
      },
      () => {
        fetch
          .get("/posts/", {
            page,
            limit,
            include: "authors, tags",
            filter: `tags.id:${tag_id}`
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
