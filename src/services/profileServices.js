import { connectDatabase } from "../db/connect.js"
import { deleteFile } from "../utils/deleteFile.js"

export const processUpdateUsername = async (iduser, username) => {
    try {
        const db = await connectDatabase()

        if (!iduser || !username) {
            return {
                status: 0,
                message: "Please fill all the data"
            }
        }

        const iduserValidation = Number(iduser)
        const usernameRegex = /^[a-zA-Z0-9]+$/;

        if (!Number.isInteger(iduserValidation) || iduserValidation <= 0) {
            return {
                status: 0,
                message: "ID User must be a valid number"
            }
        }

        if(!usernameRegex.test(username)) {
            return {
                status: 0,
                message: "Username can only contain letters and numbers"
            }
        }

        const [rows] = await db.query("SELECT id_user FROM users WHERE id_user = ?", [
            iduser
        ])

        if (rows.length === 0) {
            return {
                status: 0,
                message: "User is not found"
            }
        }

        await db.query("UPDATE users SET username = ? WHERE id_user = ?", [
            username, iduser
        ])

        return {
            status: 1,
            message: "Update username successfully",
            data: {
                username
            }
        }

    } catch (error) {
        console.error(error)
        return {
            status: 0,
            message: error.message
        }
    }
}

export const processUploadImage = async (filename) => {
    try {

        const domain = process.env.DOMAIN
        const imagePath = `${domain}/uploads/${filename}`;

        return {
            status: 1,
            message: "Image add successfully",
            imageUrl: imagePath
        }

    } catch (error) {
        console.error(error)
        return {
            status: 0,
            message: "Internal server error"
        }
    }
}

export const processUpdateProfileImage = async(iduser, image) => {
    try {
        
        const db = await connectDatabase()

        if (!iduser || !image) {
            return {
                status: 0,
                message: "Please fill all the data"
            }
        }

        const iduserValidation = Number(iduser)

        if (!Number.isInteger(iduserValidation) || iduserValidation <= 0) {
            return {
                status: 0,
                message: "ID User must be a valid number"
            }
        }

        let validURL = true
        try {
            new URL(image)
        } catch (error) {
            validURL = false
        }

        if (!validURL) {
            return {
                status: 0,
                message: "URL Image is not valid"
            }
        }

        const [rows] = await db.query("SELECT * FROM users WHERE id_user = ?", [
            iduser
        ])

        if (rows.length === 0) {
            return {
                status: 0,
                message: "User is not found"
            }
        }

        const oldImageUrl = rows[0].image;
        if (oldImageUrl && oldImageUrl.trim() !== "") {
            deleteFile(oldImageUrl);
        }

        await db.query("UPDATE users SET image = ? WHERE id_user = ?", [
            image, iduser
        ])

        return {
            status: 1,
            message: "Update image successfully"
        }


    } catch (error) {
        console.error(error)
        return {
            status: 0,
            message: error.message
        }
    }
}