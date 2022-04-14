// original code
const map = L.map('the_map').setView([39.8283, -98.5795], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// adding markers

function add_circleMarker(lat, lng, placename, popup, photoname){
    L.circleMarker([lat, lng], {"radius": 4, "color": "#91a0e6", "weight": 3, "opacity": 1}).addTo(map).bindPopup(`<h2 class="spacing2">${placename}</h2> 
    <h3>${popup}</h3><img class="addborderandcenter" src=${photoname}>`)
}

add_circleMarker(37.7749, -122.4194, '✿ San Francisco ✿', 'I studied in bay area for community college', 'sf.png')
add_circleMarker(47.6062, -122.3321, '✿ Seattle ✿', 'First station of my solo trip!', 'seattle.png')
add_circleMarker(41.8781, -87.6298, '✿ Chicago ✿', 'Second station of my solo trip!','chicago.png')
add_circleMarker(38.9072, -77.0369, '✿ Washington DC ✿', 'Third station of my solo trip!','washingtonDC.png')
add_circleMarker(36.1699, -115.1398, '✿ Las Vegas ✿', 'Fourth station of my solo trip','lasvegas.png')
add_circleMarker(25.7617, -80.1918, '✿ Miami ✿', 'I went miami for spring break wirh friends I met online','miami.png')
add_circleMarker(25.7907, -80.1300, '✿ Miami Beach ✿', 'I love sunbathing in miami','miamibeach.png')
add_circleMarker(24.5554, -81.7842, '✿ Key West ✿', 'The road to keywest to STUNNING!','keywest.png')

// adding controls: scale
L.control.scale().addTo(map);