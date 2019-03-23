// components/last-next/last-next.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    last: {
      type: Object,
      observer(value) {
        
        console.log(Boolean(value))
      }
    },
    next: {
      type: Object
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
    toPost: function(e) {
      wx.navigateTo({
        url: `/pages/post/post?id=${e.currentTarget.dataset.id}`
      })
    }
  }
})
