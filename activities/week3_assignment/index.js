// Load in our Express framework
const express = require(`express`)

// Create a new Express instance called "app"
const app = express()

app.use(express.json()); // For parsing JSON in cURL requests

// Body parser for form submissions
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())

// File uploads
const fileUpload = require('express-fileupload')
app.use(fileUpload())

// Twig stuff
app.set('views', __dirname + '/templates')
app.set('view engine', 'twig')

// Load Sequelize connection
const { sequelize } = require('./models')
const { Galaxy } = require('./models')

// Load in our RESTful routers
const routers = require('./routers/index.js')

app.use(express.static(__dirname + '/public'))

// Homepage welcome middleware
app.get('/', async (req, res) => {
    res
        .status(200)
        .render('home/home', {
            name: "John",
        })
})

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet)
app.use(`/stars`, routers.star)
app.use(`/galaxies`, routers.galaxy)

app.listen(3000)
