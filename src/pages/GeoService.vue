<template>
  <q-page>
    <!-- show map -->
    <div class="">
      <Map />
    </div>
    <!-- show search -->
    <div class="q-pa-none search-region ">
      <Search />
    </div>
    <!-- show stats button    -->
    <div class="statistics-button" v-show="getChartData && active_component === 'indicator-selections'">
      <StatisticsButton :statistics_data="getChartData" @show_statistics_component="active_component = 'statistics'" />
    </div>
    <!---------------------- show indicator selections----------------------------->
    <div class="analysis-container">
      <!--------------- show the indicator selection---------------->
      <IndicatorSelection :active_indicator_selection="active_indicator_selection"
        v-show="active_component === 'indicator-selections'" />
      <!------------- show chart, summary and notes-------------->
      <div class="flex">
        <div class="flex">
          <IndicatorsCondensed @emit_selected_form="expandFormItems"
            v-show="active_component === 'statistics'" />
        </div>
        <div class="" style="flex:1">
          <ChartArea v-show="active_component === 'statistics'"
            @show_indicator_selections="active_component = 'indicator-selections'" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import indicator_svg from 'src/assets/svg/indicators/map.svg'
import { defineAsyncComponent } from "vue";
//pinia
import { storeToRefs } from "pinia";
import { useGeometryStore } from "src/stores/geometry_store";
import { useChartDataStore } from "src/stores/chart_data_store"; // user indicator selection store
const { getChartData } = storeToRefs(useChartDataStore()); // get chart data from store

const { setGeometryData } = useGeometryStore();
export default {
  data() {
    return {
      active_component: "indicator-selections", // statistics or selection-forms
      indicator_svg,
      active_indicator_selection: null,
    };
  },
  computed: {
    //
    getChartData() {
      return getChartData.value
    },

  },
  components: {
    Search: defineAsyncComponent(() => import('src/components/GeoService/Search.vue')),
    StatisticsButton: defineAsyncComponent(() => import('src/components/GeoService/StatisticsButton.vue')),
    Map: defineAsyncComponent(() => import('src/components/Reusables/Map.vue')),
    IndicatorSelection: defineAsyncComponent(() => import('src/components/Reusables/IndicatorSelection.vue')),
    IndicatorsCondensed: defineAsyncComponent(() => import('src/components/Reusables/IndicatorsCondensed.vue')),
    // charts
    ChartArea: defineAsyncComponent(() => import('src/components/Reusables/Chart.vue')),
  },
  watch: {
    getChartData: {
      handler(val) {
        if (!val) return
        this.active_component = "statistics"
      }
    }
  },
  mounted() {
    this.fetchContinentalGeometry(); // fetch continental geometry
    this.fetchRegionalVectors(); //  fetch regional vectors
  },
  methods: {
    // fetch continental geometry
    async fetchContinentalGeometry() {
      try {
        const vector_response = await this.$api.get('/api/vectcontinental/');
        console.log("vector response ", vector_response.data);
        const id = vector_response.data[0]?.id
        const name = vector_response.data[0]?.name
        const geometry_response = await this.$api.get(
          `/api/vectcontinental/${id}`
        );
        console.log("geometry response ", geometry_response.data);
        // store the geometry in the store
        setGeometryData({
          geojson: geometry_response.data,
          admin_level: -2,
          name: name,
          vector: id
        })
      } catch (error) {
        if (process.env.DEV) console.log("error fetching geoJson  ", error);
      }
    },
    // fetch regional vectors
    async fetchRegionalVectors() {
      try {
        const vector_response = await this.$api.get('/api/vectregional/');
        console.log("regional vector response ", vector_response.data);

      } catch (error) {
        if (process.env.DEV) console.log("error fetching regional vectors  ", error);
      }
    },
    // swap stats and form
    expandFormItems(expansion_item){
   this.active_indicator_selection = expansion_item
   this.active_component = "indicator-selections"
    }
  }
};
</script>

<style lang="scss" scoped>
// search input style
.search-region {
  z-index: 500;
  position: absolute;
  left: 0;
  margin: 10px 20px
}

.statistics-button {
  z-index: 500;
  position: absolute;
  left: 380px;
  background-color: white;
  padding: 5px 20px;
  border-radius: 10px;
  margin: 10px 0px 0px 0px
}

// indicator section container class
.analysis-container {
  z-index: 500;
  position: absolute;
  @media (min-width: $breakpoint-sm-min) {
    margin: 80px 0px 0px 20px;
    max-width: 500px;
  }

  @media (max-width: $breakpoint-xs-max) {
    margin: 80px 0px 0px 0px;
    width: 100%;
  }

}
</style>
