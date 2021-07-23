define(['leaflet', 'jquery'], function (L, $) {

  var LhSearch = L.Control.extend({
    options: {
      position: 'topright',
      popupContent: function (data) { return 'Not set' }
    },
  
    onAdd: function (map) {
      this._map = map;
      this._popup  = L.popup({ autoPan: true, maxWidth: 200 }).setContent('Start searching above!');
  
      this._container = L.DomUtil.create('div', 'search-control');
      this._form = L.DomUtil.create('form', 'search-form', this._container);
  
      this._form.innerHTML = '<div class="input-group">' +
        '<input id="address-search" class="form-control form-control-lg" type="search" placeholder="Address or APN" />' +
        '<div class="input-group-append"><button class="btn btn-primary btn-lg" type="submit">&raquo;</button></div>' +
        '</div>';
  
      L.DomEvent.on(this._form, 'submit', this._search, this);
  
      L.DomEvent.disableClickPropagation(this._container);
  
      return this._container;
    },
  
    _search: function (e) {
      L.DomEvent.stop(e);

      var searchUrl = this.options.searchUrl;
      if (!searchUrl) {
        if ($('#address-search').val().match(/^[0-9- ]+$/)) {
          searchUrl = 'https://ggcity.org/maps/api/parcels/info';
          this.options.popupContent = function (data) { return data.parcel_apn };
        } else {
          searchUrl = 'https://ggcity.org/maps/api/addresses/info';
          this.options.popupContent = function (data) { return data.address };
        }
      }
      
      if ($('#address-search').val() == '') return;
  
      if (screen.width < 768) {
        $('#address-search').blur();
      } else {
        $('#address-search').select();
      }
      $.get(
        searchUrl, 
        { q: $('#address-search').val() },
        $.proxy(this._process_results, this)
      );
    },
  
    _process_results: function (data) {
      if (data.latitude === undefined) {
        alert("We weren't able to find your address. Please try again or give us a call!");
        return;
      }
  
      var popupContent = '<div style="text-align: center; font-size: 1.1em;">' + this.options.popupContent(data) + '</div>';
      if (this.options.popupContent) {
        if (typeof this.options.popupContent === 'function') {
          popupContent = this.options.popupContent.call(null, data);
        }
      }
  
      var latlng = L.latLng(data.latitude, data.longitude);
  
      if (this._marker === undefined) {
        this._marker = L.marker(latlng);
        this._marker.addTo(this._map);
        this._marker.bindPopup(this._popup);
      }
  
      this._popup.setContent(popupContent);
      this._marker.setLatLng(latlng).openPopup();
  
      this._map.setView(latlng, 18);
    }
  });

  return function (options) {
    return new LhSearch(options);
  };
});
