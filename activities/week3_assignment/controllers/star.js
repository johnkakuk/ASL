const { Star } = require('../models')

// Show all resources
const index = async (req, res) => {
    try {
        const stars = await Star.findAll()
        res.status(200).json(stars)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Show resource
const show = async (req, res) => {
    try {
        const star = await Star.findByPk(req.params.id)

        if (!star) return res.status(404).json({ error: 'Star not found' })

        res.status(200).json(star)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new resource
const create = async (req, res) => {
    try {
        const star = await Star.create(req.body)
        res.status(201).json(star)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update an existing resource
const update = async (req, res) => {
    try {
        const star = await Star.findByPk(req.params.id)

        if (!star) return res.status(404).json({ error: 'Star not found' })

        await star.update(req.body)
        res.status(200).json(star)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Remove a single resource
const remove = async (req, res) => {
    try {
        const star = await Star.findByPk(req.params.id)

        if (!star) return res.status(404).json({ error: 'Star not found' })

        await star.destroy()
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Export all controller actions
module.exports = { index, show, create, update, remove }
