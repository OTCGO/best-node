const _ = require('lodash')
const config = require('config')
const async = require('async')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { getBlockCount } = require('./utils/block')

app.use(bodyParser.json())

app.get('/mainnet/node', async (req, res) => {
  const list = config.get('rpc.mainnet.endpoints')

  let arr = []

  async.each(list, (item, callback) => {
    arr.push(getBlockCount(`${item.domain}:${item.port}`))
    callback()
  })

  async.parallelLimit(arr, 10, (err, result) => {
    console.log('result', result)
    if (err) res.status(500).send(err)
    if (result) {
      let maxNode = _.maxBy(result, function (item) {
        return item.result
      })
      res.send(maxNode)
    }
  })
})

app.listen(5000, '0.0.0.0', () => {
  console.log('app start')
})
// root /
app.get('/', function (req, res) {
  return res.send({'started': new Date()})
})
