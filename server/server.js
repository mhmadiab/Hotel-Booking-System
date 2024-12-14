
const dotenv = require("dotenv").config()
const express = require("express")
// const database = require("./config/db")
const connectDB = require("./config/db")
const app = express()
const mainRouter = require("./routes/index")
const {auth} = require("./middleware/authMiddleware")
const { errorHandler } = require("./middleware/errorMiddleware")
const cookieParser = require("cookie-parser")
const path = require("path")


const port = process.env.PORT || 3000

//connect to database:
connectDB()

//setting up middlewares: 
app.use(express.json())
app.use(cookieParser())

//setup routes:
app.use("/api", mainRouter)
app.use("/auth", auth)

app.use(errorHandler)

if(process.env.NODE_ENV == "production"){
    const publicPath = path.join(__dirname, ".", "build")
    const filePath =  path.resolve(__dirname, ".", "build", "index.html")
    app.use(express.static(publicPath))
    app.get("*", (req, res) => {
        return res.sendFile(filePath)
    })
}


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

