
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

const LocateControl = ({ onPositionChange }) => {
    const [position, setPosition] = useState(null);
    const [marker, setMarker] = useState(null);
  
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setMarker(
              <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                position={marker.getLatLng()}
                ref={markerRef}
              ></Marker>
            );
            setPosition(marker.getLatLng());
            onPositionChange(marker.getLatLng());
          }
        },
      }),
      []
    );
  
    const map = useMapEvents({
      locationfound(e) {
        map.flyTo(e.latlng, 15);
        setMarker(
          <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={e.latlng}
            ref={markerRef}
          ></Marker>
        );
        setPosition(e.latlng);
        onPositionChange(e.latlng);
      },
    });
  
  
    return marker;
  };

  export default LocateControl;