const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const firebase = require('firebase')

firebase.initializeApp({
    serviceAccount:'./Lesson-efa0be30b4f5.json',
    databaseURL:'https://playchat-591df.firebaseio.com/'
})

const ref = firebase.database().ref('node')
const messagesRef = ref.child('messages')
const messageRef = messagesRef.push()
const messageKey = messageRef.key

let payload = {};
let message = {
    text:'Hello'
}
payload['usersLog/' + messageKey ] = message
payload['users/' + messageKey ] = message


app.get('/',(req,res)=>{
    ref.child('users').on('value',(snap)=>{
        let users = snap.val();
        console.log(users);

        return res.status(200).json({
            data:users,
            
        })
        
    })
  
    return res.status(200)

})



app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json())
module.exports = app