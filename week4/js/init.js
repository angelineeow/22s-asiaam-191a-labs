// original code
let mapOptions = {
    "mapCenter":[39.8283, -98.5795], 
    "zoomLevel": 4
};
 
const map = L.map('the_map').setView(mapOptions.mapCenter, mapOptions.zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create icons
var listIcon = L.icon({
    iconUrl: 'upload/location.png',
    iconSize: [25, 25],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
});

var checkIcon = L.icon({
    iconUrl: 'upload/luggage.png',
    iconSize: [25, 25],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
});

// adding markers
function add_Marker(lat, lng, placename, popup, photoname, icon){
    message = `<h2 class="spacing2">${placename}</h2> <h3>${popup}</h3><img class="addborderandcenter" src=${photoname}>`
    L.marker([lat, lng], {icon: checkIcon}).addTo(map).bindPopup(message)
    createButtons(lat,lng, placename, icon); 
    return message;
}

add_Marker(37.7749, -122.4194, '✿ San Francisco ✿', 'I studied in bay area for community college', 'upload/sf.png', 'upload/golden-gate-bridge.png')
add_Marker(47.6062, -122.3321, '✿ Seattle ✿', 'First station of my solo trip!', 'upload/seattle.png', 'upload/space-needle.png')
add_Marker(41.8781, -87.6298, '✿ Chicago ✿', 'Second station of my solo trip!','upload/chicago.png', 'upload/cloud-gate.png')
add_Marker(38.9072, -77.0369, '✿ Washington DC ✿', 'Third station of my solo trip!','upload/washingtonDC.png', 'upload/lincoln-memorial.png')
add_Marker(36.1699, -115.1398, '✿ Las Vegas ✿', 'Fourth station of my solo trip','upload/lasvegas.png', 'upload/las-vegas.png')
add_Marker(25.7617, -80.1918, '✿ Miami ✿', 'I went miami for spring break with friends I met online','upload/miami.png', 'upload/cheers.png')
add_Marker(25.7907, -80.1300, '✿ Miami Beach ✿', 'I love sunbathing in miami','upload/miamibeach.png', 'upload/vacations.png')
add_Marker(24.5554, -81.7842, '✿ Key West ✿', 'The road to keywest to STUNNING!','upload/keywest.png', 'upload/ocean.png')

// adding controls: scale
L.control.scale().addTo(map);

// create buttons
function createButtons(lat, lng, title, icon){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title + `<img class="small" src=${icon}>`; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.getElementById("contents").appendChild(newButton);
}

// adding legend
var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["Traveled", "Bucket list"],
        labels = ["upload/luggage.png","upload/location.png"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            grades[i] + (" <img src="+ labels[i] +" height='15' width='15'>");
    }

    return div;
};

legend.addTo(map);

fetch("travelmap.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        
        createButtons(data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0], `✿ ${data.features[0].properties.attraction} ✿`, "upload/hawaii.png")
        createButtons(data.features[1].geometry.coordinates[1], data.features[1].geometry.coordinates[0], `✿ ${data.features[1].properties.attraction} ✿`, "upload/statue-of-liberty.png")
        createButtons(data.features[2].geometry.coordinates[1], data.features[2].geometry.coordinates[0], `✿ ${data.features[2].properties.attraction} ✿`, "upload/cuba.png")
        createButtons(data.features[3].geometry.coordinates[1], data.features[3].geometry.coordinates[0], `✿ ${data.features[3].properties.attraction} ✿`, "upload/leaf.png")
        createButtons(data.features[4].geometry.coordinates[1], data.features[4].geometry.coordinates[0], `✿ ${data.features[4].properties.attraction} ✿`, "upload/fuji-mountain.png")
        createButtons(data.features[5].geometry.coordinates[1], data.features[5].geometry.coordinates[0], `✿ ${data.features[5].properties.attraction} ✿`, "upload/gwanghwamun.png")
        createButtons(data.features[6].geometry.coordinates[1], data.features[6].geometry.coordinates[0], `✿ ${data.features[6].properties.attraction} ✿`, "upload/pyramids.png")
        
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    return L.marker(latlng, {icon: listIcon})
                }
            }).bindPopup(layer => {
                return `<h2 class="spacing2"> ✿ ${layer.feature.properties.attraction} ✿</h2> <h3>${layer.feature.properties.description}</h3> <img class="addcenter" src=${layer.feature.properties.img}>`;
            }).addTo(map);
    })