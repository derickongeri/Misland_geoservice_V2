<template>
  <q-page class="hero-container">
    <!--------------------- title and action button section --------------------->
    <div class="hero-title-and-cta-container">
      <!--------------------- section with blurr --------------------->
      <div class="blurred-section">
        <div class="blurred-section-title">
          Monitoring Land Degradation for SDG
          Indicator 15.3.1 Reporting and Action
        </div>
        <div class="blurred-section-text">
          Providing comprehensive land degradation information
          from a selected kit of indicators using remote sensing
        </div>
      </div>
      <!-- dashboard and QGIS plugin button -->
      <div class="flex q-my-md">
        <q-btn unelevated class="dashboard-btn">Dashboard</q-btn>
        <!-- <q-btn unelevated class="dashboard-btn">Geo Service</q-btn> -->
        <q-btn unelevated class="qgis-plugin-btn">QGIS Plugin</q-btn>
      </div>
      <!-- quick access section -->
      <div class="q-my-md">
        <div class="flex">
          <div class="quick-access-text">Quick Access</div>
          <img src="~assets/svg/home_hero/white_arrow_right.svg" alt="">
        </div>
        <div class="quick-access-underline"></div>
      </div>
    </div>
    <!---------------------------- scroll explore section---------------------------------->
    <div class="scroll-to-exlore-container">
      <div class="flex justify-center">
        <img src="~assets/svg/home_hero/scroll.svg" alt="">
        <div class="scroll-to-explore">Scroll to explore</div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.hero-container {
  padding: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/png/hero_background.png');

  @media (max-width: $breakpoint-sm-max) {}
}

.hero-title-and-cta-container {
  @media (min-width: $breakpoint-md-min) {
    position: absolute;
    top: 25%;
    left: 40px;
    max-width: 795px;
  }

  @media (max-width: $breakpoint-sm-max) {
    margin-top: 30px;

  }
}

.blurred-section {
  background: rgba(1, 3, 37, 0.2);
  backdrop-filter: blur(12px);
  padding: 20px;
  border-radius: 25px;
}

.blurred-section-title {
  font-family: 'Inter';
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  color: #FCFDFF;
  margin: 10px 0px;
}

.blurred-section-text {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.04em;
  color: #FCFDFF;
}

.dashboard-btn {
  background: #74B281;
  border-radius: 7px;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 22px;
  color: #F8F9F4;
  margin: 10px 20px;

  @media (max-width: $breakpoint-sm-max) {
    margin: 10px;
  }
}

.qgis-plugin-btn {
  background: #FCFDFF;
  border-radius: 7px;
  color: #4A5219;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 22px;
  margin: 10px;
}

.quick-access-text {
  color: #FCFDFF;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  margin: 10px 30px 0px 20px
}

.quick-access-underline {
  border: 3px solid #FCFDFF;
  max-width: 200px;
  margin: 4px 0px 0px 20px
}

.scroll-to-exlore-container {
  position: absolute;
  bottom: 20px;
  right: 0;
  left: 0;

  @media (max-width: $breakpoint-xs-max) {
    position: relative;
    margin-top: 50px;
  }
}

.scroll-to-explore {
  color: #F8F9F4;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 24px;
  margin-left: 10px;
}
</style>
