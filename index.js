
let express=require('express')
const connectToMongo = require('./db')
let app=express()

require('dotenv').config()

let port = process.env.PORT || 5500

app.use(express.json())

app.use('/api',require('./routes/user.routes'))

app.listen(port,()=>{
    connectToMongo()
    console.log(`App is running on Port ${port}`)
})

