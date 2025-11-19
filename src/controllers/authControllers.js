import * as authServices from "../services/authServices.js"
import jwt from "jsonwebtoken"

export const Signup = async (req, res) => {
    const {username, email, password} = req.body

    try {
        
        const result = await authServices.processSignup(username, email, password)

        if (!result.status) {
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const Login = async (req, res) => {
    const {email, password} = req.body

    try {
        
        const result = await authServices.processLogin(email, password)

        if (!result.status) {
            return res.status(400).json(result)
        }

        const token = result.token

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.SECURE_COOKIE, 
            sameSite: "strict",
            maxAge:  23 * 60 * 60 * 1000
        })
        return res.status(200).json(result)


    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }

}

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            status: 0,
            message: "Not authenticated"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            status: 0,
            message: "Invalid token"
        })
    }
}

export const dataUser = async (req, res) => {
    try {
        
        const result = await authServices.getdataUser(req.user.id)

        if (!result.status) {
            return res.status(404).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}