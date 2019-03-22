// components/post/post.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    postData: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail: function(e) {
      wx.navigateTo({
        url: `/pages/post/post?id=${this.properties.postData.id}&title=${this.properties.postData.title}`,
      })
    }
  }
})
