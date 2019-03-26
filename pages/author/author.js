const { fetch } = require("../../utils/util.js");
const { host } = require("../../ghost-config");

Page({
  page: {
    page: 1,
    limit: 10,
    author_id: ""
  },
  data: {
    posts: [],
    total: 0,
    loading: false,
    noMore: false,
    id: "",
    name: "",
    profile_image: "",
    cover_image: "",
    email: "",
    bio: "",
    host: ""
  },
  onLoad: function(options) {
    this.setData({ host });

    wx.setNavigationBarTitle({
      title: options.title
    });
    // 获取作者详情
    fetch.get(`/users/${options.id}`, { include: "count.posts" }).then(res => {
      if (res) {
        const {
          id,
          name,
          profile_image,
          cover_image,
          facebook,
          bio
        } = res.users[0];
        this.setData({
          id,
          name,
          profile_image,
          cover_image,
          facebook,
          bio
        });
      }
    });
    this.page.author_id = options.id;
    this.getData(this.page.page, this.page.limit, options.id);
  },
  getData: function(
    page = this.page.page,
    limit = this.page.limit,
    author_id = this.page.author_id,
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
            filter: `authors.id:${author_id}`
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
      this.setData({ noMore: true });
    } else {
      this.getData();
    }
  }
});
