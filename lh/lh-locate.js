define(['leaflet', 'lh-load-css', 'locate'], function (L, loadCss, locate) {

  // load css files required for the control
  loadCss("https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.67.0/dist/L.Control.Locate.min.css");
  loadCss("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

  // adds the locate control to the map
  return function () {
    return L.control.locate({
      position: 'topleft',
      strings: {
        title: "Move map to your current location"
      }
    });
  };
});
