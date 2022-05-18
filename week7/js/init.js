// original code
let mapOptions = {
    "mapCenter":[39.8283, -98.5795], 
    "zoomLevel": 4
};

// our Leaflet feature group layers waiting for content!
let travelagain = L.featureGroup();
let nottravelagain = L.featureGroup();
 
let layers = {
    "Will travel again": travelagain,
    "May not travel again": nottravelagain
}

let circleOptions = {
    radius: 6,
    fillColor: "#ff7800",
    color: "#acb8ec",
    weight: 5,
    opacity: 1,
    fillOpacity: 0.8
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTr6C3kG8rmylf1k4GzPFAS5ycwuUDwikXCoxEtk4usmvLla2gHeZkOLSmZu03XsWx76Q3kBnnke0YL/pub?output=csv"

// define the leaflet map
const map = L.map('the_map').setView(mapOptions.mapCenter, mapOptions.zoomLevel);

// add layer control box
L.control.layers(null,layers).addTo(map)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create icons
// var listIcon = L.icon({
//     iconUrl: 'upload/location.png',
//     iconSize: [25, 25],
//     iconAnchor: [0, 0],
//     popupAnchor: [0, 0],
// });

// var checkIcon = L.icon({
//     iconUrl: 'upload/luggage.png',
//     iconSize: [25, 25],
//     iconAnchor: [10, 10],
//     popupAnchor: [0, 0],
// });



// adding markers
 function add_Marker(data){
    if(data['Would you travel to the place that you would like to recommend again?'] == "Yes"){
        circleOptions.fillColor = "#728DE1"
        message = `<h2 class="spacing2">${data['New specific location of place you would suggest (ex: San Francisco, Los Angeles)']}</h2> <h3>${data['Describe why you would suggest this location to visit :)!!! (1-2 sentences)']}</h3> <h3 class="spacing2">(would love to come again))</h3`
        travelagain.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(message))
        createButtons(data)
    }
    else{
        circleOptions.fillColor = "blue"
        message = `<h2 class="spacing2">${data['New specific location of place you would suggest (ex: San Francisco, Los Angeles)']}</h2> <h3>${data['Describe why you would suggest this location to visit :)!!! (1-2 sentences)']}</h3> <h3 class="spacing2">(not sure if I will come again)</h3>`
        nottravelagain.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(message))
        createButtons(data)
    }
    return data
}

//  add_Marker(37.7749, -122.4194, '✿ San Francisco ✿', 'I studied in bay area for community college', 'upload/golden-gate-bridge.png')
//  add_Marker(47.6062, -122.3321, '✿ Seattle ✿', 'First station of my solo trip!', 'upload/space-needle.png')
//  add_Marker(41.8781, -87.6298, '✿ Chicago ✿', 'Second station of my solo trip!', 'upload/cloud-gate.png')
//  add_Marker(38.9072, -77.0369, '✿ Washington DC ✿', 'Third station of my solo trip!', 'upload/lincoln-memorial.png')
//  add_Marker(36.1699, -115.1398, '✿ Las Vegas ✿', 'Fourth station of my solo trip', 'upload/las-vegas.png')
//  add_Marker(25.7617, -80.1918, '✿ Miami ✿', 'I went miami for spring break with friends I met online', 'upload/cheers.png')
//  add_Marker(25.7907, -80.1300, '✿ Miami Beach ✿', 'I love sunbathing in miami', 'upload/vacations.png')
//  add_Marker(24.5554, -81.7842, '✿ Key West ✿', 'The road to keywest to STUNNING!', 'upload/ocean.png')
 
 // adding controls: scale
 L.control.scale().addTo(map);


 // create buttons
 function createButtons(data){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+data['New specific location of place you would suggest (ex: San Francisco, Los Angeles)']; 
    newButton.innerHTML = data['New specific location of place you would suggest (ex: San Francisco, Los Angeles)']; 
    newButton.setAttribute("lat",data.lat); 
    newButton.setAttribute("lng",data.lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([data.lat,data.lng]); 
    })
    const placeforbuttons = document.getElementById('placeForButtons')
    placeforbuttons.appendChild(newButton);
}

 // adding legend
 // var legend = L.control({position: 'bottomleft'});
 
//  legend.onAdd = function (map) {
 
//      var div = L.DomUtil.create('div', 'info legend'),
//          grades = ["Traveled", "Bucket list"],
//          labels = ["upload/luggage.png","upload/location.png"];
 
//      // loop through our density intervals and generate a label with a colored square for each interval
//      for (var i = 0; i < grades.length; i++) {
//          div.innerHTML +=
//              grades[i] + (" <img src="+ labels[i] +" height='15' width='15'>");
//      }
 
//      return div;
//  };
 
//  legend.addTo(map);
 
//  fetch("travelmap.geojson")
//      .then(response => {
//          return response.json()
//      })
//      .then(data =>{
         
//          createButtons(data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0], `✿ ${data.features[0].properties.attraction} ✿`, "upload/hawaii.png")
//          createButtons(data.features[1].geometry.coordinates[1], data.features[1].geometry.coordinates[0], `✿ ${data.features[1].properties.attraction} ✿`, "upload/statue-of-liberty.png")
//          createButtons(data.features[2].geometry.coordinates[1], data.features[2].geometry.coordinates[0], `✿ ${data.features[2].properties.attraction} ✿`, "upload/cuba.png")
//          createButtons(data.features[3].geometry.coordinates[1], data.features[3].geometry.coordinates[0], `✿ ${data.features[3].properties.attraction} ✿`, "upload/leaf.png")
//          createButtons(data.features[4].geometry.coordinates[1], data.features[4].geometry.coordinates[0], `✿ ${data.features[4].properties.attraction} ✿`, "upload/fuji-mountain.png")
//          createButtons(data.features[5].geometry.coordinates[1], data.features[5].geometry.coordinates[0], `✿ ${data.features[5].properties.attraction} ✿`, "upload/gwanghwamun.png")
//          createButtons(data.features[6].geometry.coordinates[1], data.features[6].geometry.coordinates[0], `✿ ${data.features[6].properties.attraction} ✿`, "upload/pyramids.png")
         
//          L.geoJSON(data, {
//                  pointToLayer: (feature, latlng) => { 
//                      return L.marker(latlng, {icon: listIcon})
//                  }
//              }).bindPopup(layer => {
//                  return `<h2 class="spacing2"> ✿ ${layer.feature.properties.attraction} ✿</h2> <h3>${layer.feature.properties.description}</h3> <img class="addcenter" src=${layer.feature.properties.img}>`;
//              }).addTo(map);
//      })

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        add_Marker(data)
    })
    travelagain.addTo(map) // add our layers after markers have been made
    nottravelagain.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([travelagain,nottravelagain]);
    map.fitBounds(allLayers.getBounds());
}

// this is our function call to get the data
loadData(dataUrl)