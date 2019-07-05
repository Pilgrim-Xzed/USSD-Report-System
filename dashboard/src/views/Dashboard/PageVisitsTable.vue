<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">REPORTS</h3>
        </div>
        <div class="col text-right">
          <a href="#!" class="btn btn-sm btn-primary">See all</a>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light"
                  :data="tableData">
        <template slot="columns">
          <th>LGA</th>
          <th>PLACE</th>
          <th>EPIDEMIC</th>

          <th>LOCATIOM</th>
          <th>CONDITION</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.lga}}
          </th>
          <th scope="row">
            {{row.location[0].formattedAddress}}
          </th>
          <td>
            {{row.epidemic}}
          </td>
          <td>
            {{row.desc}}
          </td>
          <td>
            <i class="fa fa-ambulance text-success mr-3"
               :class="row.bounceRateDirection === 'up' ? 'text-success': 'text-danger'">
            </i>
           critical
          </td>
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations} from 'vuex'
  export default {
    name: 'page-visits-table',
    data() {
      return {
       tableData:this.$store.state.ep
      }
    },

    computed:{
      ...mapGetters(['fetchEp']),
      ...mapState(['ep'])
    },
  
  }
</script>
<style>
</style>
