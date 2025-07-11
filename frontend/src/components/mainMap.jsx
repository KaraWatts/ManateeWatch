import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { api, calculateTimeSincePost } from "./utilities.jsx";
import ResultCards from "./resultTiles.jsx";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Fab} from "@mui/material";
import sightingIcon from "../assets/ReportManatee.png";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import NavigationIcon from "@mui/icons-material/Navigation";
import MainMapController from "./MainMapController.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MainMap() {
  const [positionData, setPositionData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const mapRef = useRef();
  const timer = useRef();
  const navigate = useNavigate()



  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/sightings/");
      const allData = response.data;
      setData(allData);
    };

    fetchData();
  }, []);
  
 //temporary styling for successful user locate
 const buttonSx = {
  ...(success && {
    bgcolor: green[500],
    '&:hover': {
      bgcolor: green[700],
    },
  }),
};

  useEffect(()=>{
    timer.current = setTimeout(() => {
      setSuccess(false)
    }, 500);
  },[success])

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
              <p>Spotted By: {item.user.display_name === "Data Source" ? `Data Source - ${item.data_source}` : item.user.display_name}</p>
              <div className="d-flex justify-content-between">
                <Link to={`/profile/${item.user.user_id}/sighting/${item.id}`}>
                  <Button variant="info" size="sm">
                    More Details
                  </Button>
                </Link>
                <Link
                  to={`https://www.google.com/maps?q=${item.lat},${item.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="ml-1" variant="secondary" size="sm">
                    Get Directions<TurnLeftIcon />
                  </Button>
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
  };

  
  const locateUser = () => {
        mapRef.current.locate();
        setLoading(true);
    };

      
      
      return (
        <>
      <div className="mapContainer">
        <MapContainer
          center={[28.334861, -81.708441]}
          zoom={8}
          scrollWheelZoom={false}
          maxZoom={18}
          ref={mapRef}
          className="leaflet-home-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {sightingPoints()}
          <div style={{ position: "absolute", bottom: "50px", left: "50px" }}>
            <Fab style={{ cursor: "pointer" }} onClick={handleIconClick}>
              <img
                src={sightingIcon}
                alt="sighting icon"
                style={{ height: "150px", width: "auto" }}
              />
            </Fab>
          </div>
          <div style={{ position: "absolute", bottom: "20px", right: "10px" }}>
          <MainMapController positionData={positionData} setSuccess={setSuccess} setLoading={setLoading} />
            <Fab className="navigationIcon" sx={buttonSx}>
              <NavigationIcon onClick={locateUser} sx={{ mr: 0 }} />
            </Fab>
          </div>
          {loading && (
        <div className="loader-wheel" style={{bottom:"9px", right:"4px"}}>
        <CircularProgress
          size={68}
          sx={{
            color: green[800],
            }}
        />
        </div>
      )}
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
                sighting_date={calculateTimeSincePost(sighting.sighting_date)}
                coord={[parseFloat(sighting.lat), parseFloat(sighting.lon)]}
                image={image_url}
                setPositionData={setPositionData}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MainMap;
