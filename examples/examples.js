// Get and log server time example with Promise
api.getServerTime().then((r) => { 
  console.log(r.data)
  }).catch(e => console.log(e))

// Async/Away example to get and log server time
async function getServerTime() {
  try { let time = await api.getServerTime()
    console.log(time.data) } catch(err) {
    console.log(err)
  }
}

// Get account information example (private & signed)
api.getAccountInfo({timestamp: Date.now()}).then((r) => {
  console.log(r.data)
  }).catch(e => console.log(e))

// Async/Await get account info example (private & signed)
async function getAccountInfo() {
  try { let accountInfo = await api.getAccountInfo({timestamp: Date.now()})
    console.log(accountInfo.data) } catch (err) {
    console.log(err)
  }
}

// Get and log orderbook data for a symbol
api.getOrderBook({symbol: 'EOSETH'}).then((r) => {
  console.log(r.data)
  }).catch(e => console.log(e))

// Async/Await example for get and log of orderbook data for a symbol
async function getOrderBook() {
  try { let orderBook = await api.getOrderBook({symbol: 'LTCBTC'})
    console.log(orderBook.data) } catch (err) {
    console.log(err)
  }
}

// multi call example using Promise.all() storing ticker, candle and candle open data
var ticker, candles, open

function getTickerAndKlines() {
  Promise.all([
    api.getTicker(), 
    api.getCandles({symbol: 'LTCBTC', interval: '1m'})
  ])
  .then((resp) => {
    ticker = resp[0].data
    candles = resp[1].data
    open = candles.map(i => Number(i[2]))
  })
  .catch((err) => console.log(err))
}

// async await example storing ticker, candle and candle open data
var ticker, candles, open

async function getTickerAndKlines() {
  try {
    let [tickerResp, candlesResp] = await Promise.all([ 
      api.getTicker(), 
      api.getCandles({symbol: 'LTCBTC', interval: '1m', limit: 100}) 
    ])
    ticker = tickerResp.data
    candles = candlesResp.data
    open = candles.map(i => Number(i[2]))
  } catch (err) {
    console.log(err)
  }
}

// Promise based test new order
api.testNewOrder({
  symbol: 'EOSETH',
  side: 'BUY',
  type: 'LIMIT',
  timeInForce: 'GTC',
  quantity: '3',
  price: '0.003477',
  timestamp: Date.now()
}).then(r => console.log(r.data)).catch(e => console.log(e))

// Promise based place new order
api.placeOrder({
  symbol: 'EOSETH',
  side: 'BUY',
  type: 'LIMIT',
  timeInForce: 'GTC',
  quantity: '3',
  price: '0.003455',
  timestamp: Date.now()
}).then(r => console.log(r.data)).catch(e => console.log(e))

// Promise based see open orders
api.getOpenOrders({symbol: 'BNBETH', timestamp: Date.now()}).then((r) => {
  console.log(r.data)
}).catch(e => console.log(e))
