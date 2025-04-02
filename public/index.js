Chart.defaults.backgroundColor = "#9BD0F5"
Chart.defaults.borderColor = "oklch(0.446 0.043 257.281)"
Chart.defaults.color = "#fff"

const socket = io()
const canvas = document.getElementById("stockGraph")
const graphTitle = document.getElementById("name")
let graphData = [
  {
    id: 1,
    name: "SampleComany",
    price: 12.34,
    timeStamp: new Date(),
    prevClose: 9876,
  },
  {
    id: 1,
    name: "SampleComany",
    price: 9.34,
    timeStamp: new Date(),
    prevClose: 9876,
  },
  {
    id: 1,
    name: "SampleComany",
    price: 11.34,
    timeStamp: new Date(),
    prevClose: 9876,
  },
]

let currentChart

socket.on("rtStockData", (data) => {
  graphData = data

  if (currentChart) {
    currentChart.destroy()
    currentChart = undefined
  }
  drawGraph(graphData)
})

let chartCount = 0

function drawGraph(dataInput) {
  // X-axis is the timestamp
  // Y-axis is the price
  Chart.instances = undefined

  graphTitle.innerText = dataInput[0].name
  dataInput =
    window.innerWidth < 600 && dataInput.length > 5
      ? dataInput.slice(dataInput.length - 5, dataInput.length)
      : dataInput

  currentChart = new Chart(canvas, {
    type: "line",

    data: {
      labels: dataInput.map((item) => {
        return new Date(item.timeStamp).toLocaleTimeString()
      }),
      datasets: [
        {
          fill: {
            target: "origin",

            above: "oklch(0.87 0.3034 136 / 35.55%)",
          },
          label: "Stock Price ($)",
          backgroundColor: "#fff",
          pointRadius: 5,
          pointHoverRadius: 8,
          data: dataInput.map((item) => {
            return item.price
            // For showing scale
            // return Math.random() * 4000
          }),
          borderWidth: 1,
        },
      ],
    },
    options: {
      animation: false,
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  })
}
// Initial draw if there's no data available
drawGraph(
  graphData
    ? graphData
    : [{ id: 1, name: "Co", price: 12.34, timeStamp: new Date() }]
)
