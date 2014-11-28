L.mapbox.accessToken = 'pk.eyJ1IjoibGlmZXdpbm5pbmciLCJhIjoiYWZyWnFjMCJ9.ksAPTz72HyEjF2AOMbRNvg';
var map = L.mapbox.map('map', 'lifewinning.ip7d4kdk', {minZoom:2,zoomControl: false })
    .setView([0,0],2);

var layers = document.getElementById('map-ui');
// layers
var nogchq_layer = new L.FeatureGroup();
var isgchq_layer = new L.FeatureGroup();


new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);
// layer toggle 

addLayer(nogchq_layer, 'orange', "Click To See Only Cables In GCHQ Documents", 0);
addLayer(isgchq_layer, 'gray', "Click To See Only Cables Not In GCHQ Documents", 1);

function addLayer(layer, id, name, zIndex) {
    layer
        .setZIndex(zIndex)
        .addTo(map);

    // Create a simple layer switcher that
    // toggles layers on and off.
    var item = document.createElement('li');
        item.id = id;
        link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.innerHTML = name;
        item.className= 'nav';
        link.href = '#';
        link.id=id;
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

// function clickFeature (e, layer){
//   var cable = e.target;
//   map.fitBounds(layer.GetBounds()); 
// }
$.getJSON("./data/joined_nogchq.geojson", function(data) {
    var nogchq = L.geoJson(data, {style: nogchq_style});
    nogchq.addTo(nogchq_layer);
  });

$.getJSON("./data/joined_isgchq.geojson", function(data) {
    var gchq = L.geoJson(data, {
      style: gchq_style,
      onEachFeature: function (feature, layer) {
        //hacky way to present program associations
        var names = [
            { feat: feature.properties.uk, name: 'UK'},
            { feat: feature.properties.dacron, name: ' DACRON'  },
            { feat: feature.properties.remedy, name: ' REMEDY' },
            { feat: feature.properties.pinnage, name: ' PINNAGE' },
            { feat: feature.properties.street_car, name: ' STREET CAR' },
            { feat: feature.properties.gerontic, 'name': ' GERONTIC' },
            { feat: feature.properties.vitreous, name: ' VITREOUS'},
            { feat: feature.properties.little, name: ' LITTLE'}
           ];
        var programs = [];
        for (var i = 0; i < names.length; i++) {
          if (names[i].feat != ''){ programs.push(names[i].name)};
        };
        layer.bindPopup('<h3>'+feature.properties.name+'</h3><hr><b>Owners: </b>'+feature.properties.owners+'<hr><b>Associated GCHQ Programs: </b><br>'+ programs)
      }
    });
    gchq.addTo(isgchq_layer);
  });