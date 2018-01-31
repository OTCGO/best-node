const request = require('request')

function getBlockCount (url) {
  console.log('getBlockCount:url', url)
  let options = {
    method: 'POST',
    url,
    headers:
    {
      'content-type': 'application/json'
    },
    body: {
      jsonrpc: '2.0', method: 'getblockcount', params: [], id: 1
    },
    json: true
  }
  return function (callback) {
    request(options, function (error, response, body) {
      if (error) return callback(error)
      return callback(null, Object.assign(body, { url: url }))
    })
  }
}

module.exports = {
  getBlockCount
}
