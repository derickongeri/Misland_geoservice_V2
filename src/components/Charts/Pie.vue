<template>
  <div class="">
    <canvas id="pie-chart" height="200"></canvas>
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
        this.render(val)
      }
    },
  },
  mounted() {

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
        type: 'pie',
        data: data,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          // indexAxis: 'y',
          plugins: {
            legend: {
              display: true,
              position: "right",
              labels: {
                fontColor: "black"
              }
            }
          },

        }
      };
      if (this.chart_instance) this.chart_instance.destroy();
      this.chart_instance = new Chart(
        document.getElementById('pie-chart'),
        config
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.chart-title {}
</style>
