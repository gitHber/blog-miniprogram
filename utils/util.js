const apiHost = 'http://likun.fun:7001'
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
  get: function(url, params) {
    return new Promise((resolve) => {
      wx.request({
        url: apiHost+url,
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
