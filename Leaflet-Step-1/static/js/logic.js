// Creating map object
var myMap = L.map("mapid", {
    center: [34.0522, -118.2437],
    zoom: 3
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }).addTo(myMap);
  
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function markerSize(mag) {
  return mag * 10000;
}



d3.json(url).then(function(response) {

  console.log(response.features[1].geometry);

  console.log(response.features[1].properties.mag);

  for (var i = 0; i < response.features.length; i++) {
    var location = response.features[i];

    if (location) {
      L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]],{
        color:"yellow",
        fillcolor: "black",
        fillopacity: 1.00,
        radius: markerSize(location.properties.mag)}).addTo(myMap);
    }
  }

});
