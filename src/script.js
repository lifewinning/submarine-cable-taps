L.mapbox.accessToken = 'pk.eyJ1IjoibGlmZXdpbm5pbmciLCJhIjoiYWZyWnFjMCJ9.ksAPTz72HyEjF2AOMbRNvg';
var map = L.mapbox.map('map', 'lifewinning.ip7d4kdk')
    .setView([0,0], 2);

var nogchq_style = {
    "color": "#ccc",
    "weight": 1.5,
    "opacity": 0.5
};

var gchq_style = {
    "color": "#F29161",
    "weight": 2.5,
    "opacity": 1
};

 $.getJSON("./data/joined_nogchq.geojson", function(data) {
    var nogchq = L.geoJson(data, {
      style: nogchq_style,
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
      }
    });
    nogchq.addTo(map);
  });

$.getJSON("./data/joined_isgchq.geojson", function(data) {
    var gchq = L.geoJson(data, {
      style: gchq_style,
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
      }
    });
    gchq.addTo(map);
  });