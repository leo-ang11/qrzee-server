import express from "express";
import * as authControllers from "../controllers/authControllers.js"

const router = express.Router()

router.post('/signup', authControllers.Signup)
router.post('/login', authControllers.Login)
router.get('/me', authControllers.verifyToken, authControllers.dataUser)


export default router