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

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
