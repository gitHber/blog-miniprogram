Component({
  externalClasses: ['myclass'],
  properties: {
    list: {
      type: Array,
      value: [],
      observer(list) {
        this.setData({
          dataList: list
        })
      }
    }
  },
  data: {
    
  },
  methods: {
    toDetail: function (e) {
      const {dataset: {id, title}} = e.currentTarget
      wx.navigateTo({
        url: `/pages/post/post?id=${id}&title=${title}`,
      })
    }
  }
})
