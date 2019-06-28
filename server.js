const http = require('http')
const port = process.env.PORT||3000
const app = require('./app')
const server = http.createServer(app)
const africaAT = require('africastalking')


server.listen(port,()=>{
    
    console.log(`Server started on port ${port}`)
    ussd = new africaAT({
        apiKey: '3c52e16ffadfb9f3792885c426073f780fbf9a2d7b52c05f59b184d1966943cd',
        username: 'sandbox'
    })
})
