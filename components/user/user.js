const app = getApp()

Component({
  behaviors: {
    created(){
      
    } 
  },
  lifetimes: {
    attached() {
      if(app.globalData.userInfo){
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      }else if(this.data.canIUse) {
        // getUserInfo 是异步的，加入callback防止未获取到
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      }else {
        // 兼容
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    }
  },
  externalClasses: ['myclass'],
  properties: {

  },
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  methods: {
    // 获取用户授权信息
    getUserInfo: function (e) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  }
})
