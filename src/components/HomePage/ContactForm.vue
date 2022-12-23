<template >
  <q-page class="contact-container">
    <!-- contact us box section -->
    <div class="contact-us-box">
      <div class="contact-title">Contact us</div>
      <div class="contact-description">We want to hear from you! Help us improve
        MISLAND by completing the form on the right.</div>
    </div>
    <!--------------------------------------- contact us form container --------------------------------------->
    <div class="contact-us-form-container">
      <form @submit.prevent="handleContactUs">
        <!-- email -->
        <div class="">
          <div class="contact-label">E-mail</div>
          <q-input outlined dense v-model="contact_us_form.email" input-class="contact-input"
            placeholder="example@missland.org" />
          <!-- show validation error message -->
          <div class="text-red q-ml-md q-mt-xs" v-if="v$.contact_us_form.email.$error">
            {{ v$.contact_us_form.email.$errors[0].$message }}
          </div>
        </div>
        <!-- title -->
        <div class="">
          <div class="contact-label">Title</div>
          <q-input outlined dense v-model="contact_us_form.title" input-class="contact-input"
            placeholder="What would you like to be your Heading?" />
        </div>
        <!-- message -->
        <div class="">
          <div class="contact-label">Message</div>
          <q-input outlined dense autogrow type="textarea" input-class="contact-input" v-model="contact_us_form.message"
           input-style="min-height:100px"  />
        </div>
        <!-- action -->
        <div class="q-mt-lg q-mb-sm">
          <q-btn unelevated class="contact-submit-btn" type="submit">Submit</q-btn>
        </div>
      </form>
    </div>
  </q-page>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import {required,helpers, email } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      contact_us_form: {
        email: "",
        title: "",
        message: "",
      }
    }
  },
  validations() {
    return {
      contact_us_form:{
        email: {
        required: helpers.withMessage("Email address is required", required),
        email: helpers.withMessage("Email mst be valid", email)
      },
      }

    }
  },
  methods: {
    async handleContactUs() {
      try {
        this.v$.$touch(); //validate the form
        if (this.v$.$error) return; // return if for has errors
        console.log("contact_us_form ", this.contact_us_form);
      } catch (error) {
        if (process.env.DEV) console.log("Error sending contact ", error)
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.contact-container {
  padding: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/png/hero_background.png');

  @media (max-width: $breakpoint-sm-max) {}
}

.contact-us-box {
  border-radius: 24px;
  background-color: rgba(1, 3, 37, 0.2);
  backdrop-filter: blur(12px);
  max-width: 425px;
  padding: 20px;
  position: absolute;
  top: 50px;
}

.contact-title {
  color: #A8AF7F;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
}

.contact-description {
  color: #FCFDFF;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
}

.contact-us-form-container {
  position: absolute;
  width: 500px;
  top: 50px;
  right: 30px;
  padding: 20px 30px;
  border-radius: 25px;
  background: rgba(1, 3, 37, 0.2);
  backdrop-filter: blur(12px);
}

.contact-label {
  color: #F0F1E9;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  margin: 20px 0px 5px 0px
}

.contact-submit-btn {
  background: #74B281;
  color: #F8F9F4;
  border-radius: 11px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  width: 150px;
}
</style>

<style lang="scss">
.contact-input {
  color: #F0F1E9;
}
</style>
