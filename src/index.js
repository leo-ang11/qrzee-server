import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js";
import qrRoutes from "./routes/qrRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api', qrRoutes)
app.use('/api', profileRoutes)
app.use('/uploads', express.static("src/uploads"))

app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT} `)
})