import bbox from '@turf/bbox';
import { FeatureCollection } from 'geojson';
import mapboxgl, { MapboxMap } from 'mapbox-gl';

let map: MapboxMap;
const token = 'pk.eyJ1IjoieWFnbyIsImEiOiJQaW1oanlrIn0.wyTDa-iIpoaRCRNd8oSHxQ';
const markerBase = 'https://a.tiles.mapbox.com/v4/marker/pin';
const defaultMarker = {
  default: `${markerBase}-l+1d4ed8.png?access_token=${token}`,
};

let data: FeatureCollection;

document.addEventListener('filtersUpdated', e => {
  data = {
    type: 'FeatureCollection',
    features: e.detail.filteredData.map(i => ({
      type: 'Feature',
      properties: {
        'marker-color': '#272E00',
        'marker-symbol':
          i.data.category === 'Histoire' ? 'castle' : 'park-alt1',
        icon: `large${
          i.data.category === 'Histoire' ? 'castle' : 'park-alt1'
        }#272E00`,
        title: i.data.title,
        slug: i.slug,
      },
      geometry: {
        type: 'Point',
        coordinates: i.data.coordinates,
      },
    })),
  };

  document.dispatchEvent(new CustomEvent('updateMap'));
});

const initMarkers = (geojson, cb: () => void) => {
  const markers = geojson?.features?.reduce((acc, val) => {
    if (val.properties?.['marker-color'] !== undefined) {
      const color = val.properties['marker-color'];
      const size = 'large'; // val.properties['marker-size'];
      const symbol = val.properties['marker-symbol'];
      const image = `${markerBase}-${size.slice(0, 1)}-${symbol}+${color.slice(
        1
      )}.png?access_token=${token}`;
      const key = size + symbol + color;
      if (acc[key] === undefined) acc[key] = image;
    }
    return acc;
  }, defaultMarker);

  if (markers !== undefined) {
    Object.keys(markers).forEach((key, i) => {
      map?.loadImage(markers[key], (error, image) => {
        if (error) throw error;
        if (image !== undefined && !map?.hasImage(key))
          map?.addImage(key ?? 'marker', image);
        if (i === Object.keys(markers).length - 1) cb();
      });
    });
  }
};

const initMap = async () => {
  mapboxgl.accessToken = token;

  map = new mapboxgl.Map({
    center: [7.01867, 46.54843],
    zoom: 9,
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
  });

  const updateSource = geojson => {
    if (geojson !== undefined) {
      // Clean before refreshing items
      if (map.getSource('items') !== undefined) {
        map.removeLayer('points');
        map.removeSource('items');
      }

      map.addSource('items', { type: 'geojson', data });
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'items',
        layout: {
          'icon-image': ['get', 'icon'],
          'icon-allow-overlap': true,
          'text-allow-overlap': true,
          'symbol-z-order': 'viewport-y',
          'icon-size': 0.8,
        },
      });
    }
  };

  map.addControl(new mapboxgl.NavigationControl());

  map.on('load', async () => {
    if (data !== null) {
      initMarkers(data, () => {
        const [minLat, minLng, maxLat, maxLng] = bbox(data);
        map.fitBounds([
          [minLat, minLng],
          [maxLat, maxLng],
        ]);
        updateSource(data);
      });
    }

    document.addEventListener('updateMap', () => {
      initMarkers(data, () => {
        const [minLat, minLng, maxLat, maxLng] = bbox(data);
        map.fitBounds([
          [minLat, minLng],
          [maxLat, maxLng],
        ]);
        updateSource(data);
      });
    });
  });

  map.on('click', 'points', e => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const { title } = e.features[0].properties;
    const { slug } = e.features[0].properties;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup({ offset: [0, -40] })
      .setLngLat(coordinates)
      .setHTML(
        `
        <a href='${`/balades/${slug}`}' class="hover:!underline underline-offset-4 decoration-2">
          <h3 class="w-10/12 font-serif text-lg font-bold leading-tight">
            ${title}
          </h3>
         </a>
      `
      )
      .addTo(map);
  });

  map.on('mouseenter', 'places', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'places', () => {
    map.getCanvas().style.cursor = '';
  });
};

initMap();
