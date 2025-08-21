import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db/index.js"


const app = express()
dotenv.config({
    path: './.env'
})

app.use(cors("*"))

// app.use(express.json({ limit: "16kb" }))
// app.use(express.urlencoded({ extended: true, limit: "16kb" }))
// app.use(express.static("public"))
// app.use(cookieparser())

// routes import 
// routes declaration
app.use(express.json());
app.use('/' ,(req,res) => {
    res.send("hi I'm working!");
})
connectDB()
try {
       app.listen(process.env.PORT || 8000 , ()=>{
        console.log(` server is running at port ${process.env.PORT}`);
    })
} catch (error) {
    console.log(error)
    
}

export { app }
