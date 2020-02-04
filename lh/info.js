(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
        // Browser globals
        if (typeof window.L === 'undefined') {
            throw new Error('Leaflet must be loaded first');
        }
        factory(window.L);
    }
}(function (L) {
    L.Control.InfoControl = L.Control.extend({
        initialize: function (options) {
            "use strict";
            L.Util.setOptions(this, options);
        },
        onAdd: function () {
            "use strict";
            var container = L.DomUtil.create("div", "info-control leaflet-control");
            container.innerHTML = this.options.content;
            return container;
        },
        getContent: function () {
            "use strict";
            return this.getContainer().innerHTML;
        },
        setContent: function (html) {
            "use strict";
            this.getContainer().innerHTML = html;
        }
    });
    
    L.Control.info = function (options) {
        return new L.Control.InfoControl(options);
    };
}));
