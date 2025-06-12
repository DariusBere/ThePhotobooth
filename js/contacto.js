document.addEventListener('DOMContentLoaded', () => {
    // Coordenadas del estudio
    const studioCoords = [37.9985097, -1.1472293];

    // Inicializar mapa centrado en el estudio
    const map = L.map('map').setView(studioCoords, 13);

    // Capa OSM
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Marcador del estudio
    L.marker(studioCoords).addTo(map)
        .bindPopup('The Photo Booth<br>Av. Reyes Católicos, 36<br>30009 Murcia')
        .openPopup();

    // Intentar geolocalizar al usuario y trazar ruta
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const userCoords = [pos.coords.latitude, pos.coords.longitude];

        // Control de ruta
        let routingControl = L.Routing.control({
          waypoints: [ L.latLng(userCoords), L.latLng(studioCoords)] ,
          routeWhileDragging: false,
          fitSelectedRoute: false,
          router: L.Routing.osrmv1({
            serviceUrl: 'https://routing.openstreetmap.de/routed-car/route/v1'
          }),
          lineOptions: {
            styles: [{ color: '#ff6f61', weight: 5 }]
          },
          createMarker:(i, waypoint) => L.marker(waypoint.latLng)
        }).addTo(map);

        routingControl.on('routesfound', e => {
            const route = e.routes[0];
            const bounds = L.latLngBounds(route.coordinates);
            map.fitBounds(bounds, { padding: [50,50] });
        });

      }, () => {
        alert('No se pudo obtener tu ubicación.');
      });
    } else {
      alert('Tu navegador no soporta Geolocalización.');
    }
});