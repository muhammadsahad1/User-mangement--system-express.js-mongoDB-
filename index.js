const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system")


const express = require("express")
const app = express()
const nocache = require('nocache')


app.use(nocache());


//for user routes

const userRoute = require('./routes/userRouter')
app.use('/',userRoute)

// FOR ADMIN ROUTE
const adminRoute = require('./routes/adminRouter')
app.use('/admin',adminRoute)

const port = 3002
app.listen(port, () => console.log(`server is running... ,http://localhost:${port}`))