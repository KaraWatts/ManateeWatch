import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { api } from "./utilities.jsx";
import ResultCards from "./resultTiles.jsx";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Fab, IconButton } from "@mui/material";
import sightingIcon from "../assets/ReportManatee.png";
import { Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TurnLeftIcon from '@mui/icons-material/TurnLeft';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MainMap() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/sightings/");
      const allData = response.data;
      console.log(allData[0]);
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
              src={
                item.image
                  ? item.image
                  : "https://i.insider.com/5db6fd7ddee019532146611b?width=700"
              }
              alt="Manatee"
            />
          </Tooltip>
          <Popup>
            <div>
              <h4>Manatee Sighted</h4>
              <img
                className="manateeImg"
                src={
                  item.image
                    ? item.image
                    : "https://i.insider.com/5db6fd7ddee019532146611b?width=700"
                }
                alt="Manatee"
              />
              <h5>
                {item.num_Adults} Adults {item.num_Calf} Calves
              </h5>
              <p>Date Sighted: {item.sighting_date}</p>
              <p>Activity: {item.activity}</p>
              <p>Spotted By: {"ADD NAME HERE"}</p>
              <div className="d-flex justify-content-between">
              <Link to={`/profile/${item.user}/sighting/${item.id}`}>
               <Button variant="info" size="sm">More Details</Button> 
              </Link>
              <Link to={`https://www.google.com/maps?q=${item.lat},${item.lon}`} target="_blank" rel="noopener noreferrer">
              <Button className="ml-1" variant="secondary" size="sm">Get Directions <TurnLeftIcon /></Button>
              </Link>
              </div>
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

  const handleIconClick = (e) => {
    navigate('/sightingImage/')
  }


  return (
    <>
      <div className="mapContainer">
        <MapContainer
          center={[26.534861, -81.008441]}
          zoom={8}
          scrollWheelZoom={false}
          maxZoom={18}
          className="leaflet-home-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {sightingPoints()}
          <div style={{ position: "absolute", bottom: "50px", left: "50px" }}>
            <Fab style={{cursor:"pointer"}} onClick={handleIconClick} >
              <img
                src={sightingIcon}
                alt="sighting icon"
                style={{ height: "150px", width: "auto"}}
              />
            </Fab>
          </div>
        </MapContainer>
        <div className="result-container">
          {data.slice(0, 20).map((sighting) => {
            const image_url = sighting.image
              ? sighting.image
              : "https://i.insider.com/5db6fd7ddee019532146611b?width=700";
            return (
              <ResultCards
                key={sighting.id}
                id={sighting.id}
                user_ID={"ADD NAME HERE"}
                sighting_date={sighting.sighting_date}
                image={image_url}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MainMap;
