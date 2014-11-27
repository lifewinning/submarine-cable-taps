L.mapbox.accessToken = 'pk.eyJ1IjoibGlmZXdpbm5pbmciLCJhIjoiYWZyWnFjMCJ9.ksAPTz72HyEjF2AOMbRNvg';
var map = L.mapbox.map('map', 'lifewinning.ip7d4kdk', { zoomControl: false })
    .setView([0,0],2);

var layers = document.getElementById('map-ui');
// layers
var nogchq_layer = new L.FeatureGroup();
var isgchq_layer = new L.FeatureGroup();


new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);
// layer toggle 

addLayer(nogchq_layer, "Not In GCHQ Documents", 0);
addLayer(isgchq_layer,"Listed in GCHQ Documents", 1);

function addLayer(layer, name, zIndex) {
    layer
        .setZIndex(zIndex)
        .addTo(map);

    // Create a simple layer switcher that
    // toggles layers on and off.
    var item = document.createElement('li');
        link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.innerHTML = name;
        item.className= 'nav';
        link.href = '#';
        link.innerHTML = name;

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = 'nav clearfix';
        } else {
            map.addLayer(layer);
            this.className = 'nav active clearfix';
        }
    };
    item.appendChild(link);
    layers.appendChild(item);

}

var nogchq_style = {
    "color": "#ccc",
    "weight": 1,
    "opacity": 0.5
};

var gchq_style = {
    "color": "#FF9900",
    "weight": 1,
    "opacity": 1
};

var gchq_hover = {
    "color": "#FF9900",
    "weight": 3,
    "opacity": 1
};

$.getJSON("./data/joined_nogchq.geojson", function(data) {
    var nogchq = L.geoJson(data, {style: nogchq_style});
    nogchq.addTo(nogchq_layer);
  });

$.getJSON("./data/joined_isgchq.geojson", function(data) {
    var gchq = L.geoJson(data, {
      style: gchq_style,
      onEachFeature: function (feature, layer) {
        layer.bindPopup('<h3>'+feature.properties.name+'</h3><hr><b>Owners: </b>'+feature.properties.owners+'<hr><h4>Which Program?</h4>');
      }
    });
    gchq.addTo(isgchq_layer);
  });

