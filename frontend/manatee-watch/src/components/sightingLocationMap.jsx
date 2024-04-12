import { useState, useEffect, useMemo, useRef, Button } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "../pages/stylesheets/sightingLocationData.css";
import "leaflet/dist/leaflet.css";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import LocateControl from "./locationControl";



const SightingLocationMap = ({ onPositionChange }) => {
  const mapRef = useRef();

  const locateUser = () => {
    mapRef.current.locate();
  };

//   const handlePositionChange = (position) => {
//     onPositionChange(position);
//   };

  return (
    <>
      <MapContainer
        center={[26.534861, -81.008441]}
        zoom={8}
        scrollWheelZoom={true}
        maxZoom={18}
        ref={mapRef}
        className="leaflet-sighting-container"
      >
        <LocateControl onPositionChange={onPositionChange}/>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <div style={{ position: 'absolute', bottom: '20px', right: '10px' }}>
      <Fab className="navigationIcon">
        <NavigationIcon onClick={locateUser} sx={{ mr: 0 }} />
      </Fab>
        </div>
      </MapContainer>
      <hr />
    </>
  );
};

export default SightingLocationMap;
