const axios = require('axios')

const fetchData = (start, end, cb) => {
  console.log("start: ", start)
  console.log("end: ", end)
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then((results) => {
      cb(results)
    })
}

module.exports = {
  fetchData
}