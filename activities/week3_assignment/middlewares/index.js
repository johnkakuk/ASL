// Dependencies
const path = require('path')
const fs = require('fs/promises')

// Define middleware. Adapted with AI from professor-provided code
const uploadImage = async (req, res, next) => {
    try {
        // No uploaded file: continue request lifecycle.
        if (!req.files || !req.files.image) {
            return next()
        }

        const imageFile = req.files.image
        const extension = path.extname(imageFile.name)
        const fileName = `image-${Date.now()}${extension}`
        const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'images')
        const uploadPath = path.join(uploadDir, fileName)

        await fs.mkdir(uploadDir, { recursive: true })
        await imageFile.mv(uploadPath)

        // Hand off relative URL for controller to persist.
        req.uploadedImagePath = `/uploads/images/${fileName}`
        return next()
    } catch (error) {
        return next(error)
    }
}

// Export middlewares
module.exports = { uploadImage }
