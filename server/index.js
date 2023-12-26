const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const muscleRouter = require('./routes/muscles')
const exercisesRouter = require('./routes/exercises')
const productsRouter = require('./routes/products')
const port = 3000

dotenv.config()
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('db connected'))
  .catch((error) => console.log(error))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

app.use('/api/muscles', muscleRouter)
app.use('/api/exercises', exercisesRouter)
app.use('/api/products', productsRouter)

app.listen(process.env.PORT || port, () =>
  console.log(`EliteFitness app listening on port ${port}!`)
)
