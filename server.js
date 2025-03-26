const express =require("express")
const app = express()
const bodyParser = require("body-parser")

const booksRouter = require("./Routers/booksRouter")
const usersRouter = require("./Routers/usersRouter")
const dotenv = require("dotenv")
dotenv.config()

const mongoose = require("mongoose")
const cors = require("cors")
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_CONNECT)

.then(() => console.log("Connected…")).catch(err => console.log(err))


app.use("/books",booksRouter )
app.use("/users",usersRouter )



console.log(process.env.MONGODB_PASS)

app.listen(process.env.API_PORT, ()=>{
    console.log("run!")
})





