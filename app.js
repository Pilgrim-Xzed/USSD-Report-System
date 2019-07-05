const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const firebase = require('firebase')
const cors = require('cors')
const NodeGeocoder = require('node-geocoder')
const ussdMenu = require('ussd-menu-builder')
let menu = new ussdMenu()
let options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
 

  apiKey: 'AIzaSyC2MsiYaaXea2X1qGDu_tVBBMTPoUXun7k', // for Mapquest, OpenCage, Google Premier
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
let disease;
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
  let args = {
    phoneNumber: req.body.phoneNumber,
    sessionId: req.body.sessionId,
    serviceCode: req.body.serviceCode,
    text: req.body.text
};

menu.run(args, resMsg => {
  res.send(resMsg);
});


menu.startState({
  run: () => {
      // use menu.con() to send response without terminating session      
      menu.con(`REPORT EPIDEMIC/DISEASE OUTBREAK:\n1.Kano \n2.Kaduna \n3.Lagos`);
  },
  // next object links to next state based on user input
  next: {
      '1': 'Kano',
      '2': 'Kaduna',
      '3': 'Lagos'
  }
});

menu.state('Kano', {
  
  run: () => {
    epState = "Kano",
    menu.con(`SELECT LGA :\n1.Gwarzo \n2.Bebeji \n3.Karaye`);
  },
  next:{
    '1':'Gwarzo',
    '2':'Bebeji',
    '3':'Karaye'
  }
});

menu.state('Gwarzo',{
  
  run:()=>{
    epLga="Gwarzo",
    menu.con(`DISEASE EPIDEMIC :\n1.Malaria \n2.Lasa Fever \n3.Ebola`);
  },
  next:{
    '1':'Malaria',
    '2':'LasaFever',
    '3':'Ebola'
  }
})

menu.state('Malaria',{
  run:()=>{
    disease = "Malaria"
    menu.con(`Enter Particular Location to be precised `);
  },
  next: {
    '*[a-zA-Z]+': 'Malaria.locationName'
}
})




menu.state('Malaria.locationName',{
  run:()=>{
    epPlace = menu.val;
   console.log(epPlace)
    
   
    
    menu.con(`Enter Other Info `);
  },
  next: {
    '*[a-zA-Z]+': 'Final.desc'
}
})


menu.state('Final.desc',{
  run:()=>{
    desc = menu.val;
    geocoder.geocode({address: epPlace,  countryCode: 'Ng',state:epState, minConfidence: 0.5, limit: 5}, function(err, res) {
      sosRef.push()
      sosRef.push({
          state:epState,
          lga:epLga,
          desc:desc,
          epidemic:disease,
          location:res

      })
    }).catch(err=>{
      geocoder.geocode({address: epLga,  countryCode: 'Ng',state:epState, minConfidence: 0.5, limit: 5}, function(err, res) {
        sosRef.push()
        sosRef.push({
            state:epState,
            lga:epLga,
            desc:desc,
            epidemic:disease,
            location:res
  
        })
      })
    })
    
   
    
    menu.end(`Thank You, SOS has been sent `);
  },
  
})


})



module.exports = app