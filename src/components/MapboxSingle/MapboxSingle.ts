import mapboxgl from 'mapbox-gl';

const mapLayers = document.getElementById('map-layers');
const config = JSON.parse(document.getElementById('map').dataset.config);

let data;
const styles = {
  topo: {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'https://wmts20.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',
        ],
        tileSize: 256,
        attribution: 'Map tiles by Swisstopo',
      },
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 22,
      },
    ],
  },
  satelite:
    'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte-imagery.vt/style.json',
  vector:
    'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json',
};

const initMap = async () => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoieWFnbyIsImEiOiJQaW1oanlrIn0.wyTDa-iIpoaRCRNd8oSHxQ';

  const map = new mapboxgl.Map({
    ...config,
    container: 'map',
    style: styles.vector,
    boxZoom: false,
    bearingSnap: 0,
  });

  const setSources = () => {
    if (map.getStyle().glyphs !== undefined) {
      if (map.getSource('mapbox-dem') === undefined) {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        });
      }
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1 });
      map.dragRotate.enable();
    } else {
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 0 });
      map.setBearing(0);
      map.setPitch(0);
      map.dragRotate.disable();
    }

    if (map.getSource('route') === undefined && data !== undefined) {
      map.addSource('route', { type: 'geojson', data });
    }

    if (
      map.getSource('route') !== undefined &&
      map.getLayer('line') === undefined
    ) {
      map.addLayer({
        id: 'line',
        type: 'line',
        source: 'route',
        layout: {},
        paint: {
          'line-color': '#FF8300',
          'line-width': 3,
        },
      });
    }
  };

  map.addControl(new mapboxgl.NavigationControl());

  map.on('style.load', async () => {
    setSources();
  });

  map.on('load', async () => {
    const buttons = mapLayers.querySelectorAll('button');
    buttons.forEach(mapLayer => {
      mapLayer.addEventListener('click', () => {
        map.setStyle(styles[mapLayer.dataset.target]);
        buttons.forEach(i => {
          i.classList.remove('z-50');
        });
        mapLayer.classList.add('z-50');
      });
    });

    const dataPath = document.getElementById('map').dataset.path;
    data = await fetch(dataPath).then(res => res.json());
    setSources();
  });

  map.on('moveend', () => {
    console.log('center', [map.getCenter().lng, map.getCenter().lat]);
    console.log('bearing', Math.round(map.getBearing()));
    console.log('pitch', Math.round(map.getPitch()));
    console.log('zoomd', map.getZoom());
  });
};

initMap();
