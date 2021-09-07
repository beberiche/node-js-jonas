/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmViZXJpY2hlIiwiYSI6ImNrc3p5OW9zNzAwMTYyb3FvNmFyOGR4bDYifQ.NuyG-EHtaoNXgQls81YCdw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/beberiche/ckt02t12q13px17rvd7h79oik',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();
  const nav = new mapboxgl.NavigationControl();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'top',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      // offset: 30,
      closeOnClick: false,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 200,
      left: 100,
      right: 100,
    },
  });

  map.addControl(nav, 'top-right');
};
