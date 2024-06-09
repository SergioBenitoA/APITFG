// ------------------------------
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

// ------------------------------

const app = express()
const UserRoutes = require('./routes/user.cjs')

// ------------------------------

const PORT = process.env.PORT ?? 3000

// ------------------------------


//Middleware
app.use(express.static('html'))
app.use(express.json())
app.use(cors()) // Esto es para que no haya ningún problema con el cors

app.use('/user', UserRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something is broke.')
})

app.disable('x-powered-by')
app.get('/favicon.ico', (req, res) => res.status(204))

//Routes
app.get('/', (req, res) => {
    try {
        res.status(200).sendFile('./html/index.html')
    } catch (error) {
        res.status(404).send(error)
    }
    
})

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
})