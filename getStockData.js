const uri = "https://query1.finance.yahoo.com/v8/finance/chart/%5EDJI"
class StockEntry {
  constructor(id, name, currentPrice, prevClose) {
    this.id = id
    this.name = name
    this.price = currentPrice
    this.timeStamp = new Date()
    this.prevClose = prevClose
    this.next = undefined
  }

  setNext(aStockNode) {
    this.next = aStockNode
  }

  getNext() {
    return this.next
  }

  getName() {
    return this.name
  }

  getPrice() {
    return this.price
  }

  getTimestamp() {
    return this.timeStamp
  }

  print() {
    console.log(
      `${this.getName()} was $${this.getPrice()} at ${this.getTimestamp()}`
    )
  }
}
// Creates a new StockEntry object and returns it
const getDowStock = async (nodeID) => {
  const res = await fetch(uri)
  const data = await res.json()
  const name = data.chart.result[0].meta.shortName
  const price = data.chart.result[0].meta.regularMarketPrice
  const prevClose = data.chart.result[0].meta.previousClose
  const newNode = new StockEntry(nodeID, name, price, prevClose)

  return newNode
}

export default getDowStock
