// original code
const map = L.map('the_map').setView([39.8283, -98.5795], 4.8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// adding markers

function add_circleMarker(lat, lng, popup){
    let marker = L.circleMarker([lat, lng], 
        {"radius": 4, "color": "#FD3A4A", "weight": 3, "opacity": 1})
    marker.addTo(map);
    
        // .bindPopup(popup)
        // .openPopup();
}

add_circleMarker(37.7749, -122.4194, 'San Francisco')
add_circleMarker(47.6062, -122.3321, 'Seattle')
add_circleMarker(41.8781, -87.6298, 'Chicago')
add_circleMarker(38.9072, -77.0369, 'Washington DC')
add_circleMarker(36.1699, -115.1398, 'Las Vegas')
add_circleMarker(25.7617, -80.1918, 'Miami')
add_circleMarker(25.7907, -80.1300, 'Miami Beach')
add_circleMarker(24.5554, -81.7842, 'Key West')

// adding controls: scale
L.control.scale().addTo(map);