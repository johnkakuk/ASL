const { Galaxy, Planet, Star } = require('../models')

// Show all resources
const index = async (req, res) => {
    try {
        const contentType = req.get(`Content-Type`) || ''
        const stars = await Star.findAll()

        if (stars.length === 0) return res.status(404).json({ error: 'No stars found' })

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(200).json(stars)
        }

        res
            .status(200)
            .render('stars/index.twig', { stars })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Show resource
const show = async (req, res) => {
    try {
        const contentType = req.get(`Content-Type`) || ''
        const star = await Star.findByPk(req.params.id)

        if (!star) return res.status(404).json({ error: 'Star not found' })
        const galaxy = await Galaxy.findByPk(star.GalaxyId)
        const planets = await Planet.findAll({ where: { StarId: star.id } })

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(200).json(star)
        }

        res
            .status(200)
            .render('stars/show.twig', { star, galaxy, planets })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new resource
const create = async (req, res) => {
    try {
        const payload = { ...req.body }
        if (req.uploadedImagePath) payload.starImageURL = req.uploadedImagePath

        const contentType = req.get(`Content-Type`) || ''
        const star = await Star.create(payload)

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(201).json(star)
        }

        res.redirect(302, `/stars/${star.id}`)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update an existing resource
const update = async (req, res) => {
    try {
        const payload = { ...req.body }
        if (req.uploadedImagePath) payload.starImageURL = req.uploadedImagePath

        const contentType = req.get(`Content-Type`) || ''
        const star = await Star.findByPk(req.params.id)

        if (!star) return res.status(404).json({ error: 'Star not found' })

        await star.update(payload, { where: { id: req.params.id } })

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(201).json(star)
        }
        
        res.redirect(302, `/stars/${req.params.id}`)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Remove a single resource
const remove = async (req, res) => {
    try {
        const contentType = req.get(`Content-Type`) || ''
        const star = await Star.findByPk(req.params.id)

        if (!star) return res.status(404).json({ error: 'Star not found' })

        await star.destroy()

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(201).json('Star deleted successfully')
        }

        res.redirect(302, '/stars')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const form = async (req, res) => {
    try {
        const galaxies = await Galaxy.findAll()

        if ('undefined' !== typeof req.params.id) {
            const star = await Star.findByPk(req.params.id)
            res
                .status(200)
                .render('stars/edit.twig', { star, galaxies })
        } else {
            res
                .status(200)
                .render('stars/create.twig', { galaxies })
        }
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
    
}

// Export all controller actions
module.exports = { index, show, create, update, remove, form }
