<template>
  <div class="q-pa-sm">
    <canvas :id="chart_id" height="200"></canvas>
  </div>
</template>
<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default {
  props: {
    chart_data: [String, Object],
    chart_id: String,
  },
  data() {
    return {
      chart_instance: null, // holds the chart instance
    };
  },
  computed: {
    // checks chart data from the store
    chartData() {
      return this.chart_data;
    },
  },
  watch: {
    chartData: {
      immediate: true,
      handler(val) {
        if (!val) return;
        this.render(val);
      },
    },
  },
  methods: {
    render({ line_labels, datasets, indicator }) {
      const has_line_chart = ["forest_fire_risk", "forest_loss"];
      if (!has_line_chart.includes(indicator)) return;
      const data = {
        labels: line_labels,
        datasets,
      };
      const config = {
        type: "line",
        data: data,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          // indexAxis: "y",
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true,
              },
            },
            y: {
              grid: {
                display: true,
                borderDash: [8, 4],
              },
            },
          },
        },
      };
      if (this.chart_instance) this.chart_instance.destroy();
      this.chart_instance = new Chart(
        document.getElementById(this.chart_id),
        config
      );
    },
  },
};
</script>
<style lang="scss"></style>
