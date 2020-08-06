const express = require('express')
const userRoutes = require('./routers/user')
const friendRoutes = require('./routers/friends')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRoutes)
app.use(friendRoutes)



app.listen(port,()=>{
    console.log(`server is up and running on port ${port}`)
})
