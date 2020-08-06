const express = require('express')
const db = require('./db/postgres')


const app = express()
const port = process.env.PORT



db.authenticate().then(()=>{
    console.log('DB connected')
}).catch((e)=>{
    console.log(e)
})




app.get('/',(req,res)=>{
    res.send('Index')
})

app.listen(port,()=>{
    console.log(`server is up and running on port ${port}`)
})
