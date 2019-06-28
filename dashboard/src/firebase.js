import firebase from 'firebase'



const config ={
    apiKey: "AIzaSyAoIhVN0A5r625x3fvPjlGQe6SdJ-oVhTA",
    authDomain: "playchat-591df.firebaseapp.com",
    databaseURL: "https://playchat-591df.firebaseio.com",
    projectId: "playchat-591df",
    storageBucket: "playchat-591df.appspot.com",
    messagingSenderId: "578499918496",
    appId: "1:578499918496:web:a9a00d5b3c6a8558"
}


firebase.initializeApp(config)

export default firebase;