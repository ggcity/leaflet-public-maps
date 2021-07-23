requirejs.config({
  baseUrl: 'https://ggcity.org/maps/lh',
  paths: {
    'leaflet': 'https://unpkg.com/leaflet@1.5.1/dist/leaflet',
    'jquery': 'https://code.jquery.com/jquery-3.4.1.min',
    'locate': 'https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.67.0/dist/L.Control.Locate.min'
  },
  shim: {
    'lh': ['leaflet', 'jquery', 'lh-load-css'],
    'wms': ['leaflet'],
    'search': ['leaflet', 'jquery'],
    'print.min': ['leaflet'],
    'fullscreen': ['leaflet'],
    'edgebuffer': ['leaflet'],
    'locate': ['leaflet']
  }
});
