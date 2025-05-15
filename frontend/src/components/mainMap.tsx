import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { api, calculateTimeSincePost } from "./utilities";
import ResultCards from "./resultTiles";
import "leaflet/dist/leaflet.css";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'leaf... Remove this comment to see the full error message
import L from "leaflet";
import { Fab} from "@mui/material";
// @ts-expect-error TS(2307): Cannot find module '../assets/ReportManatee.png' o... Remove this comment to see the full error message
import sightingIcon from "../assets/ReportManatee.png";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import NavigationIcon from "@mui/icons-material/Navigation";
import MainMapController from "./MainMapController";
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface Sighting {
  id: number;
  lat: string;
  lon: string;
  image: string | null;
  sighting_date: string;
  activity: string;
  num_Adults: number;
  num_Calf: number;
  user: {
    display_name: string;
    user_id: number;
  };
  data_source?: string;
}

delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MainMap() {
  const [positionData, setPositionData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
  const mapRef = useRef();
  // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
  const timer = useRef();
  const navigate = useNavigate()



  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/sightings/");
      const allData = response.data;
      console.log("allData", response.data);
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
          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
          key={item.id}
          // @ts-expect-error TS(2339): Property 'lat' does not exist on type 'never'.
          position={[parseFloat(item.lat), parseFloat(item.lon)]}
        >
          <Tooltip>
            <img
              className="manateeImg"
              src={
                // @ts-expect-error TS(2339): Property 'image' does not exist on type 'never'.
                item.image
                  // @ts-expect-error TS(2339): Property 'image' does not exist on type 'never'.
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
                  // @ts-expect-error TS(2339): Property 'image' does not exist on type 'never'.
                  item.image
                    // @ts-expect-error TS(2339): Property 'image' does not exist on type 'never'.
                    ? item.image
                    : "https://i.insider.com/5db6fd7ddee019532146611b?width=700"
                }
                alt="Manatee"
              />
              <h5>
                // @ts-expect-error TS(2339): Property 'num_Adults' does not exist on type 'neve... Remove this comment to see the full error message
                {item.num_Adults} Adults {item.num_Calf} Calves
              </h5>
              // @ts-expect-error TS(2339): Property 'sighting_date' does not exist on type 'n... Remove this comment to see the full error message
              <p>Date Sighted: {item.sighting_date}</p>
              // @ts-expect-error TS(2339): Property 'activity' does not exist on type 'never'... Remove this comment to see the full error message
              <p>Activity: {item.activity}</p>
              // @ts-expect-error TS(2339): Property 'user' does not exist on type 'never'.
              <p>Spotted By: {item.user.display_name === "Data Source" ? `Data Source - ${item.data_source}` : item.user.display_name}</p>
              <div className="d-flex justify-content-between">
                // @ts-expect-error TS(2339): Property 'user' does not exist on type 'never'.
                <Link to={`/profile/${item.user.user_id}/sighting/${item.id}`}>
                  <Button variant="info" size="sm">
                    More Details
                  </Button>
                </Link>
                <Link
                  // @ts-expect-error TS(2339): Property 'lat' does not exist on type 'never'.
                  to={`https://www.google.com/maps?q=${item.lat},${item.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="ml-1" variant="secondary" size="sm">
                    Get Directions <TurnLeftIcon />
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

  const handleIconClick = (e: any) => {
    navigate('/sightingImage/')
  };

  
  const locateUser = () => {
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        mapRef.current.locate();
        setLoading(true);
    };

      
      
      return (
        <>
      <div className="mapContainer">
        <MapContainer
          // @ts-expect-error TS(2322): Type '{ children: (false | Element | null)[]; cent... Remove this comment to see the full error message
          center={[28.334861, -81.708441]}
          zoom={8}
          scrollWheelZoom={false}
          maxZoom={18}
          ref={mapRef}
          className="leaflet-home-container"
        >
          <TileLayer
            // @ts-expect-error TS(2322): Type '{ attribution: string; url: string; }' is no... Remove this comment to see the full error message
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
            // @ts-expect-error TS(2339): Property 'image' does not exist on type 'never'.
            const image_url = sighting.image
              // @ts-expect-error TS(2339): Property 'image' does not exist on type 'never'.
              ? sighting.image
              : "https://i.insider.com/5db6fd7ddee019532146611b?width=700";
            return (
              <ResultCards
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                key={sighting.id}
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                id={sighting.id}
                // @ts-expect-error TS(2339): Property 'sighting_date' does not exist on type 'n... Remove this comment to see the full error message
                sighting_date={calculateTimeSincePost(sighting.sighting_date)}
                // @ts-expect-error TS(2339): Property 'lat' does not exist on type 'never'.
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
