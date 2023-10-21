import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyD9w2tU1GEpr4q2ECu-oTuB9ZC3nYOug3Q",
    libraries: "places"
  }
});