const express = require('express')
const router = new express.Router()
const imageCtrl = require('../controllers/image')
const { uploadImage } = require('../middlewares')

router.get('/', imageCtrl.index)
router.get('/new', imageCtrl.form)
router.get('/:id', imageCtrl.show)
router.get('/:id/edit', imageCtrl.form)
router.post('/', imageCtrl.create, uploadImage)
router.post('/:id', imageCtrl.update, uploadImage)
router.delete('/:id', imageCtrl.remove)
router.get('/:id/delete', imageCtrl.remove)

module.exports = router
