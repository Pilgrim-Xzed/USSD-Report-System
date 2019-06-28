const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const firebase = require('firebase')
const cors = require('cors')
const NodeGeocoder = require('node-geocoder')

let options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
 

  apiKey: 'AIzaSyC4v-4-gkbNE2NN3OK_DNnvnyLK5EnLys8', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
}


const geocoder = NodeGeocoder(options)


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
const sosRef = ref.child('sos-reports')




let epState ;
let epLga;
let erpArray;
let desc;
let epPlace;
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
        response = `CON REPORT EPIDEMIC/DISEASE OUTBREAK  
        ***********************************\n
        1. KANO
        2. KADUNA 
        3. LAGOS
        4. ABUJA
        `;
      } else if (text === "1") {
        epState ="Kano"
        response = `CON ENTER LGA OF OUTBREAK \n 
        1. Gwarzo
        2. Albasu
        3. Bebeji
        4. Dawakin Kudu
`;
      } else if (text === "1*1") {
        epLga = "Gwarzo"
        response = `CON SELECT EPIDEMIC CATEGORY \n 
        1. Lasa Fever
        2. Ebola
        3. Measles
        4. Chemical disease
`;

      } else if (text === "1*1*1") {
        response = `CON Enter Outbreak info with '_' Before the location name e.g buk newsite`;
        
        
      } else if (text) {
          erpArray = text.substring(6).split("_")
          desc = erpArray[0]
          epPlace=erpArray[1]
          console.log(epPlace)
          geocoder.geocode({address: epPlace,  countryCode: 'Ng',state:epState, minConfidence: 0.5, limit: 5}, function(err, res) {
            sosRef.push()
            sosRef.push({
                state:epState,
                lga:epLga,
                desc:desc,
                location:res

            })
          }).catch(err=>{
            console.log(err)
          })
      response = `END Your SOS has beed submited`;
      }
    
      // Print the response onto the page so that our SDK can read it
      res.set("Content-Type: text/plain");
      res.send(response);
      // DONE!!!
})



module.exports = app