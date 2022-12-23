<template>
  <q-layout view="lHh Lpr lFf">

    <q-header>
      <q-toolbar class="tool-bar" :class="headerBackgroundColor">
        <div class="flex items-center">
          <div class="flex items-center" style="padding-right:46px">
            <img src="~assets/svg/misland_logo.svg" alt="">
            <div class="misland_title">MISLAND</div>
          </div>
          <div class="q-mx-md gt-xs">
            <img src="~assets/svg/oss_logo.svg" style="85px">
          </div>
          <div class="q-mx-md gt-xs">
            <img src="~assets/svg/gmes_logo.svg" style="width: 121.8px;height: 34.08px;">
          </div>
        </div>
        <q-space />
        <div class="flex items-center">
          <router-link to="/" class="q-mx-md  gt-1280 tool-bar-link" :class="linkTextColor">Home</router-link>
          <router-link to="/" class="q-mx-md  gt-1280 tool-bar-link" :class="linkTextColor">Dashboard</router-link>
          <router-link to="/geoservice" class="q-mx-md  gt-1280 tool-bar-link"
            :class="linkTextColor">Geo-Service</router-link>
          <router-link to="/" class="q-mx-md  gt-1280 tool-bar-link" :class="linkTextColor">Mapographics</router-link>

          <!-- select language selection -->
          <div class="q-mx-xs">
            <q-select borderless v-model="language" :options="['English', 'French']"
              popup-content-class="language-selection-options" behavior="menu">
              <template v-slot:selected-item="scope">
                <div class="language-selected" :class="linkTextColor">{{ scope.opt }}</div>
              </template>
            </q-select>
          </div>
          <div class="q-mx-md  gt-1280">
            <q-btn unelevated no-caps class="login-button" to="/login" v-show="!getAuthUserDetails">Login</q-btn>
            <div class="q-pa-xs" v-show="getAuthUserDetails">
              <router-link to="/profile" class="no-link-decoration text-h6" :class="linkTextColor"> Hello, <span
                  class="text-capitalize"> {{ getAuthUserDetails?.first_name }}</span></router-link>
            </div>

          </div>
        </div>
        <div class="lt-1280">
          <q-btn flat dense round color="black" aria-label="Menu" @click="toggleLeftDrawer">
            <div class="q-mr-sm show-more-btn-label">More</div>
            <q-icon name="menu" />
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <!--------------------------------------- show drawer for screens below 1280 ----------------------------------------------->
    <q-drawer v-model="left_drawer_open" :breakpoint="1280" side="right">
      <div class="q-pl-lg column">
        <div class="flex column">
          <router-link to="/" class=" tool-bar-link q-my-lg" :class="linkTextColor">Home</router-link>
          <router-link to="/" class=" tool-bar-link q-my-lg" :class="linkTextColor">Dashboard</router-link>
          <router-link to="/geoservice" class="q-my-lg tool-bar-link" :class="linkTextColor">Geo-Service</router-link>
          <router-link to="/" class=" tool-bar-link q-my-lg" :class="linkTextColor">Mapographics</router-link>
          <div class="absolute-bottoms">
            <q-btn unelevated no-caps class="login-button" to="/login" v-show="!getAuthUserDetails">Login</q-btn>
            <div class="q-pa-xs" v-show="getAuthUserDetails">
              <router-link to="/profile" class="no-link-decoration text-h6" :class="linkTextColor"> Hello, <span
                  class="text-capitalize"> {{ getAuthUserDetails?.first_name }}</span></router-link>
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { negative, positive } from "src/Services/notifications"
//pinia
import { storeToRefs } from "pinia";
import { useAuthUserStore } from "src/stores/auth_user_store"; // auth user store
const { getAuthUserDetails } = storeToRefs(useAuthUserStore()); // get authenticated user from store
const { fetchAuthUserDetails } = useAuthUserStore()
export default {
  name: 'MainLayout',
  data() {
    return {
      left_drawer_open: false,
      language: "English", // holds the selected language
    }
  },

  computed: {
    getCurrentRoute() {
      return this.$route.params;
    },
    getAuthUserDetails() {
      return getAuthUserDetails.value
    },
    //
    headerBackgroundColor() {
      const current_page_name = this.$route?.name;
      if (current_page_name === 'home') return 'bg-black text-white'
      return 'bg-white'
    },
    //
    linkTextColor() {
      const current_page_name = this.$route?.name;
      if (current_page_name === 'home') return 'text-white'
      return 'header-grey-links'
    }

  },
  watch: {
    getCurrentRoute: {
      immediate: true,
      handler(val) {
        if (!val) return;
        const action = val.action
        if (process.env.DEV) console.log(action, " getCurrentRoute *********** ", this.getCurrentRoute);
        if (action === 'activate') return this.activate();// run user account activation
      }
    }
  },
  mounted() {
    // fetch authenticated user
    // fetchAuthUserDetails()
  },
  methods: {
    toggleLeftDrawer() {
      this.left_drawer_open = !this.left_drawer_open
    },
    // activate user account
    async activate() {
      try {
        const { action, code, token } = this.getCurrentRoute;
        if (action != "activate") return;
        const response = await this.$api.get(
          `/api/${action}/${code}/${token}`
        );
        positive({
          message: response.data.message,
          position: "center",
          multiLine: true,
          color: "green"
        });
        this.$router.push("/geoservice");
      } catch (error) {
        if (process.env.DEV) console.log("Error: Could not activate user ", error);
        negative({
          message: error.response.data || "Could not activate user",
          position: "center",
          multiLine: true,
          color: "red"
        });
      }
    },
    // logout logged in user
    logout() {
      localStorage.removeItem("oss_auth_token");
      location.reload();
    },
  }
}
</script>

<style lang="scss" scoped>
.header-grey-links {
  color: #4A5219;
}

.gt-1280 {
  @media (max-width: 1279px) {
    display: none;
  }
}

.lt-1280 {
  @media (min-width: 1280px) {
    display: none;
  }
}

.show-more-btn-label {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #404715;
}



.tool-bar {
  // background: #FFFFFF;
  // border: 1px solid #A3B2CA;
}

.login-button {
  background-color: #74B281;
  border-radius: 10px;

  @media (min-width: $breakpoint-md-min) {}

  @media (max-width: $breakpoint-sm-max) {
    width: 150px
  }
}

.tool-bar-link {
  font-family: 'Inter';
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.02em;
  text-decoration: none;

}

.language-selected {
  font-family: 'Inter';
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -0.02em;
}
</style>


<style lang="scss">
.language-selection-options {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 20px;
  letter-spacing: -0.02em;
}
</style>
