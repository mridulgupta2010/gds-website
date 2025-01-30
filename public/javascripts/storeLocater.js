let map;
let infoWindow;
let originMarker;
let markers = [];

function initMap() {
    // Create the map with initial settings
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 0,
        center: { lat: -26.09293, lng: 134.9437842 }
    });
    infoWindow = new google.maps.InfoWindow();

    // Define the custom marker icons, using the store's "category".
    map.data.setStyle((feature) => {
        return {
          icon: {
            url: `images/logo/nice_logo.png`,
            scaledSize: new google.maps.Size(40, 40),
          },
        };
      });
    
    // Setup autocomplete functionality
    setupAutocomplete();
}

function setupAutocomplete() {
    const input = document.getElementById('search-location');
    const options = {
        types: ['geocode'],
        componentRestrictions: { country: 'au' }
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.setFields(['address_components', 'geometry', 'name']);

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No address available for input: '" + place.name + "'");
            return;
        }

        updateMapCenter(place.geometry.location);
        fetchAndDisplayStores(place.geometry.location);
    });
}

function updateMapCenter(location) {
    map.setCenter(location);
    map.setZoom(12);  // Update zoom level for closer view
    if (!originMarker) {
        originMarker = new google.maps.Marker({
            map: map,
            position: location,
            visible: true
        });
    } else {
        originMarker.setPosition(location);
        originMarker.setVisible(true);
    }
}

async function fetchAndDisplayStores(location) {
    const storeType = document.getElementById('store-type').value;  // Assuming you have a dropdown for store types
    const serviceOffering = document.getElementById('service-offering').value;  // Assuming you have a dropdown for services

    try {
        const response = await fetch(`/api/stores?lat=${location.lat()}&lng=${location.lng()}&storeType=${storeType}&serviceOffering=${serviceOffering}`);
        const stores = await response.json();
        displayStores(stores);
        addMarkersToMap(stores);
    } catch (error) {
        console.error('Failed to fetch stores:', error);
    }
}

function displayStores(stores) {
    const listDiv = document.getElementById('store-list');
    listDiv.innerHTML = '';  // Clear existing list
    stores.forEach(store => {
        const entry = document.createElement('div');
        entry.textContent = `${store.name} - ${store.distance} km away`;
        listDiv.appendChild(entry);
    });
}

function addMarkersToMap(stores) {
    clearMarkers();
    stores.forEach(store => {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(store.latitude, store.longitude),
            map: map,
            title: store.name
        });
        markers.push(marker);  // Add to global markers array

        // Optional: Add click listener to markers
        marker.addListener('click', () => {
            if (infoWindow) infoWindow.close();
            infoWindow.setContent(`<strong>${store.name}</strong><br>${store.description}`);
            infoWindow.open(map, marker);
        });
    });
}

function clearMarkers() {
    for (let marker of markers) {
        marker.setMap(null);
    }
    markers = [];
}

document.addEventListener('DOMContentLoaded', initMap);