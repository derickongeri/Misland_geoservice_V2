<template>
  <div class="">
    <canvas :id="chart_id" height="200"></canvas>
  </div>
</template>
<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
export default {
  props: {
    chart_data: [String, Object],
  },
  data() {
    return {
      chart_instance: null, // holds the chart instance
      chart_id:'bar-chart'
    };
  },
  computed: {
    // checks chart data from the store
    chartData() {
      return this.chart_data
    }
  },
  watch: {
    chartData: {
      immediate: true,
      handler(val) {
        if (!val) return;
        console.log("**************************** ", val);
        this.render(val)
      }
    },
  },
  mounted(){

  },
  methods: {
    render({ values, labels, backgroundColor }) {
      const data = {
        labels: labels,
        datasets: [
          {
            label: "",
            data: values,
            backgroundColor,
            borderWidth: 2,
            borderRadius: 2,
          }
        ]
      };
      const config = {
        type: 'bar',
        data: data,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false,
            }
          },
          scales: {
            x: {
              grid: {
                display: false,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true,
              }
            },
            y: {
              grid: {
                display: true,
                borderDash: [8, 4],
              }
            },
          }
        }
      };
      if (this.chart_instance) this.chart_instance.destroy();
      this.chart_instance = new Chart(
        document.getElementById(this.chart_id),
        config
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.chart-title {}
</style>
