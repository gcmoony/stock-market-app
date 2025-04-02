import express from "express"
import { createServer } from "node:http"
import { Server } from "socket.io"
import getDowStock from "./getStockData.js"

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile("index.html")
})

// Build stock data
let stockData = []
let nodeID = 0
const stockInterval = setInterval(async () => {
  stockData.push(await getDowStock(nodeID))
  nodeID += 1
  // Display 5 most recent items
  if (stockData.length > 30) {
    stockData.shift()
  }

  // Send current stock data to clients
  io.emit("rtStockData", stockData)
}, 5000)

server.listen(3000, () => {
  console.log("Listening on port 3000")
})
