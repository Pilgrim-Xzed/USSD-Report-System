const http = require('http')
const port = process.env.PORT||3000
const app = require('./app')
const server = http.createServer(app)
const africaAT = require('africastalking')


server.listen(port,()=>{
    
    console.log(`Server started on port ${port}`)
    const ussd = new africaAT({
        apiKey: 'f67dc07a460194631aaba8ed2301bc728354e6c2024aadbef70a5037cbd02c7e',
        username: 'sandbox'
    })
})
