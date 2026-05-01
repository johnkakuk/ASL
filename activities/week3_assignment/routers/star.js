// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`)
const { uploadImage } = require('../middlewares')

// Create a new Router instance and call it "router"
const router = new express.Router()

// RESTful resource mappings
router.get(`/`, starCtlr.index)
router.post(`/`, uploadImage, starCtlr.create)
router.get(`/:id(\\d+)`, starCtlr.show) 
router.put(`/:id(\\d+)`, starCtlr.update) 
router.delete(`/:id(\\d+)`, starCtlr.remove) 

// HTML5 specific routes
router.get('/new', starCtlr.form)
router.get('/:id(\\d+)/edit', starCtlr.form)
router.get('/:id(\\d+)/delete', starCtlr.remove)
router.post('/:id(\\d+)', uploadImage, starCtlr.update)

// export "router"
module.exports = router
