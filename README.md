# binance-node-api

This is an open source project created to utilize the Binance API to support automated, algorithmic trading. The project was made and tested for Node 8.0+. It takes advantage of Axios for Promise based HTTP requests and Chai for automated tests. 

There are no guarentees towards the stability or effectiveness of this project. Comments, 
contributions and stars are, however, all welcome.

## Installation

`npm install binance-node-api`

## Getting Started

To begin using the API wrapper, require it, create a config object that contains your API key and Secret key provided by Binance, create a new object, delegating the behaviour from Binance. Then run the custom init() function with your config object as a parameter. Example code is as follows:

```javascript 
const Binance = require('binance-node-api')

config = {
  apiKey: 'xXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxXXX',
  secretKey: 'xxxxxxxxXXXXXXXXXXXXXxxXXXXXXXXXXXXXxxxXXX'
}

api = Object.create(Binance)
api.init(config)
```

## Using the API Wrapper

Once the API wrapper object is created, you can call any of the associated functions. They will return a Promise which can be utlized with .then/.catch or async/await. Note that the Promise based approach will return directly whereas the async/await approach requires calling the function; although it can be used as an Immediately-Invoked Function Expression (IIFE).

Simple example:

```javascript
// Promise based approach for getting account information (private & signed)
api.getAccountInfo({timestamp: Date.now()}).then((r) => {
  console.log(r.data)
})
.catch((e) => {
  console.log(e))
})

// Async/Await get account info example (private & signed)
async function getAccountInfo() {
  try {
    let accountInfo = await api.getAccountInfo({timestamp: Date.now()})
    console.log(accountInfo.data)
  } catch(err) {
    console.log(err)
  } 
}
```

This approach allows for more complex multi-call asynchronous functionality, especially useful for automated trading.

More examples can be found in the example.js file.

## Public Endpoints (REST)

Public endpoints to not require an API Key and Secret Key.

`api.testConnectivity()`   
`api.getServerTime()`   
`api.getOrderBook(options)`   
```javascript 
options = {
  symbol: 'string',   MANDATORY
  limit: integer      Default: 100; max 100
} 
```   
`api.getAggregateTrades(options)`   
```javascript
options = {
  symbol: 'string',   MANDATORY
  fromId: integer,
  startTime: integer, UNIX dateTime
  endTime: integer,   UNIX dateTime
  limit: integer      Default: 500; max 500
}
```   
`api.getCandles(options)`   
```javascript 
options = {
  symbol: 'string',   MANDATORY
  interval: ENUM,     MANDATORY
  limit: integer,     Default: 500; max 500
  startTime: integer, UNIX dateTime
  endTime: integer    UNIX dateTime
}
```   
`api.get24hrTicker(options)`   
```javascript
options = {
  symbol: 'string'    MANDATORY
}
```   
`api.getTicker()`   
`api.getAllBookTicker`   

## Account Endpoints (REST)

All account endpoints require a Binance provided API key and Secret key for signing requests. All crytographic signing is handled automatically by the api wrapper.

`api.placeOrder(options)`   
```javascript
options = {
  symbol: 'string',         MANDATORY
  side: ENUM,               MANDATORY 
  type: ENUM,               MANDATORY
  timeInForce: ENUM,        MANDATORY
  quantity: 'stringFloat',  MANDATORY
  price: 'stringFloat',     MANDATORY
  newClientOrderId: 'string',
  stopPrice: 'stringFloat',
  icebergQty: 'stringFloat',
  recvWindow: integer
  timestamp: integer        MANDATORY UNIX dateTime
}
```   
`api.testNewOrder(options)`
```javascript
options = {
  symbol: 'string',         MANDATORY
  side: ENUM,               MANDATORY 
  type: ENUM,               MANDATORY
  timeInForce: ENUM,        MANDATORY
  quantity: 'stringFloat',  MANDATORY
  price: 'stringFloat',     MANDATORY
  newClientOrderId: 'string',
  stopPrice: 'stringFloat',
  icebergQty: 'stringFloat',
  recvWindow: integer,
  timestamp: integer        MANDATORY UNIX dateTime
}
```  

`api.queryOrder(options)`
```javascript 
options = {
  symbol: 'string',     MANDATORY
  orderId: integer,
  origClientOrderId: 'string',
  recvWindow: integer,
  timestamp: integer    MANDATORY UNIX dateTime
}
```

`api.cancelOrder(options)`
```javascript
options = {
  symbol: 'string',     MANDATORY
  orderId: integer,
  origClientOrderId: 'string',
  newClientOrderId: 'string',
  recvWindow: integer,
  timestamp: integer    MANDATORY UNIX dateTime
}
```   

`api.getOpenOrders(options)`
```javascript
options = {
  symbol: 'string',     MANDATORY
  recvWindow: integer,
  timestamp: integer    MANDATORY UNIX dateTime
}
```   

`api.getAllOrder(options)`
```javascript
options = {
  symbol: 'string',     MANDATORY
  orderId: integer,
  limit: integer,       Default: 500; max 500
  recvWindow: integer,
  timestamp: integer    MANDATORY UNIX dateTime
}
```   
`api.getAccountInfo(options)`
```javascript
options = {
  recvWindow: integer,
  timestamp: integer    MANDATORY UNIX dateTime
}
```   

`api.getAccountTradeList(options)`
```javascript
options = {
  symbol: 'string',     MANDATORY
  limit: integer,       Default: 500; max 500
  fromId: integer,
  recvWindow: integer,
  timestamp: integer    MANDATORY UNIX dateTime
}
```   

`api.makeWithdrawl(options)`
```javascript
options = {
  asset: 'string',
  address: 'string',
  amount: 'stringFloat',
  name: 'string'
  recvWindow: integer,
  timestamp: integer   MANDATORY UNIX dateTime
}
```   

`api.getDepositHistory(options)`
```javascript
options = {
  asset: 'string',
  status: integer,     (0:pending, 1:sucess)
  startTime: integer,  MANDATORY UNIX dateTime
  endTime: integer,    MANDATORY UNIX dateTime
  recvWindow: integer,
  timestamp: integer   MANDATORY UNIX dateTime
}
```   

`api.getWithdrawlHistory(options)`
```javascript
options = {
  asset: 'string',
  status: integer,  
  startTime: integer,  MANDATORY UNIX dateTime
  endTime: integer,    MANDATORY UNIX dateTime
  recvWindow: integer,
  timestamp: integer   MANDATORY UNIX dateTime
}
```  

## Websockets

Basic websocket functionality is included. The second input parameter is a function that
takes the socket response as a parameter. This provides flexible functionality. Simple
examples that simply log the messages are:

```javascript   
api.getDepthStream('ETHUSDT', (msg) => {
  let data = JSON.parse(msg)
  console.log(data)    
})

api.getKlineStream('ETHUSDT', '1m', (msg) => {
  let data = JSON.parse(msg)
  console.log(data)
})

api.getAggTradeStream('ETHUSDT', (msg) => {
  let data = JSON.parse(msg)
  console.log(data)
})
```  

## License

This project is open source and uses the ISC license. Feel free to utilize in whatever way you see fit.