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


const SightingLocationMap = ({
  onPositionChange
}: any) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
  const mapRef = useRef();
  // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
  const timer = useRef();

  useEffect(()=>{
    timer.current = setTimeout(() => {
      setSuccess(false)
    }, 500);
  },[success])

  const locateUser = () => {
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
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
        // @ts-expect-error TS(2322): Type '{ children: (false | Element)[]; center: num... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2322): Type '{ url: string; attribution: string; }' is no... Remove this comment to see the full error message
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
