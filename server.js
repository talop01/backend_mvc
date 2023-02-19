// Loading env if we are not in production.
if (process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")

const indexRouter = require("./routes/index")

// view engine setup
// 1. Templating language setup
app.set("view engine","ejs")
// 2. View resource
app.set("views",__dirname+"/views")
app.set("layout","layouts/layout")
app.use(expressLayouts)
// html,css,js resource folder
app.use(express.static("public"))

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL,
    {useNewUrlParser:true})

const db = mongoose.connection
db.on("error",error => console.error(error))
db.once("open",() => console.log("Connected to Mongoose"))

app.use("/",indexRouter)

app.listen(process.env.PORT || 3000)