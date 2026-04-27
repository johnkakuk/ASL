// Load in our Express framework
const express = require(`express`)

// Create a new Express instance called "app"
const app = express()

app.use(express.json()); // For parsing JSON in cURL requests

// Load Sequelize connection
const { sequelize } = require('./models')

// Load in our RESTful routers
const routers = require('./routers/index.js')

// Home page welcome middleware
app.get('/', (req, res) => {
    res
        .status(200)
        .send('Welcome to Star Tracker Library')
})

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet)
app.use(`/stars`, routers.star)
app.use(`/galaxies`, routers.galaxy)

app.listen(3000)
