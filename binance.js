const qs = require('querystring')
const crypto = require('crypto')

const Binance = {
  init: function(config) {  
    this.v1URL = 'https://www.binance.com/api/v1/'
    this.v3URL = 'https://www.binance.com/api/v3/'
    this.secretKey = config.secretKey
    this.headers = {
      headers: {
        'X-MBX-APIKEY': config.apiKey,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const Public = require('./lib/public')
    const Account = require('./lib/account')
    const Sockets = require('./lib/websockets')
    Object.assign(this, Public, Account, Sockets)
  },
  sign: function(queryString) {
    return '&signature=' + crypto.createHmac('sha256', this.secretKey)
      .update(queryString)
      .digest('hex')
  },
  formatQuery: function(queryString) {
    return '?' + qs.stringify(queryString)
  }
}

module.exports = Binance
