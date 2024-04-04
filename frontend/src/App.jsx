import { useState, useEffect } from "react";
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L, { MarkerCluster } from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";
import ResultCards from "./components/resultTiles"

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


  // Define the sightingPoints function to return an array of Marker components
  const sightingPoints = () => {
    if (!data) return null; // Return null if data is not available yet
    const markers = data.map((item, index) => (
      <Marker
        key={index}
        position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
      >
        <Tooltip>
          <img
            className="manateeImg"
            src="https://i.insider.com/5db6fd7ddee019532146611b?width=700"
          />
        </Tooltip>
        <Popup>
          <div>
            <h2>Manatee Sighted</h2>
            <img
              className="manateeImg"
              src="https://i.insider.com/5db6fd7ddee019532146611b?width=700"
            />
            <h3>
              {item.properties.NUMBER_ADULT_MANATEES} Adults{" "}
              {item.properties.NUMBER_CALF_MANATEES} Calves
            </h3>
            <p>Date Sighted: {item.properties.SIGHTINGDATE}</p>
            <p>Activity: {item.properties.ACTIVITY}</p>
            <p>Spotted By: {item.properties.NAME}</p>
          </div>
        </Popup>
      </Marker>
    ));
    return (
      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={100}
        disableClusteringAtZoom={16}
        spiderfyOnMaxZoom={false}
      >
        {markers}
      </MarkerClusterGroup>
    );
  };

  return (
    <>
      <MapContainer
        center={[26.534861, -81.008441]}
        zoom={8}
        scrollWheelZoom={true}
        maxZoom={18}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sightingPoints()}
      </MapContainer>
      <ResultCards/>
    </>
  );
}

export default App;
