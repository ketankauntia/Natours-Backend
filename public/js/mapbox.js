/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiY29kZWd1eWtldGFuIiwiYSI6ImNrdjE4Y3R0eDBlY28yb3BueWxuZzczZnUifQ.lzHG5YHjmIkug9F8g4LYRw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/codeguyketan/ckv18sr0f2js114o9bynrm1m9',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 4,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day} ${loc.description}</p>`)
      .addTo(map);

    //Extends map bouunds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
