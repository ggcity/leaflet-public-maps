define(['leaflet', 'jquery', 'lh-load-css', 'wms', 'fullscreen', 'edgebuffer', 'info', 'maptiks'], 
function(L, $, loadCss, wms, search, fullscreen, edgebuffer, info, mt) {
  loadCss("/maps/css/fullscreen.css");

  if ($('script[data-lhembed="1"]').length == 0) {
    loadCss("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
  };
  if (mt) {
    maptiks.trackcode='7582471a-da37-44e3-8dd1-dbc7bc3f8ca2'
  };

  var Lh = {};

  // returns a default map with extendable options
  Lh.map = function (mapDiv, options) {
    var map = L.map(mapDiv, $.extend({
      bounds: [[33.732480,-118.042790], [33.805686, -117.894278]],
      scrollWheelZoom: true,
      dragging: true,
      zoomControl: false,
      doubleClickZoom: true,
      touchZoom: true,
      attributionControl: true,
      keyboard: true,
      inertiaDeceleration: 3000,
      inertiaMaxSpeed: 3000,
      maxBounds: [[32,-121], [36.5, -113.5]],
      maxBoundsViscosity: 0.1,
      minZoom:12,
      maxZoom:20
    }, options));

    map.fitBounds(map.options.bounds);
    map.attributionControl.setPrefix('<a href="https://ggcity.org/maps">GGCity</a> ');

    L.control.zoom().addTo(map);
    L.control.fullscreen().addTo(map);
    L.control.scale().addTo(map);
  
    return map;
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

  // load wms features from geoserver with extendable options. defaults to options below
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

  // adds an info control to the map
  Lh.info = function (options) {
    return L.Control.info($.extend({
      position: 'topleft',
      content: 'None'
    }, options));
  };

  return Lh;
});
