const {hosts} = require('../hosts.js')
function responseFilter(data){
  if(data.code !== 200){
    wx.showToast({
      title: data.code+'',
      duration: 2000
    })
    return null
  }
  return data
}
const fetch = {
  text: function (url, params) {
    const urlReg = /^http/i
    if (!urlReg.test(url)) {
      url = hosts.apiHost + url
    }
    return new Promise((resolve) => {
      wx.request({
        url,
        data: params,
        success: (res) => {
          resolve(res)
        },
        fail: () => {
          resolve(null)
        }
      })
    })
  },
  get: function(url, params) {
    const urlReg = /^http/i
    if (!urlReg.test(url)){
      url = hosts.apiHost + url
    }
    return new Promise((resolve) => {
      wx.request({
        url,
        data: params,
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          resolve(responseFilter(res.data))
        },
        fail: () => {
          resolve(null)
        }
      })
    })
  },
  post: function(url, params) {
    const urlReg = /^http/i
    if (!urlReg.test(url)) {
      url = hosts.apiHost + url
    }
    return new Promise((resolve) => {
      wx.request({
        url,
        data: params,
        method: 'post',
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          resolve(responseFilter(res.data))
        },
        fail: () => {
          resolve(null)
        }
      })
    })
  }
}

module.exports = {
  fetch: fetch
}
