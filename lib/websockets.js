const WebSocket = require('ws')
const axios = require('axios')
const Sockets = {}

const baseWSS = "wss://stream.binance.com:9443/ws"

let initSocket = function(path, eventHandler) {
  const ws = new WebSocket(baseWSS + path)
  ws.on('message', eventHandler)
}

// Get depth stream for pair
Sockets.getDepthStream = function(symbol, eventHandler) {
  initSocket(`/${symbol.toLowerCase()}@depth`, eventHandler)
}

// Get Kline data for a pair
Sockets.getKlineStream = function(symbol, interval, eventHandler) {
  initSocket(`/${symbol.toLowerCase()}@kline_${interval}`, eventHandler)
}

// Get Aggregate Trade info
Sockets.getAggTradeStream = function(symbol, eventHandler) {
  initSocket(`/${symbol.toLowerCase()}@aggTrade`, eventHandler)
}

// [NEEDS FURTHER WORK]
// Get user data stream info 
// Sockets.getUserDataStream = function(listenKey, eventHandler) {
//   initSocket(`/${listenKey}`, eventHandler)
// }

// Get listenKey for maintaining a stream and accessing account info through web sockets
Sockets.startDataStream = function() {
  let url = this.v1URL + '/userDataStream'
  return axios.post(url, null, this.headers)
}

// Ping to keep data stream alive
Sockets.keepDataStream = function(listenKey) {
  let url = this.v1URL + '/userDataStream'
  return axios({
      method: 'put',
      url: url,
      data: this.formatQuery(listenKey).slice(1),
      headers: this.headers.headers
  })
}

// Close the data stream
Sockets.closeDataStream = function(listenKey) {
  let url = this.v1URL + '/userDataStream'
  return axios({
      method: 'delete',
      url: url,
      data: this.formatQuery(listenKey).slice(1),
      headers: this.headers
  })
}

module.exports = Sockets