<template>
  <div class="q-pa-sm">
    <form @submit.prevent="submit">
      <!---------------------------------------- select start date ---------------------------------------->
      <div class="q-my-sm">

        <div class="text-uppercase q-ml-xs">Start-Date</div>
        <input type="date" class="full-width" v-model="form_data.start_date" style="width: 150px" />
      </div>
      <!---------------------------------------- select end date ---------------------------------------->
      <div class="q-my-sm">
        <div class="text-uppercase q-ml-xs">End-Date</div>
        <input type="date" class="full-width" v-model="form_data.end_date" style="width: 150px" :min="form_data.start_date" />
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
import { format, addDays } from 'date-fns'
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

export default {
  data() {
    return {
      form_data: {
        start_date: "", //holds  start date
        end_date: "", //holds  end date
        indicator: {
          label: "Forest Fire Risk",
          value: "forest_fire_risk",
          colors
        },
        cached: false,
      }
    }
  },

  methods: {
    async submit() {
      try {
        let payload = {
          end_date: this.form_data.end_date,
          start_date: this.form_data.start_date,
          transform: "area",
          cached: this.form_data.cached,

        }
        // set the indicators to store
        setIndicatorSelections({
          ...this.form_data
        })
        setIndicatorNotes(this.form_data.indicator.value); //set notes to show  to store
        const uri = `/api/forestfirerisk/`; // build the request url
        const results = await requestAnalysis({ uri, payload, caller: 'Forest Fire Risk' });// request analysis
        const chart_data = chartData.changeDataProcessor({ results, indicator: this.form_data.indicator }); // create chart data from results
        setChartData(chart_data); //store the processed chart data

      } catch (error) {
        if (process.env.DEV) console.log("error requesting analysis ", error);
      }
    }
  }
}
</script>
<style lang="">

</style>
