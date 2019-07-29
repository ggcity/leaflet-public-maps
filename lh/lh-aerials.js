define(['leaflet'], function (L) {
  // returns default cached aerial imagery from geowebcache on geoserver
  return function () {
    return L.tileLayer.wms('//ggcity.org/geoserver/gwc/service/wms', {
      layers: 'gis:aerials',
      format: 'image/png',
      transparent: false,
      maxZoom: 22,
      maxNativeZoom: 22
    });
  };
});
