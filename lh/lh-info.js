define(['leaflet', 'info'], function (L, info) {

  // adds the info control to the map
  return function (options) {
    var LhInfo = L.Control.info($.extend({
      position: 'topleft',
      content: 'test'
    }, options));

    return LhInfo;
  };
});
