const { Image } = require('../models')

const create = async (req, res, next) => {
    const image = await Image.create(req.body)
    req.imageId = image.imageId // Set pretext ID for middleware
    next() // Invoke middleware
    res.redirect('/images/' + image.id)
}

const update = async (req, res, next) => {
    const image = await Image.update(req.body, {
        where: { id: req.params.id }
    })
    req.imageId = req.params.id // Set pretext ID for middleware
    next() // Invoke middleware
    res.redirect('images/' + req.params.id)
}