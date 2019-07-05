import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "../firebase";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ep: [],
        ref: firebase.database().ref("node"),
        url: "http://localhost:3000",
        accessToken: "pk.eyJ1Ijoic2FpZHUiLCJhIjoiY2pveTNrM3ZvMTdpajNyb2R0Nmg1cG5hMCJ9.dDu8jfgjcQheDRsucflg3g",
        mapStyle: "mapbox://styles/mapbox/dark-v10",
        coordinates: [8.5233569, 11.9840647]
    },

    getters: {
        fetchEp:state=> {
            let dataset = []
            
            state.ep.forEach(doc => {
                dataset.push({
                    desc: doc.desc,
                    epidemic:doc.epidemic,
                    location: [doc.location[0].longitude, doc.location[0].latitude],
                    lga: doc.lga


                })
            })
            

            
            return Array.from(new Set(dataset))
           
        }
    },
    actions: {

    },
    mutations: {
        
        getFeatureSet:state=> {
            state.ep =[]
            state.ref.child('sos-reports').once("value", snaps => {
                
                snaps.forEach(snap => {
                    
                    state.ep.push({
                        id: snap.ref.key,
                        desc: snap.child('desc').val(),
                        epidemic:snap.child('epidemic').val(),
                        lga: snap.child('lga').val(),
                        location: snap.child('location').val()

                    })
                    
                })
              
            })
        }
    }
})