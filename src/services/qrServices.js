import { connectDatabase } from "../db/connect.js"

export const processAddQrToDatabase = async (iduser, qrdata, qrvalue) => {
    try {
        const db = await connectDatabase()

        if (!iduser || !qrdata || !qrvalue) {
            return {
                status: 0,
                message: "Please Fill All the Data",
            };
        }

        const userIdNumber = Number(iduser)
        if (!Number.isInteger(userIdNumber) || userIdNumber <= 0 ) {
            return {
                status: 0,
                message: "ID User must be a valid number"
            }
        }

        let validURL = true
        try {
            new URL(qrdata)
        } catch (error) {
            validURL = false
        }

        if (!validURL) {
            return {
                status: 0,
                message: "QR Data must be a valid URL"
            }
        }


        await db.query("INSERT INTO data_qr (id_user, url_qr, value_qr) VALUES(?, ?, ?)", [
            iduser, qrdata, qrvalue
        ])

        return {
            status: 1,
            message: "QR Data successfully added",
            data: {
                id_user: iduser,
                url_qr: qrdata,
                value_qr: qrvalue
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

export const processAllQrUser = async (iduser) => {
    try {
        
        const db = await connectDatabase()
        const userIDCheck = Number(iduser)

        if (!Number.isInteger(userIDCheck) || userIDCheck <= 0) {
            return {
                status: 0,
                message: "ID User must be a valid number"
            }
        }

        const [rows] = await db.query("SELECT * FROM data_qr WHERE id_user = ?", [iduser])

        return {
            status: 1,
            data: rows
        }
        

    } catch (error) {
        console.error(error)
        return {
            status: 0,
            message: error.message
        }
    }
}
