// Creating map object
var myMap = L.map("mapid", {
  center: [50.0522, -120.2437],
  zoom: 3.5
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


d3.json(url).then(function (response) {

  // console.log(response.features);

  // console.log(response.features[1].properties.mag);

  for (var i = 0; i < response.features.length; i++) {
    var location = response.features[i];

    var color = "";

    if (location.geometry.coordinates[2] > 90) {
      color = "purple";
    }
    else if (location.geometry.coordinates[2] > 70) {
      color = "red";
    }
    else if (location.geometry.coordinates[2] > 50) {
      color = "orange";
    }
    else if (location.geometry.coordinates[2] > 30) {
      color = "yellow";
    }
    else if (location.geometry.coordinates[2] > 10) {
      color = "#ccff33";
    }
    else {
      color = "green";
    }


    if (location) {
      L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], {
        radius: markerSize(location.properties.mag),
        color: color,
        fillcolor: color
      }).addTo(myMap);
    }


  };

  // var legend = L.control({ position: "bottomright" });
  // legend.onAdd = function () {
  //   var div = L.DomUtil.create("div", "info legend");
  //   var limits = location;
  //   var labels = [];

  //   // Add min & max
  //   var legendInfo = "<h1>Median Income</h1>" +
  //     "<div class=\"labels\">" +
  //     "<div class=\"min\">" + limits + "</div>" +
  //     "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  //     "</div>";

  //   div.innerHTML = legendInfo;

  //   limits.forEach(function (limit, index) {
  //     labels.push("<li style=\"background-color: " + color + "\"></li>");
  //   });

  //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //   return div;
  // };

  // legend.addTo(myMap);

});
