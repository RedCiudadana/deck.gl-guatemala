import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { GeoJsonLayer, ScatterplotLayer, IconLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import Tabletop from "tabletop";

const publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/14djg1dVb6M7uCC1W6PSaB4JTNbUURa7oveO3IPsd1Ek/edit?usp=sharing";

const googleMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      },
      {
        weight: 2
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "road.local",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70"
      }
    ]
  }
];

const ICON_MAPPING = {
  zoom: { x: 0, y: 0, width: 200, height: 200, mask: false },
  institution: { x: 200, y: 0, width: 200, height: 200, mask: false }
};

const icon = sourceData =>
  new IconLayer({
    id: "icon-layer",
    data: sourceData,
    pickable: true,
    // iconAtlas and iconMapping are required
    // getIcon: return a string
    iconAtlas: "img/icons/global.png",
    iconMapping: ICON_MAPPING,
    getIcon: d => d.type,
    sizeScale: 10,
    sizeMinPixels: 40,
    sizeMaxPixels: 80,
    getPosition: d => {
      console.log([d.longitude, d.latitude]);
      return [d.longitude, d.latitude];
    },
    getSize: d => 10,
    onHover: ({ object, x, y }) => {
      const el = document.getElementById("tooltip");
      if (object) {
        el.innerHTML = `${object.info}`;
        el.style.display = "block";
        el.style.opacity = 0.9;
        el.style.left = x + "px";
        el.style.top = y + "px";
      } else {
        el.style.opacity = 0.0;
      }
    }
    // getColor: d => [0, 140, 0],
  });

const scatterplot = sourceData =>
  new ScatterplotLayer({
    id: "scatter",
    data: sourceData,
    opacity: 0.95,
    filled: true,
    radiusMinPixels: 4,
    radiusMaxPixels: 10,
    getPosition: d => [d.longitude, d.latitude],
    getFillColor: d => (d.victim > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100])

    // pickable: true,
    // onHover: ({ object, x, y }) => {
    //   const el = document.getElementById("tooltip");
    //   if (object) {
    //     const { status, number } = object;
    //     el.innerHTML = `<h1>Información aquí</h1><p>Descripcion como van</p>`;
    //     el.style.display = "block";
    //     el.style.opacity = 0.9;
    //     el.style.left = x + "px";
    //     el.style.top = y + "px";
    //   } else {
    //     el.style.opacity = 0.0;
    //   }
    // },

    // onClick: ({ object, x, y }) => {
    //   window.open(`https://redciudadana.org/`);
    // }
  });

const heatmap = sourceData =>
  new HeatmapLayer({
    id: "heat",
    data: sourceData,
    getPosition: d => [d.longitude, d.latitude],
    getWeight: d => d.victim,
    radiusPixels: 10
  });

const hexagon = sourceData =>
  new HexagonLayer({
    id: "hex",
    data: sourceData,
    getPosition: d => [d.longitude, d.latitude],
    getElevationWeight: d => d.victim * 1,
    elevationScale: 100,
    extruded: true,
    radius: 1609,
    opacity: 0.6,
    coverage: 0.88,
    lowerPercentile: 50
  });

window.initMap = () => {
  console.log("Download data");
  Tabletop.init({
    key: publicSpreadsheetUrl,
    simpleSheet: true
  }).then(dataSource => {
    console.log("Creating map");

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 14.61, lng: -90.51 },
      zoom: 8,
      // styles: googleMapStyle,
      bearing: -27.396674584323023
    });

    console.log("Processing data");

    dataSource = dataSource.map(d => {
      d.latitude = parseFloat(d.latitude);
      d.longitude = parseFloat(d.longitude);
      d.victim = parseFloat(d.victim);

      return d;
    });

    console.log("Loading data");

    const overlay = new GoogleMapsOverlay({
      layers: []
    });

    window.overlay = overlay;
    window.layers = [];

    console.log(overlay);

    window.layers.push(scatterplot(dataSource));
    // window.layers.push(heatmap(dataSource));
    // window.layers.push(hexagon(dataSource));
    window.layers.push(icon(dataSource));

    overlay.setProps({
      layers: window.layers
    });

    console.log("Add overlay to map");
    overlay.setMap(map);
  });
};
