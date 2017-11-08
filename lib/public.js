const axios = require('axios')

const Public = {}

// GET REQUEST FOR TESTING CONNECTIVITY RETURNS {}
Public.testConnectivity = function() {
  let url = this.v1URL + 'ping'
  return axios.get(url)
}

// GET REQUEST FOR CURRENT SERVER TIME
Public.getServerTime = function() {
  let url = this.v1URL + 'time'
  return axios.get(url)
}

// GET REQUEST FOR ORDERBOOK Options = {} 
// symbol	STRING  *
// limit	INT	Default 100; max 100.
Public.getOrderBook = function(options) {
  let url = this.v1URL + 'depth' + this.formatQuery(options)
  return axios.get(url)
}

// GET REQUEST FOR AGGREGATE TRADE Options = {} 
// symbol	STRING	*
// fromId	LONG	ID to get aggregate trades from INCLUSIVE.
// startTime	LONG	Timestamp in ms to get aggregate trades from INCLUSIVE.
// endTime	LONG	Timestamp in ms to get aggregate trades until INCLUSIVE.
// limit	INT	Default 500; max 500.
Public.getAggregateTrades = function(options) {
  let url = this.v1URL + 'aggTrades' + this.formatQuery(options)
  return axios.get(url)
}

// GET REQUEST FOR KLINES/CANDLES Options = {}
// symbol	STRING	*
// interval	ENUM	*
// limit	INT	Default 500; max 500.
// startTime	LONG	
// endTime	LONG		
Public.getCandles = function(options) {
  let url = this.v1URL + 'klines' + this.formatQuery(options)
  return axios.get(url)
}

// GET REQUEST FOR 24 HOUR TICKER PRICE CHANGES FOR A PAIR
// Symbol	STRING	*
Public.get24hrTicker = function(options) {
  let url = this.v1URL + 'ticker/24hr' + this.formatQuery(options)
  return axios.get(url)
}

// GET REQUEST FOR ALL PAIRS PRICE TICKER
Public.getTicker = function() {
  let url = this.v1URL + 'ticker/allPrices'
  return axios.get(url)
}

// GET REQUEST FOR ALL PAIRS BID/ASK TICKER
Public.getAllBookTicker = function() {
  let url = this.v1URL + 'ticker/allBookTickers'
  return axios.get(url)
}

module.exports = Public