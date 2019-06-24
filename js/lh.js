require.config({
  baseUrl: 'https://ggcity.org/maps/js'
});

require([
  "https://unpkg.com/leaflet@1.5.1/dist/leaflet.js",
  "https://code.jquery.com/jquery-3.4.1.min.js"
], function () { require([
  "leaflet.edgebuffer",
  "leaflet.wms",
  "L.Control.Search",
  "https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js",
  "https://cdn.maptiks.com/maptiks-leaflet.min.js"
], function () {
  maptiks.trackcode='7582471a-da37-44e3-8dd1-dbc7bc3f8ca2';

  var Lh = {};
  
  Lh.map = function (mapDiv, options) {
    var map = L.map(mapDiv, $.extend({
      bounds: [[33.732480,-118.042790], [33.805686, -117.894278]],
      fullscreenControl: true,
      scrollWheelZoom: true,
      dragging: true,
      zoomControl: true,
      doubleClickZoom: true,
      touchZoom: true,
      attributionControl: false,
      keyboard: true,
      inertiaDeceleration: 3000,
      inertiaMaxSpeed: 3000,
      maxBounds: [[32,-121], [36.5, -113.5]],
      maxBoundsViscosity: 0.1,
      minZoom:12,
      maxZoom:20
    }, options));

    map.fitBounds(map.options.bounds);

    L.control.scale().addTo(map);
    L.control.attribution({ prefix: '<a href="https://ggcity.org/maps">GGCity</a> ' }).addTo(map);
  
    return map;
  };

  // load basemap from ggcity Mapbox account
  Lh.mapbox = function (style) {
    // username, styles, and public-maps token from ggcity Mapbox account
    var userName = 'ggcity';
    // token only allows access from ggcity.org, ch.ci.garden-grove.ca.us
    var accessToken = 'pk.eyJ1IjoiZ2djaXR5IiwiYSI6ImNqd2lkM3N2dDAza2Y0YW43MHU2dHVlczcifQ.xRMhGcP2VXTdJ408o4cJnA';
   
    var styles = {
      'boundary': 'cjwibofeg5eup1cp9h6zy34m7',
      'no-boundary': 'cjwibptg006up1dlu7z2yn8ve'
    };

    if (styles[style] === undefined) console.error('Specified style not defined');

    // concat the url
    var basemapURL = 'https://api.mapbox.com/styles/v1/' + userName + '/' + styles[style] + '/tiles/256/{z}/{x}/{y}?access_token=' + accessToken;
    return Lh.tileLayer(basemapURL);
  };
  
  // load a basemap from a specified url with options. defaults to options below
  Lh.tileLayer = function (url, options) {
    return L.tileLayer(url, $.extend({
      attribution: '&copy; <a href="http://openmaptiles.org/" target="_blank">OpenMapTiles</a>' +
        ' &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors' +
        ' &copy; <a href="https://github.com/microsoft/USBuildingFootprints/blob/master/LICENSE" target="_blank">Microsoft</a>',
      edgeBufferTiles: 1,
      maxZoom: 20
    }, options));
  };
  
  Lh.wms = function (url, layers, options) {
    var source = L.WMS.source(url, $.extend({
      transparent: true,
      format: 'image/png',
      info_format: 'text/html',
      identify: true,
      maxZoom:22
    }, options));
    
    var wmsLayers;
    if (typeof layers === 'string') {
      // return single wms
      wmsLayers = source.getLayer(layers);
    } else if (Array.isArray(layers)) {
      // return array of wms
      var wmsLayers = [];
      for (var i = 0; i < layers.length; i++) {
        wmsLayers.push(source.getLayer(layers[i]));
      }
    } else if (typeof layers === 'object') {
      // return object of named layers for adding TOC
      wmsLayers = {};
      for (key in layers) {
        wmsLayers[key] = source.getLayer(layers[key]);
      }
    }
    return wmsLayers;
  };

  Lh.aerial = function () {
    return L.tileLayer.wms('//ggcity.org/geoserver/gwc/service/wms', {
      layers: 'gis:aerials',
      format: 'image/png',
      transparent: false,
      maxZoom: 22,
      maxNativeZoom: 22
    });
  };

  main(Lh);
})});

function loadCss(url) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

loadCss("https://unpkg.com/leaflet@1.5.1/dist/leaflet.css");
loadCss("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
loadCss("https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css");
loadCss("/maps/css/main.css");
