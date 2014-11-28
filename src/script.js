L.mapbox.accessToken = 'pk.eyJ1IjoibGlmZXdpbm5pbmciLCJhIjoiYWZyWnFjMCJ9.ksAPTz72HyEjF2AOMbRNvg';
var map = L.mapbox.map('map', 'lifewinning.ip7d4kdk', {minZoom:2,zoomControl: false })
    .setView([0,0],2);

var layers = document.getElementById('map-ui');
// layers
var nogchq_layer = new L.FeatureGroup();
var landing_points = new L.FeatureGroup();
var isgchq_layer = new L.FeatureGroup();


new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);
// layer toggle 

addLayer(nogchq_layer, 'gray', "Not In GCHQ Documents", 0);
addLayer(isgchq_layer, 'orange', "In GCHQ Documents", 1);
addLayer(landing_points, 'gray', "Landing Points", 2);


function addLayer(layer, id, name, zIndex) {
    layer
        .setZIndex(zIndex)
        .addTo(map);

    var item = document.createElement('li');
        item.className= id;
        check = document.createElement('input');
        check.type = 'checkbox';
        check.checked='checked';
        txt = document.createElement('span');
        txt.innerHTML = name;

    check.onclick = function(e) {
        //e.preventDefault();
        //e.stopPropagation();
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            e.check.checked = ''
        } else {
            map.addLayer(layer);
            e.check.checked='checked';
        }
    };
    item.appendChild(check);
    item.appendChild(txt);
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

var landingPoints_style = {
    "fillColor": "#fff",
    "radius": 2,
    "color": "#aaa",
    "weight": 1,
    "opacity": 1,
    "fillOpacity": 1
}
    
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
$.getJSON("./data/landing_points.geojson", function(data){
      var landingPoints = L.geoJson(data, {
          onEachFeature: function (feature, layer){
            layer.bindPopup('<b>'+feature.properties.name+'</b>')
          },
          pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, landingPoints_style)}
      });
    landingPoints.addTo(landing_points);
});

