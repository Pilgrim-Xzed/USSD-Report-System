<template>
  <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Reports"
                                type="gradient-red"
                                :sub-title="ep.length.toString()"
                                icon="fa fa-plus"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="LASA FEVER"
                                type="gradient-orange"
                                sub-title="2,356"
                                icon="fa fa-ambulance"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Ebola"
                                type="gradient-green"
                                sub-title="924"
                                icon="fa fa-ambulance"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="MALARIA"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="fa fa-ambulance"
                                class="mb-4 mb-xl-0"
                    >

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
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

                <MglMarker v-for="point in fetchEp" :key="point" :coordinates="point.location">
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
import {mapState,mapGetters,mapMutations} from 'vuex'
import { setInterval } from "timers";
export default {
  components: {
    MglMap,
    MglPopup,
    MglMarker,
 
  },
  
  methods: {
    ...mapMutations(['getFeatureSet'])
  },
  computed:{
      ...mapGetters(['fetchEp']),
      ...mapState(['ep','ref','url','accessToken','mapStyle','coordinates'])
  },
  created() {
    this.mapbox = Mapbox; 
    this.getFeatureSet();
 
  }
};
</script>
<style>
</style>
