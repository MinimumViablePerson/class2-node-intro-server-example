import express from 'express'
import cors from 'cors'

let basket = [
  {
    id: 3,
    title: 'Socks',
    quantity: 3,
    price: 3.99
  },
  {
    id: 5,
    title: 'Hat',
    quantity: 3,
    price: 5.99
  },
  {
    id: 10,
    title: 'Earmuffs',
    quantity: 2,
    price: 13.99
  },
  {
    id: 12,
    title: 'Potato',
    quantity: 15,
    price: 0.59
  },
  {
    id: 16,
    title: 'Banana',
    quantity: 10,
    price: 1.99
  }
]

const app = express()
app.use(cors())
app.use(express.json())
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
  let itemsToSend = basket

  if (req.query.quantity) {
    itemsToSend = itemsToSend.filter(
      item => item.quantity === Number(req.query.quantity)
    )
  }

  if (req.query.title) {
    itemsToSend = itemsToSend.filter(
      // @ts-ignore
      item => item.title.toLowerCase().includes(req.query.title.toLowerCase())
    )
  }

  res.send(itemsToSend)
})

app.post('/basket', (req, res) => {
  let errors: string[] = []

  if (typeof req.body.title !== 'string') {
    errors.push('Title not provided or not a string.')
  }

  if (typeof req.body.quantity !== 'number') {
    errors.push('Quantity not provided or not a number.')
  }

  if (typeof req.body.price !== 'number') {
    errors.push('Price not provided or not a number.')
  }

  // if there are no errors, create the item
  if (errors.length === 0) {
    const newItem = {
      id: basket[basket.length - 1].id + 1,
      title: req.body.title,
      quantity: req.body.quantity,
      price: req.body.price
    }
    basket.push(newItem)
    res.send(newItem)
  } else {
    // if there are any errors...
    res.status(400).send({ errors: errors })
  }
})

app.get('/queryStuff', (req, res) => {
  console.log(req.query)
  res.send({ message: 'Hello lovely!' })
})

app.get('/basket/:id', (req, res) => {
  const id = Number(req.params.id)
  const match = basket.find(item => item.id === id)

  if (match) {
    res.send(match)
  } else {
    res.status(404).send({ error: 'Item not found.' })
  }
})

app.get('/randomBasketItem', (req, res) => {
  const randomIndex = Math.floor(Math.random() * basket.length)
  const randomItem = basket[randomIndex]
  res.send(randomItem)
})

app.listen(port, function () {
  console.log(`App is running yay! http://localhost:${port}`)
})
