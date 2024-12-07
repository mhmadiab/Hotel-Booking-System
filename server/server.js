
const dotenv = require("dotenv").config()
const express = require("express")
const database = require("./config/db")
const connectDB = require("./config/db")
const app = express()
const mainRouter = require("./routes/index")
const { errorHandler } = require("./middleware/errorMiddleware")


const port = process.env.PORT || 3000

//connect to database:
connectDB()

//setting up middlewares: 
app.use(express.json())

//setup routes:
app.use("/api", mainRouter)

app.use(errorHandler)


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

