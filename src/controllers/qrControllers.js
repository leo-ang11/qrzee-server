import * as qrServices from "../services/qrServices.js"

export const addQrToDatabase = async (req, res) => {
    const {iduser, qrdata, qrvalue} = req.body
    try {
        
        const result = await qrServices.processAddQrToDatabase(iduser, qrdata, qrvalue)

        if (!result.status) {
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

export const allQRUser = async (req, res) => {
    const {iduser} = req.body
    try {
        
        const result = await qrServices.processAllQrUser(iduser)

        if (!result.status) {
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}