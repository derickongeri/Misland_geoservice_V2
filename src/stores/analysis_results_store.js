import { defineStore } from 'pinia';

export const useAnalysisResultsStore = defineStore('analysis_results_store', {
  state: () => ({
    results: "", //holds  analysis results
  }),
  getters: {
    getAnalysisResults: (state) => state.results, // get analysis results
  },
  actions: {
    // store the requested analysis results
    setAnalysisResults(results) {
      this.results = results
    },
    },
});


