export default {
  dataProcessor: ({ results, indicator }) => {
    if (process.env.DEV) console.log(indicator, " indicator in stats ", results);
    const labels = results.stats.stats[0].stats.map(stat => stat.label)
    const values = results.stats.stats[0].stats.map(stat => (stat.value / 10000).toFixed(2))
    const backgroundColor = results.stats.stats[0].stats.map(stat => {
      const color = results.stats.mapping.find(color => stat.label === color.label)
      return color.color
    })
    if (process.env.DEV) console.log("results ", { backgroundColor, labels, values });
    return {
      backgroundColor, labels, values,
      start_year: results.base,
      end_year: results.target,
    }
  },

  changeDataProcessor: ({ results, indicator }) => {
    if (process.env.DEV) console.log(indicator," changeData processor ", results);
    const labels = results.stats.map(stat => stat.label)
    const values = results.stats.map(stat => (stat.area / 10000).toFixed(2))
    // chart background colors
    const backgroundColor = results.stats.map(stat => {
      const color = indicator.colors.find(color => stat.change_type === color.change_type)
      return color?.color || "#f4f1da";
    });
    return {
      backgroundColor, labels, values,
    }
  }

}
