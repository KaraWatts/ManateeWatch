import { useState, useEffect, useRef} from "react";
import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import "../pages/stylesheets/sightingLocationData.css";
import "leaflet/dist/leaflet.css";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import LocateControl from "./locationControl";
import 'react-image-picker-editor/dist/index.css'
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
import { green } from '@mui/material/colors';


const SightingLocationMap = ({ onPositionChange }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const mapRef = useRef();
  const timer = useRef();

  useEffect(()=>{
    timer.current = setTimeout(() => {
      setSuccess(false)
    }, 500);
  },[success])

  const locateUser = () => {
    mapRef.current.locate();
    setLoading(true);
  };

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <>
      <MapContainer
        center={[28.334861, -81.708441]}
        zoom={8}
        scrollWheelZoom={true}
        maxZoom={18}
        ref={mapRef}
        className="leaflet-sighting-container"
      >
        <LocateControl onPositionChange={onPositionChange} setLoading={setLoading} setSuccess={setSuccess}/>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <div style={{ position: 'absolute', bottom: '20px', right: '10px' }}>
        <Box  sx={{ m: 1 }}>
      <Fab className="navigationIcon" sx={buttonSx}>
        <NavigationIcon onClick={locateUser} sx={{ mr: 0 }} />
      </Fab>
        </Box>
        </div>
      {loading && (
        <div className="loader-wheel">
        <CircularProgress
          size={68}
          sx={{
            color: green[800],
            }}
        />
        </div>
      )}
      </MapContainer>
      <hr />
    </>
  );
};

export default SightingLocationMap;
