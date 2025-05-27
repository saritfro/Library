const express =require("express")
const app = express()
const bodyParser = require("body-parser")
const settingsRouter = require("./Routers/settingsRouter")
const booksRouter = require("./Routers/booksRouter")
const usersRouter = require("./Routers/usersRouter")
const managerRouter = require("./Routers/managerRouter")
const dotenv = require("dotenv")
dotenv.config()

const mongoose = require("mongoose")
const cors = require("cors")
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB…"))
.catch(err => console.log(err))


app.use("/books",booksRouter )
app.use("/users",usersRouter )
app.use("/settings",settingsRouter )
app.use("/manager",managerRouter )


console.log(process.env.MONGODB_PASS)

app.listen(process.env.API_PORT, ()=>{
    console.log("run!")
})

