const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const firebase = require('firebase')
const cors = require('cors')
firebase.initializeApp({
    serviceAccount:'./Lesson-efa0be30b4f5.json',
    databaseURL:'https://playchat-591df.firebaseio.com/'
})

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));

const ref = firebase.database().ref('node')
const messagesRef = ref.child('sos-reports')



let emergencyName ;
let emergencyLocation;
let emergencyDesc;

app.get('/',(req,res)=>{
   
    ref.child('sos-reports').once('value').then((snap)=>{
       let reports = snap.val()
        return res.status(200).json({
            reports
        })

    })

    return res.status(200)
   
})
app.post('/',(req,res)=>{
   // Read variables sent via POST from our SDK
   const { sessionId, serviceCode, phoneNumber, text } = req.body;
  
   console.log('####################', req.body);
   let response = "";

    if (text === "") {
        console.log(text);
        // This is the first request. Note how we start the response with CON
        response = `CON SOS EMERGENCY 
            1. ACCIDENT
            2. ROBBERY
            3. DISEASE
            4. SCAM

            `;
      } else if (text === "1") {

            emergencyName = "Accident";
        response = `CON ENTER STATE 
        1. KADUNA
        2. LAGOS
        3. BORNO
        4. JIGAWA
`;
      } else if (text === "1*1") {
       emergencyLocation = "KADUNA"
      
       
      
        response = `CON Enter Accident Cause`;

      } else if (text) {
        // This is a second level response where the user selected 1 in the first instance
        emergencyDesc = text
        messagesRef.push({
            title:emergencyName,
            location:emergencyLocation,
            description:emergencyDesc
        });
        response = `END Your SOS has beed submited`;
      } else if (text === "1*2") {
        // This is a second level response where the user selected 1 in the first instance
        const balance = "KES 10,000";
        // This is a terminal request. Note how we start the response with END
        response = `END Your balance is ${balance}`;
      }
    
      // Print the response onto the page so that our SDK can read it
      res.set("Content-Type: text/plain");
      res.send(response);
      // DONE!!!
})



module.exports = app