import { useState, useEffect } from "react";
import "./App.css";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet"; // Import useMap from react-leaflet
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("src/data/Manatee_Sightings.geojson");
      const allData = response.data;
      setData(allData.features);
    };

    fetchData();
  }, []);

  // generate manatee sighting points w/ popup data
  const sightingPoints = () => {
    if (!data) return null;
    return data.map((item, index) => (
      <CircleMarker
        key={index}
        center={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
        //circle markers set large enough to interact with but not visible
        radius={4}
        weight={0}
        fillOpacity={0}
        //popup open on hover
        eventHandlers={{
          mouseover: (event) => event.target.openPopup(),
        }}
      >
        <Popup>
          <div>
            <h2>Manatee Sighted</h2>
            <h3>
              {item.properties.NUMBER_ADULT_MANATEES} Adults{" "}
              {item.properties.NUMBER_CALF_MANATEES} Calves
            </h3>
            <p>Date Sighted: {item.properties.SIGHTINGDATE}</p>
            <p>Activity: {item.properties.ACTIVITY}</p>
            <p>Spotted By: {item.properties.NAME}</p>
            <p>Latitude: {item.geometry.coordinates[1]}</p>
            <p>Longitude: {item.geometry.coordinates[0]}</p>
          </div>
        </Popup>
      </CircleMarker>
    ));
  };

  // coordinates for heatmap
  const heatmapPoints = data
    ? data.map((p) => [p.geometry.coordinates[1], p.geometry.coordinates[0], 1])
    : [];

  return (
    <>
      <MapContainer
        center={[26.534861, -81.008441]}
        zoom={8}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* render heatmap */}
        {heatmapPoints.length > 0 && <HeatmapLayer points={heatmapPoints} />}
        {/* render sighting points */}
        {sightingPoints()}
      </MapContainer>
    </>
  );
}

//generate heatmaplayer
function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    //using leaflet.heat plugin with leaflet
    L.heatLayer(points, { radius: 20, maxZoom: 10 }).addTo(map);
  }, [points, map]);

  return null;
}

export default App;
