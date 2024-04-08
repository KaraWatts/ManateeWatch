import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L, { MarkerCluster } from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import {api} from "./utilities.jsx"
import axios from "axios";
import ResultCards from "./resultTiles.jsx"

function MainMap() {
    const [ data, setData ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/home/");
      const allData = response.data;
      console.log(allData[0])
      setData(allData);
    };

    fetchData();
  }, []);


// Define the sightingPoints function to return an array of Marker components
const sightingPoints = () => {
  if (!data) return null; // Return null if data is not available yet
  const markers = data.map((item) => {
      return (
          <Marker
              key={item.id}
              position={[parseFloat(item.lat), parseFloat(item.lon)]}
          >
              <Tooltip>
                  <img
                      className="manateeImg"
                      src={item.Image ? item.Image : "https://i.insider.com/5db6fd7ddee019532146611b?width=700"}
                  />
              </Tooltip>
              <Popup>
                  <div>
                      <h2>Manatee Sighted</h2>
                      <img
                          className="manateeImg"
                          src={item.Image ? item.Image : "https://i.insider.com/5db6fd7ddee019532146611b?width=700"}
                      />
                      <h3>
                          {item.Num_Adults} Adults{" "}
                          {item.Num_Calf} Calves
                      </h3>
                      <p>Date Sighted: {item.Sighting_date}</p>
                      <p>Activity: {item.Activity}</p>
                      <p>Spotted By: {item.User_ID}</p>
                  </div>
              </Popup>
          </Marker>
      );
  });
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
      <div className="result-container">
        {data.slice(0, 20).map((sighting) => {
            const image_url = sighting.Image ? sighting.Image : "https://i.insider.com/5db6fd7ddee019532146611b?width=700";
            return (
            <ResultCards
                key={sighting.id}
                id={sighting.id}
                user_ID={sighting.User_ID}
                sighting_date={sighting.Sighting_date} 
                image={image_url}
            />
            );
        })}
        </div>


    </>
  );
}

export default MainMap;