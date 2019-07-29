define(['leaflet', 'print.min', 'dom-to-image.min'], function (L, p, dom) {

  return function (basemap) {
    return L.control.browserPrint({
      title: 'Print map (Chrome only)',
      documentTitle: 'Leaflet map export',
      printLayer: basemap,
      closePopupsOnPrint: false,
      printModes: [L.control.browserPrint.mode.landscape()],
      manualMode: false
    });
  };
});

window.print = function () {
  return domtoimage
  .toPng(document.querySelector('.grid-print-container'))
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = 'exported-map.png';
    link.href = dataUrl;
    link.click();
  });
};
