const chai = require('chai')
const should = chai.should()
const Binance = require('./../binance')

config = {
  apiKey: '7e3a9d9c48ac9090d22322e4da49b97f223804f3492dee9df792503410f52a3f',
  secretKey: '69028abaee41a3e9e8ab86416cff89f32a387ee8ec5e8ca7a9a1452a3e1a0619'  
}

api = Object.create(Binance)
api.init(config)

describe('api.formatQuery()', function() { 
  it ('should stringify objects URLs to appropriate querystrings for Binance endpoints', function() {
    let formatQuery = api.formatQuery({
      symbol: 'BTBBNB',
      interval: '1m',
      limit: 250
    })
    formatQuery.should.eql('?symbol=BTBBNB&interval=1m&limit=250')
  })
})

describe('api.sign()', function() {
  it('should prepare signed string to append to URL for SIGNED endpoints', function() {
    let signedStr = api.sign('symbol=BTBBNB&interval=1m&limit=250')
    signedStr.should.eql('&signature=270e6b22f06c5182bcb8be5e07c5c8f87a89ef08b596eb1f3b9048a461ee3e4a')
  })
})