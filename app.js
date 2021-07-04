const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/connection')

const app = express()

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8000

// log requests
app.use(morgan('tiny'))

//mongoDB connection
connectDB()

// parse requests to body-parser
app.use(bodyParser.urlencoded({extended: true}))

// set view engine
app.set('view engine','ejs')

// static files
app.use(express.static(path.join(__dirname, 'public')))

// load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})