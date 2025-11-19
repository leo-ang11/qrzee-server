import { connectDatabase } from "../db/connect.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const processSignup = async (username, email, password) => {

    try {

        const db = await connectDatabase()
        if (!username || !email || !password) {
            return {
                status: 0,
                message: "Please Fill All the Data",
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9]+$/;


        if (!usernameRegex.test(username)) {
            return {
                status: 0,
                message: "Username can only contain letters and numbers",
            };
        }

        if (!emailRegex.test(email)) {
            return {
                status: 0,
                message: "Invalid email format",
            };
        }
        
        const [ rows ] = await db.query("SELECT id_user FROM users WHERE email = ? ", [email])

        if (rows.length > 0) {
            return {
                status: 0,
                message: "Email Already Exist"
            }
        }

        const hashPassword = await bcrypt.hash(password, 10)
        await db.query("INSERT INTO users (username, email, password) VALUES(?, ?, ?) ",
            [username, email, hashPassword]
        )

        return {
            status: 1,
            message: "Sign Up Successfully"
        }

    } catch (error) {
        console.error(error)
        return {
            status: 0,
            message: error.message
        }
    }

}

export const processLogin = async (email, password) => {
    try {
        
        const db = await connectDatabase()
        if (!email || !password) {
            return {
                status: 0,
                message: "Please Fill All the Data",
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            return {
                status: 0,
                message: "Invalid email format",
            }
        }

        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email])

        if (rows.length === 0) {
            return {
                status: 0,
                message: "Email or Password is Incorrect"
            }
        }

        const isMatch = await bcrypt.compare(password, rows[0].password)

        if (!isMatch) {
            return {
                status: 0,
                message: "Email or Password is Incorrect"
            }
        }

        const token = jwt.sign(
            {id: rows[0].id_user},
            process.env.JWT_KEY,
            {expiresIn: process.env.TOKEN_EXPIRES}
        )

        return {
            status: 1,
            message: "Login Successfully",
            token: token
        }

    } catch (error) {
        console.error(error)
        return {
            status: 0,
            message: error.message
        }
    }
}

export const getdataUser = async (userID) => {
    const db = await connectDatabase()
    const [rows] = await db.query("SELECT * FROM users WHERE id_user = ?", [userID])
    
    if(rows.length === 0) {
        return {
            status: 0,
            message: "User not found"
        }
    }
    
    return {
        status: 1,
        user: rows[0]
    }
}

