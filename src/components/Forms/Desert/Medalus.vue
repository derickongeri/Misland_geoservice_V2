<template >
  <div class="q-pa-sm">
    <form @submit.prevent="submit">
      <!---------------------------------------- select data source ---------------------------------------->
      <div class="q-my-sm">
        <div class="text-uppercase q-ma-xs">SELECT QUALITY INDEX</div>
        <q-select hide-dropdown-icon outlined dense v-model="form_data.indicator" class="q-mx-xs" behavior="menu"
          :options="qualityIndices">
          <template v-slot:append>
            <q-icon name="keyboard_arrow_down" color="grey-6" />
          </template>
        </q-select>
      </div>
      <!---------------------------------------- select reporting period ---------------------------------------->
      <div class="q-my-sm">
        <div class="text-uppercase q-ml-xs">REPORTING PERIOD</div>
        <q-select hide-dropdown-icon outlined dense v-model="form_data.start_year" class="q-mx-xs" behavior="menu"
          :options="form_data.years">
          <template v-slot:append>
            <q-icon name="keyboard_arrow_down" color="grey-6" />
          </template>
        </q-select>
      </div>
      <!--------------------------------- action buttons --------------------------------->
      <div class="flex items-center justify-between q-mt-md full-width">
        <div class="">
          <q-checkbox v-model="form_data.cached" dense left-label label="Cached" />
        </div>
        <div class="">
          <q-btn unelevated dense class="indicator-selction-form-btn" type="submit" no-caps>Submit</q-btn>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { requestAnalysis } from 'src/Services/requests'
import chartData from 'src/Services/chartData'
import { getPercentage, getStatValue } from 'src/Services/summaryData'
//pinia
import { storeToRefs } from "pinia";
import { useComputationYearsStore } from "src/stores/computation_year_store"; // computation years store
import { useIndicatorSelectionStore } from "src/stores/indicator_selection_store"; // user indicator selection store
import { useChartDataStore } from "src/stores/chart_data_store"; // user indicator selection store
import { useGeometryStore } from "src/stores/geometry_store"; // geometry data store
const { fetchComputationYears } = useComputationYearsStore(); // action to fetch computation years
const { setIndicatorSelections, setIndicatorNotes } = useIndicatorSelectionStore(); // action to set user form selections to the store
const { setChartData, setDataSummary } = useChartDataStore() //action to set chart data to the store
const { getRenderedCustomGeometryData } = storeToRefs(useGeometryStore()); // get selected gemotry data from the store store


const colors = [
  {
    color: "green",
    change_type: 1
  },
  {
    color: "#f4f1da",
    change_type: 2
  },
  {
    color: "red",
    change_type: 3
  },

];
const esai_colors = [
   {
    color: "#256D85",
    change_type: 1
  },
  {
    color: "#DFF6FF",
    change_type: 2
  },
  {
    color: "#2B7A0B",
    change_type: 3
  },
  {
    color: "#7DCE13",
    change_type: 4
  },
  {
    color: "#E1FFB1",
    change_type: 5
  },
  {
    color: "#FFDE00",
    change_type: 6
  },
  {
    color: "#F07DEA",
    change_type: 7
  },
      {
    color: "#D2001A",
    change_type: 8
  },

]
export default {
  data() {
    return {
      form_data: {
        start_year: "", // holds selected start year
        years: [], // holds the published years
        // default indicator
        indicator: {
          label: "Climate",
          value: "climatequality",
          colors: colors,
          computation_type: "Climate Quality Index"
        },
        cached: false, // controls type of results to be received
      },
      chart_data: "", // holds chart data results
    }
  },
  computed: {
    qualityIndices() {
      return [
        {
          label: "Climate",
          value: "climatequality",
          colors: colors,
          computation_type: "Climate Quality Index"
        },
        {
          label: "Vegetation",
          value: "vegetationquality",
          colors: colors,
          computation_type: "Vegetation Quality Index"
        },
        {
          label: "Soil",
          value: "soilquality",
          colors: colors,
          computation_type: "Soil Quality Index"
        },
        {
          label: "Management",
          value: "managementquality",
          colors: colors,
          computation_type: "Management Quality Index"
        },
        {
          label: "Environmental Sensitive Areas",
          value: "esai",
          colors: esai_colors,
          computation_type: "ESAI"
        },

      ]
    }
  },
  mounted() {
    this.fetchYears()
  },
  methods: {
    // fetch computation years
    async fetchYears() {
      this.form_data.years = await fetchComputationYears("Climate Quality Index")
    },
    async submit() {
      try {
        let payload = {
          start_year: this.form_data.start_year,
          end_year: this.form_data.start_year,
          cached: this.form_data.cached,
          raster_type: 1,
          computation_type: this.form_data.indicator.computation_type,
        };
        // set the indicators to store
        setIndicatorSelections({
          ...this.form_data
        })
        setIndicatorNotes(this.form_data.indicator.value); //set notes to show  to store
        const uri =   `/api/${this.form_data.indicator.value}/`// build the request url
        const results = await requestAnalysis({ uri, payload, caller: 'Water Erosion' });// request analysis
        const chart_data = chartData.changeDataProcessor({ results, indicator: this.form_data.indicator }); // create chart data from results
        setChartData(chart_data); //store the processed chart data
        this.processStatSummary()//process summary statistics
      } catch (error) {
        if (process.env.DEV) console.log("error making request ", error);
      }
    },
    // set the summary note according to the sub indicator selected
    processStatSummary() {
      const indicator = `summaries.${this.form_data.indicator.value}`
      const summary_html = this.$t(indicator, [
      getRenderedCustomGeometryData.value?.name,
      this.form_data.start_year,
        getPercentage(getStatValue({  change_type: 3 })),
        getPercentage(getStatValue({ change_type: 1 })),
        getPercentage(getStatValue({  change_type: 2 })),

      ]);
      //store the summary to store
      setDataSummary(summary_html)
    }
  },
}
</script>
<style lang="scss">

</style>
