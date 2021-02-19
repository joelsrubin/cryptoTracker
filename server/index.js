const express = require('express')
const app = express()
const PORT = 3000
const { fetchData } = require('./controllers')

app.use(express.static('dist'))


app.get('/api/:id/:id2', (req, res) => {
  const { id, id2 } = req.params
  fetchData(id, id2, (data) => {
    res.send(data.data)
  })
})



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})