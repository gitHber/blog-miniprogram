// components/tag/tag.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: "tag"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    active: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tap: function(event) {
      console.log(event)
      this.setData({active: !this.data.active})
    }
  }
})
