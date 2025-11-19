import express from "express"
import * as qrControllers from "../controllers/qrControllers.js"

const router = express()

router.post('/add-qr', qrControllers.addQrToDatabase)
router.post('/all-qr', qrControllers.allQRUser)

export default router