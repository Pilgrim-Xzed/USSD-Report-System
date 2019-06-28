<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total traffic"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 3.48%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total traffic"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 12.18%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Sales"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-danger mr-2">
                <i class="fa fa-arrow-down"></i> 5.72%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 54.8%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow border-0">
            <div id="map-canvas" class="map-canvas">
              <MglMap
                :accessToken="accessToken"
                :mapStyle="mapStyle"
                :zoom="12"
                :center="coordinates"
              >
                <MglNavigationControl position="top-right"/>

                <MglMarker v-for="point in getFeatureSet" :key="point" :coordinates="point.location">
                  <MglPopup>
                    <VCard>
                      <div>{{`${point.desc} , ${point.lga}` }}!</div>
                    </VCard>
                  </MglPopup>
                </MglMarker>
              </MglMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Mapbox from "mapbox-gl";
import axios from "axios";
import firebase from "../firebase";
import { MglMap, MglPopup, MglMarker } from "vue-mapbox";
import { setInterval } from "timers";
export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup
  },
  data() {
    return {
      ep: [],
     
      ref: firebase.database().ref("node"),
      url: "http://localhost:3000",
      accessToken:
        "pk.eyJ1Ijoic2FpZHUiLCJhIjoiY2pveTNrM3ZvMTdpajNyb2R0Nmg1cG5hMCJ9.dDu8jfgjcQheDRsucflg3g",
      mapStyle: "mapbox://styles/mapbox/dark-v10",
      coordinates: [8.5233569, 11.9840647]
    };
  },
  methods: {
    fetchEp() {
      this.ref.child('sos-reports').once("value",snaps => {
          snaps.forEach(snap => {
              this.ep.push({
                  id:snap.ref.key,
                  desc:snap.child('desc').val(),
                  lga:snap.child('lga').val(),
                  location:snap.child('location').val()
                  
              })
              
          })
      })
  },
  },
  computed:{
      getFeatureSet(){
          let dataset = []
          this.ep.forEach(doc=>{
              dataset.push({
                  desc:doc.desc,
                  location:[doc.location[0].longitude,doc.location[0].latitude],
                  lga:doc.lga


              })
          })

          return dataset
      }
  },
  created() {
    this.mapbox = Mapbox;

    this.fetchEp();
  }
};
</script>
<style>
</style>
