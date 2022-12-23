<template>
  <q-page id="map" >

 </q-page>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

export default {


  data() {
    return {
      baseMaps: null,
      map: null,
      center: [1.054628, 38.533204],
    };
  },
  computed: {
    map_style() {
      return `height:${this.height};`;
    },
    geojson_data() {
      return this.geojson_array;
    }
  },
  mounted() {
    this.createmap();
  },
  methods: {
    //  create the map instance
    createmap() {
      let osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }
      );

      let mapbox = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          // maxZoom: 18,
          id: "mapbox/streets-v11",
          accessToken:
            "pk.eyJ1IjoidGVsZW9wcyIsImEiOiJja3ExejlpeXEwanBmMnZxcmE0NmkwNnkyIn0.cYjjcrjUulIBjlU4o8EbJg"
        }
      );
      let mapboxSatellite = L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}{r}?access_token={accessToken}",
        {
          attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',

          id: "mapbox/satellite-v9",
          accessToken:
            "pk.eyJ1IjoidGVsZW9wcyIsImEiOiJja3ExejlpeXEwanBmMnZxcmE0NmkwNnkyIn0.cYjjcrjUulIBjlU4o8EbJg"
        }
      );
      this.baseMaps = {
        OpenStreetMap: osm,
        MapBox: mapbox,
        MapBoxSatellite: mapboxSatellite
      };
      this.map = L.map("map", {
        zoomControl: true,
        layersControl: true,
        center: this.center,

        zoom: 6,
        layers: [osm]
      }); // add the basemaps to the controls
      L.control.layers(this.baseMaps).addTo(this.map);
      this.setupGeomanDraw();
    },
    //
    setupGeomanDraw() {
      this.map.pm.addControls({
       position: 'bottomright',
        drawMarker: false,
        drawPolygon: true,
        editMode: false,
        drawRectangle: false,
        rotateMode: false,
        cutPolygon: false,
        drawCircleMarker: false,
        drawPolyline: false,
        removalMode: true
      });
      this.map.on("pm:create", e => {
        const geojson = JSON.stringify(e.layer.toGeoJSON().geometry);
        console.log("geojson ", geojson);
      });
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
