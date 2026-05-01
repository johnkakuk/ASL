const { Galaxy, Planet, Star } = require('../models')

// Show all resources
const index = async (req, res) => {
    try {
        const contentType = req.get(`Content-Type`) || ''
        const planets = await Planet.findAll()

        if (planets.length === 0) return res.status(404).json({ error: 'No planets found' })

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(200).json(planets)
        }

        res
            .status(200)
            .render('planets/index.twig', { planets })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Show resource
const show = async (req, res) => {
    try {
        const contentType = req.get(`Content-Type`) || ''
        const planet = await Planet.findByPk(req.params.id)

        if (!planet) return res.status(404).json({ error: 'Planet not found' })

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(200).json(planet)
        }

        res
            .status(200)
            .render('planets/show.twig', { planet })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new resource
const create = async (req, res) => {
    try {
        const payload = { ...req.body }
        delete payload.GalaxyId
        if (req.uploadedImagePath) payload.planetImageURL = req.uploadedImagePath

        const contentType = req.get(`Content-Type`) || ''
        const planet = await Planet.create(payload)

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(201).json(planet)
        }

        res.redirect(302, `/planets/${planet.id}`)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update an existing resource
const update = async (req, res) => {
    try {
        const payload = { ...req.body }
        delete payload.GalaxyId
        if (req.uploadedImagePath) payload.planetImageURL = req.uploadedImagePath

        const contentType = req.get(`Content-Type`) || ''
        const planet = await Planet.findByPk(req.params.id)

        if (!planet) return res.status(404).json({ error: 'Planet not found' })

        await planet.update(payload, { where: { id: req.params.id } })

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(201).json(planet)
        }
        
        res.redirect(302, `/planets/${req.params.id}`)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Remove a single resource
const remove = async (req, res) => {
    try {
        const contentType = req.get(`Content-Type`) || ''
        const planet = await Planet.findByPk(req.params.id)

        if (!planet) return res.status(404).json({ error: 'Planet not found' })

        await planet.destroy()

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(201).json('Planet deleted successfully')
        }

        res.redirect(302, '/planets')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const form = async (req, res) => {
    try {
        const galaxies = await Galaxy.findAll()
        const stars = await Star.findAll()

        if ('undefined' !== typeof req.params.id) {
            const planet = await Planet.findByPk(req.params.id)
            const selectedStar = stars.find((star) => Number(star.id) === Number(planet.StarId))
            const selectedGalaxyId = selectedStar ? selectedStar.GalaxyId : undefined
            res
                .status(200)
                .render('planets/edit.twig', { planet, stars, galaxies, selectedGalaxyId })
        } else {
            res
                .status(200)
                .render('planets/create.twig', { stars, galaxies })
        }
    } catch(error) {
        res.status(500).json({ error: error.message })
    }    
}

// Export all controller actions
module.exports = { index, show, create, update, remove, form }
