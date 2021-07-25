const express = require('express')
const app = express();
const config = require('config')
const PORT = config.get('port')
const ProjectRouter = require('./router/Project')
const AuthenticationRouter = require('./router/Authentication')

app.use(express.json())

app.get('/',(req, res)=>{
    res.json({
        success: true
    })
})

app.use('/authen',AuthenticationRouter)
app.use('/project',ProjectRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})