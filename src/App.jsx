import { useState, useEffect } from 'react';
import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function App() {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get('src/data/Manatee_Sightings.geojson');
        const allData = response.data
        setData(allData.features);
      };
  
      fetchData();
    }, []);

    // Define the sightingPoints function to return an array of Marker components
    const sightingPoints = () => {
      if (!data) return null; // Return null if data is not available yet
      return data.map((item, index) => (
        <Marker 
        key={index} 
        position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
        //popup open on hover
        // eventHandlers={{
        //   mouseover: (event) => event.target.openPopup(),
        //   mouseout: (event) => event.target.closePopup()

        // }}
        >
          <Popup>
            <div>
              <h2>Manatee Sighted</h2>
              <h3>{item.properties.NUMBER_ADULT_MANATEES} Adults {item.properties.NUMBER_CALF_MANATEES} Calves</h3>
              <p>Date Sighted: {item.properties.SIGHTINGDATE}</p>
              <p>Activity: {item.properties.ACTIVITY}</p>
              <p>Spotted By: {item.properties.NAME}</p>
              <p>Latitude: {item.geometry.coordinates[1]}</p>
              <p>Longitude: {item.geometry.coordinates[0]}</p>
            </div>
          </Popup>
        </Marker>
      ));
    };

    return (
      <>
        <MapContainer center={[26.534861, -81.008441]} zoom={8} scrollWheelZoom={false} className="leaflet-container">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
           {sightingPoints()}
        </MapContainer>
      </>
    );
}

export default App;