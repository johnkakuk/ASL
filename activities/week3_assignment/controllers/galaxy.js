const { Galaxy, Star } = require('../models')

// Show all resources
const index = async (req, res) => {
    try {
        const contentType = req.get(`Content-Type`) || ''
        const galaxies = await Galaxy.findAll()

        if (galaxies.length === 0) return res.status(404).json({ error: 'No galaxies found' })

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(200).json(galaxies)
        }

        res
            .status(200)
            .render('galaxies/index.twig', { galaxies })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Show resource
const show = async (req, res) => {
    try {
        const contentType = req.get(`Content-Type`) || ''
        const galaxy = await Galaxy.findByPk(req.params.id)
        const stars = await Star.findAll({ where: { GalaxyId: req.params.id } })

        if (!galaxy) return res.status(404).json({ error: 'Galaxy not found' })

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(200).json(galaxy)
        }

        res
            .status(200)
            .render('galaxies/show.twig', { galaxy, stars })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new resource
const create = async (req, res) => {
    try {
        const payload = { ...req.body }
        if (req.uploadedImagePath) payload.galaxyImageURL = req.uploadedImagePath

        const contentType = req.get(`Content-Type`) || ''
        const galaxy = await Galaxy.create(payload)

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(201).json(galaxy)
        }

        res.redirect(302, `/galaxies/${galaxy.id}`)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update an existing resource
const update = async (req, res) => {
    try {
        const payload = { ...req.body }
        if (req.uploadedImagePath) payload.galaxyImageURL = req.uploadedImagePath

        const contentType = req.get(`Content-Type`) || ''
        const galaxy = await Galaxy.findByPk(req.params.id)

        if (!galaxy) return res.status(404).json({ error: 'Galaxy not found' })

        await galaxy.update(payload, { where: { id: req.params.id } })

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(201).json(galaxy)
        }

        res.redirect(302, `/galaxies/${req.params.id}`)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Remove a single resource
const remove = async (req, res) => {
    try {
        const contentType = req.get(`Content-Type`) || ''
        const galaxy = await Galaxy.findByPk(req.params.id)

        if (!galaxy) return res.status(404).json({ error: 'Galaxy not found' })

        await galaxy.destroy()

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(201).json('Galaxy deleted successfully')
        }
        
        res.redirect(302, '/galaxies') // 302 for development, switch to 301 for production
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const form = async (req, res) => {
    if ('undefined' !== typeof req.params.id) {
        const galaxy = await Galaxy.findByPk(req.params.id)
        res
        .status(200)
        .render('galaxies/edit.twig', { galaxy })
    } else {
        res
        .status(200)
        .render('galaxies/create.twig')
    }
}

// Export all controller actions
module.exports = { index, show, create, update, remove, form }
