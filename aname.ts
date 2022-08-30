import express from 'express'
import cors from 'cors'

const basket = [
  {
    id: 1,
    title: 'Socks',
    quantity: 3,
    price: 3.99
  },
  {
    id: 2,
    title: 'Hat',
    quantity: 3,
    price: 5.99
  },
  {
    id: 3,
    title: 'Earmuffs',
    quantity: 2,
    price: 13.99
  }
]

const app = express()
app.use(cors())
const port = 5001

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to my app!</h1>
    <p>We have the following resources:</p>
    <ul>
      <li><a href="/basket">Basket</a></li>
    </ul>
  `)
})

app.get('/basket', (req, res) => {
  res.send(basket)
})

app.listen(port, function () {
  console.log(`App is running yay! http://localhost:${port}`)
})
