const express = require('express')
const cors = require('cors')
const path = require('path')
const userRoutes = require('./routers/user')
const friendRoutes = require('./routers/friends')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(friendRoutes)

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(port,()=>{
    console.log(`server is up and running on port ${port}`)
})
