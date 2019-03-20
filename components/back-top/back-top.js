// components/back-top/back-top.js
Component({
  /**
   * 组件的属性列表
   */
  pageLifetimes: {
    show: function(){
      const res = wx.getSystemInfoSync()
      this.setData({
        width: res.windowWidth,
        height: res.windowHeight
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: 60,
    height: 60
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backTop: function(e) {
      if(wx.pageScrollTo){
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }
    },
    getData: function(cb) {
      console.log(cb)
      cb.a(this.data)
    }
  }
})
