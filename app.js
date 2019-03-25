const {fetch} = require('./utils/util.js')
const Parser = require('./asset/lib/xmlParse/dom-parser.js')
const moment = require('moment')

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    // // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // rss订阅
    this.getRss()
  },
  // 通过rss获取所有文章
  getRss: function() {
    fetch.text('https://blog.likun.fun/rss/').then(res => {
      if(res){
        const xmlParser = new Parser.DOMParser()
        const doc = xmlParser.parseFromString(res.data)
        let allPosts = Array.from(doc.getElementsByTagName('item')).map(item => {
          let post = {}
          post.title = item.getElementsByTagName('title')[0].firstChild.nodeValue
          post.html = item.getElementsByTagName('content:encoded')[0].firstChild.nodeValue
          post.id = item.getElementsByTagName('guid')[0].firstChild.nodeValue
          post.author_name = item.getElementsByTagName('dc:creator')[0].firstChild.nodeValue
          post.published_at = moment(item.getElementsByTagName('pubDate')[0].firstChild.nodeValue).format('YYYY-MM-DD HH:mm:ss')
          return post
        }) 
       this.globalData.allPosts = allPosts
      }
    })
  },
  globalData: {
    userInfo: null,
    allPosts: []
  }
})