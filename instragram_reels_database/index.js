import express, { application } from "express"
import cors from "cors"
import authRouter from "./routes/auth.js"

const app =express()
app.use(cors({
    origin: "*"
}))

app.use(express.json())

app.get("/test", (req, res) => {
    res.json({
        success: 1
    })
})
app.listen(8888, () => {
    console.log("server is running on the port 8080");
})