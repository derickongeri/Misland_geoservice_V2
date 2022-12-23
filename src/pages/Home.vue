<template>
  <div class="">
    <!------------------ Hero Page --------------------->
    <Hero />
    <!------------------ End of hero Page --------------------->
    <!------------------ start of what is MISLAND --------------------->
    <div class="flex q-py-lg q-px-md">
      <div class="col-md flex justify-center">
        <div class="what-is-misland">What is MISLAND North Africa?</div>
      </div>
      <div class="col-md what-is-misland-description flex column justify-center">
        <div class="q-my-sm">
          The Monitoring Integrated System for Land Degradation MISLAND was developed
          thanks to a collaboration between the OSS and LocateIT under the GMES&Africa
          programme as a Decision Support System (DSS) utilizing Earth Observation data to
          deliver information, promote awareness, and support decision making toward achieving
          Land Degradation Neutrality (LDN) in six OSS North Africa action zone countries: Algeria,
          Egypt, Libya, Morocco, Mauritania and Tunisia.
        </div>
        <div class="q-my-sm">
          At the very core, the service provided information to monitor SDG indicator 15.3.1
          (Proportion of land that is degraded over the total land area). In addition, and to
          improve the understanding and the multi-faceted nature of the active processes
          behind land degradation, MISLAND service also provides information on vegetation
          loss and gain hotspots, forest change, forest fires and the Mediterranean Desertification
          and Land Use Model (MEDALUS), to assess desertification indicators.
        </div>
      </div>
    </div>
    <!------------------ End of what is MISLAND --------------------->
    <!------------------ Start of MISLAND Indicator tabs --------------------->
    <div class="q-my-md">
      <MislandIndicators />
    </div>
    <!------------------ End of MISLAND Indicator tabs --------------------->
    <!------------------ Start of misland north africa training  --------------------->
    <div class="misland-training-container">
      <div class="row">
        <div class="col">
          <div class="misland-training-north-africa">MISLAND North Africa trainings</div>
          <!-- description -->
          <div class="misland-training-description">
            <div class="q-my-sm">
              A series of tele training sessions on the use of the new indicators for land degradation monitoring
              service will be conducted by LocateIT, in collaboration with the GMES&Africa partner members of the OSS
              Consortium North Africa.
            </div>
            <div class="q-my-sm">
              The trainings will be delivered via the ZOOM platform in two languages
              French/English with a translation service provided by the OSS.
            </div>
          </div>
        </div>
        <div class="col">
          <div class=""></div>
        </div>
      </div>
    </div>
    <!------------------ End of misland north africa training  --------------------->
    <!------------------ Start of contact form  --------------------->
    <div class="">
      <ContactForm />
    </div>
    <!------------------ End of contact form  --------------------->
    <!------------------ start of footer  --------------------->
    <div class="">
      <Footer />
    </div>
    <!------------------ end of footer  --------------------->
  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";
export default {
  data() {
    return {

    }
  },
  components: {
    Hero: defineAsyncComponent(() => import('src/components/HomePage/Hero.vue')),
    MislandIndicators: defineAsyncComponent(() => import('src/components/HomePage/MislandIndicators.vue')),
    ContactForm: defineAsyncComponent(() => import('src/components/HomePage/ContactForm.vue')),
    Footer: defineAsyncComponent(() => import('src/components/Footer.vue')),
  }
}
</script>
<style lang="scss" scoped>
.what-is-misland {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 40px;
  color: #838C48;

  @media (max-width: $breakpoint-sm-max) {}
}

.what-is-misland-description {
  font-family: 'Inter';
  font-weight: 600;
  font-size: 20px;
  color: #404715;
}

.misland-training-container {
  padding: 30px;
}

.misland-training-north-africa {
  color: #838C48;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 40px;
}

.misland-training-description {
  color: #404715;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
}
</style>
