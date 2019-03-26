const {host, url_prefix, client_id, client_secret} = require('../ghost-config')

const filter = function(res) {
  if(res.errors){
    wx.showToast({
      title: res.errors[0].message,
      duration: 2000
    })
    return null
  }
  return res.data
}

const fetch = {
  text: function (url, params) {
    url=host+url
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
    url = host + url_prefix + url
    return new Promise((resolve) => {
      wx.request({
        url,
        data: {
          ...params,
          client_id,
          client_secret
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          resolve(filter(res))
        },
        fail: () => {
          resolve(null)
        }
      })
    })
  },
  post: function(url, params) {
    url = host + url_prefix + url
    return new Promise((resolve) => {
      wx.request({
        url,
        data: {
          ...params,
          client_id,
          client_secret
        },
        method: 'post',
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          resolve(filter(res))
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
