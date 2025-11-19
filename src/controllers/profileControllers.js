import * as profileServices from "../services/profileServices.js"

export const updateUsername = async (req, res) => {
    const {iduser, username} = req.body
    try {
        
        const result = await profileServices.processUpdateUsername(iduser, username)

        if (!result.status) {
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
}

export const uploadImage = async (req, res) => {
    try {
        
        if (req.fileValidationError) {
            return res.status(400).json({
                status: 0,
                message: req.fileValidationError
            });
        }

        if (!req.file) {
            return res.status(400).json({ 
                status: 0,
                message: "Image is required"
            });
        }

        const result = await profileServices.processUploadImage(req.file.filename)

        if (!result.status) {
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
}

export const updateImageProfile = async (req, res) => {
    const {iduser, image} = req.body
    try {
        
        const result = await profileServices.processUpdateProfileImage(iduser, image)

        if (!result.status) {
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.error(error)
        return res.status(500).json(error)
    }
}