<template>
  <div class="row q-pa-md">
    <div class="col-md-4 q-pa-md" v-for="(indicator, index) in indicators" :key="index">
      <div class="indicator-card">
        <div class="indicator-image-container">
          <img :src="indicator?.image" class="indicator-image">
        </div>
        <!-- indicator title  -->
        <div class="indicator-title-container">
          <img :src="indicator?.title_icon" class="indicator-title-icon">
          <div class="indicator-title">{{ indicator?.title }}</div>
        </div>
        <!-- indicator description -->
        <div class="indicator-description">
          {{ indicator?.description }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sdg_indicator_map from 'src/assets/svg/home_page/sdg_indicator_map.svg';
import sdg_title_icon from 'src/assets/svg/home_page/sdg_title_icon.svg';
import forest_change_map from 'src/assets/svg/home_page/forest_change_map.svg';
import forest_change_title_icon from 'src/assets/svg/home_page/forest_change_title_icon.svg';
import veg_loss_map from 'src/assets/svg/home_page/veg_loss_map.svg';
import veg_loss_title_icon from 'src/assets/svg/home_page/veg_loss_title_icon.svg';
import coastal_erosion_map from 'src/assets/svg/home_page/coastal_erosion_map.svg';
import coastal_erosion_title_icon from 'src/assets/svg/home_page/coastal_erosion_title_icon.svg';
import desertification_map from 'src/assets/svg/home_page/desertification_map.svg';
import desertification_title_icon from 'src/assets/svg/home_page/desertification_title_icon.svg';
import soil_erosion_map from 'src/assets/svg/home_page/soil_erosion_map.svg';
import soil_erosion_title_icon from 'src/assets/svg/home_page/soil_erosion_title_icon.svg';
export default {
  computed: {
    indicators() {
      return [
        {
          image: sdg_indicator_map,
          title_icon: sdg_title_icon,
          title: 'SDG Indicator 15.3.1',
          description: `
                The proportion of land that is degraded
                over total land area. Determined as a binary
                degraded/not degraded.Quantification is
                based on the analysis of available data
                for three sub-indicators (Trends in Land
                Cover, LandProductivity and Carbon Stocks)
                according to the March 2021 UNCCD good
                practice guide
                `
        },
        {
          image: forest_change_map,
          title_icon: forest_change_title_icon,
          title: 'Forest Change',
          description: `
                The quantification of the forest gain/loss
                and carbon emission hotspots is based on
                pre-existing high-resolution global maps
                derived from Hansen Global Forest change
                dataset. Burnt area assesment is done using
                Landsat 8 and Sentinel 2
                `
        },
        {
          image: veg_loss_map,
          title_icon: veg_loss_title_icon,
          title: 'Vegetation Loss',
          description: `
                Vegetation loss/gain hotspots will be
                calculated based on time series observation
                of selected suit of vegetation indices NDVI,
                MSAVI &amp; SAVI
                `
        },
        {
          image: coastal_erosion_map,
          title_icon: coastal_erosion_title_icon,
          title: 'Coastal Erosion',
          description: `
                Section of coastline is assigned a risk value
                for each CVI variable(Geomorpology, Coastal
                Slope, Sea-level rise, shoreline erosion and
                accression rates, mean tidal range and mean
                wave height, the coastal vulnerability index
                (C.V.I.)is calculated as the square root of the
                geometric mean ofthese values, or the square
                root of the product of theranked variables
                divided by the total number of variables
                `
        },
        {
          image: desertification_map,
          title_icon: desertification_title_icon,
          title: 'Desertification',
          description: `
                MEDALUS–(Mediterranean Desertification
                and Land Use Model) is used worldwide to
                identify ‘sensitive areas’ that are potentially
                threatened by land degradation and
                desertification.
                `
        },
        {
          image: soil_erosion_map,
          title_icon: soil_erosion_title_icon,
          title: 'Soil Erosion',
          description: `
          MISLAND investigates the spatial patterns
          of water and wind erosion risks, first
          separately and then combined, in the
          drought-prone region of North Africa using
          the best available datasets and remote
          sensing techniques.
                `
        },

      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.indicator-card {
  background-color: #DFE8D1;
  border-radius: 21px;
  height: 100%;

}

.indicator-image-container {
  padding: 20px;
}

.indicator-image {
  width: 100%;
  max-height: 150px;
  object-fit: cover;

  border-radius: 20px;
}

.indicator-title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
}

.indicator-title-icon {
  width: 30px;
  height: 40px;
}

.indicator-title {
  color: #697523;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 22px;
  margin-left: 20px;
}

.indicator-description {
  padding:20px 20px;
  color: #000000;
  font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
}
</style>
