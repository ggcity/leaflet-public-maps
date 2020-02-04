define(['leaflet'], function (L) {
  // load a geojson overlay
  return function (url, layer, options, sourceParams) {
    var LhLayer = L.geoJson(null, $.extend({
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
      },
      onEachFeature: function (feature, layer) {
        var p = feature.properties
        var htmlContent = '<table>id: <strong>' + p.id + '</strong></table>'
        layer.bindPopup(htmlContent);
      }
    }, options));

    var wfsURL = new URL(url);
    var wfsParams = $.extend({
      service: 'WFS',
      version: '2.0.0',
      request: 'GetFeature',
      outputFormat: 'application/json',
      typeName: layer,
      srsName: 'EPSG:4326'
    }, sourceParams);
    wfsURL.search = new URLSearchParams(wfsParams); 
    fetch(wfsURL).then(res => res.json()).then(res => LhLayer.addData(res));
    console.log(options);
    console.log(sourceParams);

    return LhLayer;
  };
});
