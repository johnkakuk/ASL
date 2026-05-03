const { Galaxy, Planet, Star } = require('../models')

// AI Generated: normalize incoming multi-select values from the form.
const normalizeStarIds = (value) => {
    if (!value) return []

    // Cast input to array
    const asArray = Array.isArray(value) ? value : [value]

    // Cast values to integers and get usable values
    const normalized = asArray
        .map((id) => Number(id))
        .filter((id) => Number.isInteger(id) && id > 0)

    return [...new Set(normalized)]
}

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

        let parentStars = await planet.getStars()

        // Fallback if join-table rows are missing but StarId still exists.
        if (parentStars.length === 0 && planet.StarId) {
            const directParentStar = await Star.findByPk(planet.StarId)
            if (directParentStar) parentStars = [directParentStar]
        }

        const parentGalaxyIds = [...new Set(parentStars.map((star) => star.GalaxyId).filter(Boolean))]
        const parentGalaxies = await Galaxy.findAll({ where: { id: parentGalaxyIds } })

        // Handler for non-browser requests
        if (contentType.indexOf('application/json') >= 0) {
            return res.status(200).json(planet)
        }

        res
            .status(200)
            .render('planets/show.twig', { planet, parentStars, parentGalaxies })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new resource
const create = async (req, res) => {
    try {
        // AI Generated: parse multi-select stars and sync to join table.
        const selectedStarIds = normalizeStarIds(req.body.StarIds)
        const payload = { ...req.body }

        // Clear non-needed values
        delete payload.GalaxyId 
        delete payload.StarIds
        
        payload.StarId = selectedStarIds.length > 0 ? selectedStarIds[0] : null
        if (req.uploadedImagePath) payload.planetImageURL = req.uploadedImagePath

        const contentType = req.get(`Content-Type`) || ''
        const planet = await Planet.create(payload)
        await planet.setStars(selectedStarIds)

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
        // AI Generated: parse multi-select stars and sync to join table.
        const selectedStarIds = normalizeStarIds(req.body.StarIds)
        const payload = { ...req.body }
        delete payload.GalaxyId
        delete payload.StarIds
        payload.StarId = selectedStarIds.length > 0 ? selectedStarIds[0] : null
        if (req.uploadedImagePath) payload.planetImageURL = req.uploadedImagePath

        const contentType = req.get(`Content-Type`) || ''
        const planet = await Planet.findByPk(req.params.id)

        if (!planet) return res.status(404).json({ error: 'Planet not found' })

        await planet.update(payload, { where: { id: req.params.id } })
        await planet.setStars(selectedStarIds)

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
            // AI Generated: preselect all currently linked stars in edit form.
            const parentStars = await planet.getStars()
            const selectedStarIds = parentStars.map((star) => star.id)
            const selectedStar = parentStars[0] || stars.find((star) => Number(star.id) === Number(planet.StarId))
            const selectedGalaxyId = selectedStar ? selectedStar.GalaxyId : undefined
            res
                .status(200)
                .render('planets/edit.twig', { planet, stars, galaxies, selectedGalaxyId, selectedStarIds })
        } else {
            res
                .status(200)
                .render('planets/create.twig', { stars, galaxies, selectedStarIds: [] })
        }
    } catch(error) {
        res.status(500).json({ error: error.message })
    }    
}

// Export all controller actions
module.exports = { index, show, create, update, remove, form }
