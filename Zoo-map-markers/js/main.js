// Initialize the map
const map = L.map('map').setView([47.384845, 8.574230], 17);

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Fetch JSON data and populate the map and UI
fetch('./data/zoo_locations.json')
    .then(response => response.json())
    .then(data => {
        const locationList = document.getElementById('location-list');

        data.forEach(location => {
            // Add marker to the map
            const marker = L.marker([location.latitude, location.longitude])
                .addTo(map)
                .bindPopup(`<b>${location.name}</b><br>${location.description}`);

            // Add click event to the marker
            marker.on('click', () => {
                showLocationDetails(location);
            });

            // Create UI list item
            const locationItem = document.createElement('div');
            locationItem.className = 'location';
            locationItem.textContent = location.name;

            // Add click event to the list item
            locationItem.addEventListener('click', () => {
                map.setView([location.latitude, location.longitude], 18);
                marker.openPopup();
                showLocationDetails(location);
            });

            // Append to the location list
            locationList.appendChild(locationItem);
        });
    });

// Show location details in the info panel
function showLocationDetails(location) {
    const infoPanel = document.getElementById('info-panel');
    infoPanel.innerHTML = `
        <h2>${location.name}</h2>
        <p>${location.description}</p>
        <p><strong>Coordinates:</strong> ${location.latitude}, ${location.longitude}</p>
    `;
}
