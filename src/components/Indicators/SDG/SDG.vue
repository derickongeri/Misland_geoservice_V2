<template>
  <div class="flex">
   <q-list dense padding class="rounded-borders">
      <q-item clickable v-for="(sub_indicator, index) in sub_indicators" :key="index"
        @click="active_sub_indicator_value = sub_indicator.value">
        <q-item-section>
          <div class="indicator-title"
            :class="active_sub_indicator_value === sub_indicator?.value ? '' : 'text-grey-5'">
            {{ sub_indicator?.title }}</div>
        </q-item-section>
        <q-item-section top side>
          <div class="q-gutter-xs ">
            <q-btn flat round dense v-for="([key, value], i) in Object.entries(sub_indicator.icons)" :key="i">
              <img :src="setIcon(sub_indicator?.value, value)" style="width:25px"
                @click="setActiveButton(sub_indicator.value, value, key)">
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <!------------------------------------- show  form for the selected indicator ------------------------------------->
    <div class="" v-if="active_button_key==='settings'">
      <!------------------------------------- land cover form ------------------------------------->
      <SelectionForm v-if="active_sub_indicator_value === 'land_cover'">
        <LandCoverForm />
      </SelectionForm>
      <!------------------------------------- land productivity form ------------------------------------->
      <SelectionForm v-if="active_sub_indicator_value === 'land_productivity'">
        <LandProductivityForm />
      </SelectionForm>
      <!------------------------------------- carbon stock form ------------------------------------->
      <SelectionForm v-if="active_sub_indicator_value === 'carbon_stock'">
        <CarbonStockForm />
      </SelectionForm>
      <!------------------------------------- sdg indicator form ------------------------------------->
      <SelectionForm v-if="active_sub_indicator_value === 'sdg_indicator'">
        <SDGIndicatorForm />
      </SelectionForm>

    </div>

  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";
// unselected button images
import unselected_opacity from "src/assets/svg/indicators/action_icons/opacity_unselected.svg"
import unselected_settings from "src/assets/svg/indicators/action_icons/settings_unselected.svg"
import unselected_eye from "src/assets/svg/indicators/action_icons/eye_unselected.svg"
// selected button images
import selected_opacity from "src/assets/svg/indicators/action_icons/opacity.svg"
import selected_settings from "src/assets/svg/indicators/action_icons/settings.svg"
import selected_eye from "src/assets/svg/indicators/action_icons/eye.svg"
// active buttons
import active_opacity from "src/assets/svg/indicators/action_icons/active_opacity.svg"
import active_settings from "src/assets/svg/indicators/action_icons/active_settings.svg"
import active_eye from "src/assets/svg/indicators/action_icons/active_eye.svg"
const button_icons = {
  opacity: {
    selected: selected_opacity,
    unselected: unselected_opacity,
    active: active_opacity,
  },
  settings: {
    selected: selected_settings,
    unselected: unselected_settings,
    active: active_settings,
  },
  eye: {
    selected: selected_eye,
    unselected: unselected_eye,
    active: active_eye,

  },
}
export default {
  data() {
    return {
      active_sub_indicator_value: "land_cover", //holds the selected sub indicator
      active_button_icon: "", // holds the clicked button
       active_button_key: "", // holds  action button key either opacity, settings or visibility
      sub_indicators: {
        land_productivity: {
          title: 'Land Productivity', value: 'land_productivity', icons: { ...button_icons }
        },
        land_cover: { title: 'Land Cover', value: 'land_cover', icons: { ...button_icons } },
        carbon_stock: { title: 'Carbon Stock', value: 'carbon_stock', icons: { ...button_icons } },
        sdg_indicator: { title: 'SDG Indicator', value: 'sdg_indicator', icons: { ...button_icons } },
      },
    }
  },
  components: {
    SelectionForm: defineAsyncComponent(() => import('src/components/Reusables/SelectionForm.vue')),
    LandCoverForm: defineAsyncComponent(() => import("src/components/Forms/SDG/LandCoverForm.vue")),
    LandProductivityForm: defineAsyncComponent(() => import("src/components/Forms/SDG/LandProductivityForm.vue")),
    CarbonStockForm: defineAsyncComponent(() => import("src/components/Forms/SDG/CarbonStockForm.vue")),
    SDGIndicatorForm: defineAsyncComponent(() => import("src/components/Forms/SDG/SDGIndicatorForm.vue")),
  },

  mounted() {
  },
  methods: {
      // process the icon to show
    setIcon(sub_indicator_value, icon) {
      if (sub_indicator_value === this.active_sub_indicator_value) {
        if (this.active_button_icon === icon.active) return icon.active;
        return icon.selected;
      }
      return icon.unselected
    },
    // set the active button
    setActiveButton(sub_indicator_value, icon_value, icon_key) {
      this.active_sub_indicator_value = sub_indicator_value
      this.active_button_icon = icon_value.active;
      this.active_button_key = icon_key
    }

  }
}
</script>
<style lang="scss">

</style>
