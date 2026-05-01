// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`)
const { uploadImage } = require('../middlewares')

// Create a new Router instance and call it "router"
const router = new express.Router()

// RESTful resource mappings
router.get(`/`, planetCtlr.index)
router.post(`/`, uploadImage, planetCtlr.create)
router.get(`/:id(\\d+)`, planetCtlr.show) 
router.put(`/:id(\\d+)`, planetCtlr.update) 
router.delete(`/:id(\\d+)`, planetCtlr.remove) 

// HTML5 specific routes
router.get('/new', planetCtlr.form)
router.get('/:id(\\d+)/edit', planetCtlr.form)
router.get('/:id(\\d+)/delete', planetCtlr.remove)
router.post('/:id(\\d+)', uploadImage, planetCtlr.update)

// export "router"
module.exports = router
